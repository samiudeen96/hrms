import { useState } from 'react';
import { routes } from "../../utils/helper.js";
import { useLocation, useNavigate } from "react-router-dom";
import SignupLottie from '../../lottie/SignupLottie';
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import toast from 'react-hot-toast';
import { useSignup } from '../../hooks/authHook';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getId = () => {
    if (location.pathname === routes.admin) return 1;
    if (location.pathname === routes.employee) return 2;
    return null;
  }

  const initialData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile_picrure: '',
    role_id: getId()
  }

  const [formData, setFormData] = useState(initialData)
  const createUser = useSignup();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!formData.confirmPassword) {
      toast.error("Please fill all the required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    createUser.mutate(formData, {
      onSuccess: () => {
        setFormData(initialData);
        navigate('/login');
      },
      onError: (error) => {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
      }
    });
  };


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='min-[1280px]:w-7/12 grid grid-cols-2 w-11/12 max-[760px]:grid-cols-1 items-center sm:p-5 p-2'>
        <div className=" w-full flex flex-col items-center">
          <img src={logo} className='w-50 h-20' alt="" />
          <SignupLottie />
        </div>
        <div className="w-full rounded-md flex flex-col items-center sm:mt-0 mt-5">

          <form onSubmit={onSubmitHandler} className='mt-5 space-y-4 sm:w-10/12 w-full'>
            <Title title="Signup" />
            <div>
              <input
                type="text"
                className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none'
                placeholder='Full Name'
                name='name'
                value={formData.name}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <input
                type="email"
                className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none'
                placeholder='Email Address'
                name='email'
                value={formData.email}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <input
                type="password"
                className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <input
                type="password"
                className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={onChangeHandler}
              />
            </div>

            <button className='w-full bg-[#f7b35b] sm:p-[10px] p-4 rounded-sm text-white'>Signup</button>

            <p className='text-sm text-center'>Already have an account?{" "}<Link to="/login" className="text-[#f7b35b] font-bold">Login</Link></p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
