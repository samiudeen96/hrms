import React, { useState } from 'react';
import SignupLottie from '../../lottie/SignupLottie';
import logo from "../../assets/logo.svg";

import { Link, useNavigate } from "react-router-dom"
import Title from '../../components/Title';
import toast from 'react-hot-toast';
import { useLogin } from '../../hooks/authHook';
import { useEmpInfo } from '../../hooks/empHook';
import { getRedirectPathByRole } from "../../utils/helper.js"

const Login = () => {
  const loginCredential = useLogin();
  const navigate = useNavigate();
  const { refetch: fetchEmpInfo } = useEmpInfo();
  const initialData = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialData)

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(formData);
    loginCredential.mutate(
      formData,
      {
        onSuccess: async (data) => {
          toast.success('Login successfully');

          const { data: empData } = await fetchEmpInfo();
          const redirectTo = !empData ? "/register" : getRedirectPathByRole(data.user.role)
          navigate(redirectTo);

        },
        onError: (error) => {
          const message = error?.response?.data?.message || error.message || "Something went wrong";
          toast.error(message);
        }
      }
    )
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='min-[1280px]:w-7/12 grid grid-cols-2 w-11/12 max-[760px]:grid-cols-1 items-center sm:p-5 p-2'>
        <div className="sm:flex-1 w-full flex flex-col items-center">
          <img src={logo} className='w-50 h-20' alt="" />
          <SignupLottie />
        </div>
        <div className="sm:flex-1 w-full rounded-md flex flex-col items-center sm:mt-0 mt-5">

          <form onSubmit={onSubmitHandler} className='mt-5 space-y-4 sm:w-10/12 w-full'>
            {/* <h2 className='text-lg font-semibold'>Login</h2> */}
            <Title title="Login" />
            <div>
              <input
                type="email"
                className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none'
                placeholder='Email Address'
                name='email'
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <input
                type="password"
                className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none'
                placeholder='Password'
                name='password'
                onChange={onChangeHandler}
              />
            </div>

            <button className='w-full bg-[#f7b35b] sm:p-[10px] p-4 rounded-sm text-white'>Login</button>

            <p className='text-sm text-center'>Not a member?{" "}<Link to="/employee/signup" className="text-[#f7b35b] font-bold">Signup</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login