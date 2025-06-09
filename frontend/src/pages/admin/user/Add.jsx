import React, { useState } from 'react'
import { useRoleList } from '../../../hooks/authHook'
import toast from 'react-hot-toast';
import { useCreateUser } from '../../../hooks/userHook';

const Add = () => {

  const { data: roles } = useRoleList();
  // console.log(roles);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    role_id: "",
    password: "",
    confirmPassword: ""
  }

  const [formData, setFormData] = useState(initialState);

  const createUser = useCreateUser();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    createUser.mutate(formData, {
      onSuccess: () => {
        toast.success("User has created successfully")
        setFormData(initialState);
      },
      onError: (error) => {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message)
      }
    })
  }


  return (
    <div className='wrapper'>
      <h3 className='font-semibold'>Add a user for a new role</h3>

      <form onSubmit={onSubmitHandler}>
        <div className='grid grid-cols-3 py-4 gap-5'>
          <div>
            <label className="label">First Name<sup className='text-red-400'>*</sup></label>
            <input
              type="text"
              className="input"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label className="label">Last Name<sup className='text-red-400'>*</sup></label>
            <input
              type="text"
              className="input"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label className="label">Email Address<sup className='text-red-400'>*</sup></label>
            <input
              type="email"
              className="input"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label className="label">Password<sup className='text-red-400'>*</sup></label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="label">Confirm Password<sup className='text-red-400'>*</sup></label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label className="label">Role<sup className='text-red-400'>*</sup></label>
            <div className='sm:px-[10px] px-4 bg-background rounded-sm'>
              <select
                className='w-full h-11 focus:outline-none'
                name="role_id"
                value={formData.role_id}
                onChange={onChangeHandler}
              >
                <option value="" disabled>Select position</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* 
          <div className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              // checked={isChecked}
              // onChange={(e) => setIsChecked(e.target.checked)}
              className=" h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label className="text-sm">Subscribe to newsletter</label>
          </div> */}

          {/* <div className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              id="newsletter"
              type="checkbox"
              className="h-4 w-4 accent-primary border-gray-300 rounded focus:ring-primary"
            />

            <label htmlFor="newsletter" className="text-sm text-text">
              Send a notification to the user for a new role
            </label>
          </div> */}
        </div>



        <div className='flex justify-end mt-6'>
          <button className='px-10 py-2 bg-primary text-white rounded-sm'>Submit</button>
        </div>

      </form>

    </div>
  )
}

export default Add