import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../../../assets/index.js';
import IntroLottie from "../../../components/lottie/IntroLottie.jsx"
import Title from '../../../components/Title.jsx';
import toast from 'react-hot-toast';
import { getRedirectPathByRole } from "../../../utils/helper.js"
import { useUserLogin } from '../../../hooks/userHook.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRegisteredData } from '../../../redux/reducers/authSlice.js';
import { useEmpProfile } from '../../../hooks/employeeHook.js';

const UserLogin = () => {

  const login = useUserLogin();

  const initialData = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialData)
  const navigate = useNavigate();
  const { refetch: refetchEmpProfile } = useEmpProfile()
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    login.mutate(formData, {
      onSuccess: async (data) => {
        toast.success("Login successfully");
        setFormData(initialData);

        try {
          const { data: employeeProfile } = await refetchEmpProfile();

          const redirectTo = employeeProfile
            ? getRedirectPathByRole(data.loggedData.role)
            : "/register";

          if (employeeProfile) {
            dispatch(setRegisteredData({ registeredInfo: employeeProfile }));
            console.log("Employee Profile:", employeeProfile.uuid);
          }

          navigate(redirectTo);
        } catch (err) {
          console.error("Error fetching profile:", err);
          toast.error("Failed to fetch employee profile.");
        }
      },

      onError: (error) => {
        const message =
          error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
      },
    });
  };


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='min-[1280px]:w-7/12 grid grid-cols-2 w-11/12 max-[760px]:grid-cols-1 items-center sm:p-5 p-2'>
        <div className="sm:flex-1 w-full flex flex-col items-center">
          <img src={logo} className='w-50 h-20' alt="" />
          <IntroLottie />
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

            <button className='w-full bg-primary sm:p-[10px] p-4 rounded-sm text-white'>Login</button>

            {/* <p className='text-sm text-center'>Not a member?{" "}<Link to="/signup" className="text-primary font-bold">Signup</Link></p> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin