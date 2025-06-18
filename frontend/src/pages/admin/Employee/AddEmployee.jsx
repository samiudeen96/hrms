import React, { useState } from 'react'
import { useUserList } from '../../../hooks/userHook'
import { useDeptList, usePositionList } from '../../../hooks/deptHook';
import Title from '../../../components/Title';
import { useCreateEmp } from '../../../hooks/employeeHook';
import { toast } from 'react-hot-toast';


const AddEmployee = () => {
  const { data: users } = useUserList();
  // console.log(users);
  const { data: deptList } = useDeptList();
  const { data: positionList } = usePositionList();
  const createEmployee = useCreateEmp();

  const initialState = {
    user_id: '',
    dob: '',
    gender: '',
    dept_id: '',
    position_id: '',
    emp_code: '',
    salary: '',
    joining_date: '',
    address: '',
    city: '',
    pincode: '',
    country: '',
    nationality: '',
    phone: '',
    emg_contact: ''
  }

  const [formData, setFormData] = useState(initialState);

  console.log(formData);


  const selectedDept = deptList?.find((dept) => dept.id === parseInt(formData.dept_id));
  // console.log(selectedDept);

  const positions = selectedDept
    ? positionList?.filter((pos) => pos.dept_id === selectedDept.id)
    : [];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);


    createEmployee.mutate(formData, {
      onSuccess: (data) => {
        toast.success("Employee registered successfully")
        console.log(data);
        setFormData(initialState)
      },
      onError: (error) => {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message)
      }
    })
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>

        <div className='wrapper'>
          {/* < /> */}
          <Title title="Basic details" />
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="label">Select User <sup className="text-red-500">*</sup></label>
              <div className='select_option'>
                <select
                  className='input'
                  name="user_id"
                  value={formData.user_id}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>Select User</option>
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Date of birth<sup className='text-red-400'>*</sup></label>
              <input
                type="date"
                className="input"
                placeholder="Enter your date of birth"
                name='dob'
                value={formData.dob}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">Gender<sup className='text-red-400'>*</sup></label>
              <div className='select_option'>
                <select
                  className='input'
                  name="gender"
                  value={formData.gender}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>Select Gender</option>
                  {gender.map((item) => (
                    <option key={item.id} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className='wrapper mt-4'>
          {/* < /> */}
          <Title title="Employment details" />
          <div className='grid grid-cols-3 gap-4 '>
            <div>
              <label className="label">Department<sup className='text-red-400'>*</sup></label>
              <div className='select_option'>
                <select
                  className='input'
                  name='dept_id'
                  value={formData.dept_id}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>Select department</option>
                  {deptList?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Position<sup className='text-red-400'>*</sup></label>
              <div className='select_option'>
                <select
                  className='input'
                  name="position_id"
                  value={formData.position_id}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>Select position</option>
                  {positions?.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Joining date<sup className='text-red-400'>*</sup></label>
              <input
                type="date"
                className="input"
                placeholder="Enter joining date"
                name="joining_date"
                value={formData.joining_date}
                onChange={onChangeHandler}
              />
            </div>

          </div>
        </div>

        <div className='wrapper mt-4'>
          <Title title="Address details" />

          <div className="grid grid-cols-5 gap-4 ">
            <div>
              <label className="label">Address<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="input"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">City<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="input"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">Pincode<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="input"
                placeholder="Enter pincode"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">Country<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="input"
                placeholder="Enter country"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">Nationality<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="input"
                placeholder="Enter nationality"
                name="nationality"
                value={formData.nationality}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>

        <div className='wrapper mt-4'>
          <Title title="Contact details" />

          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <label className="label">Phone<sup className='text-red-400'>*</sup></label>
              <input
                type="tel"
                className="input"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">Emergency contact<sup className='text-red-400'>*</sup></label>
              <input
                type="tel"
                className="input"
                placeholder="Enter emergency contact"
                name="emg_contact"
                value={formData.emg_contact}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end mt-4'>
          <button className='button_primary'>Submit</button>
        </div>

      </form>
    </div>
  )
}

const gender = [
  {
    id: 1,
    label: "Male",
  },
  {
    id: 2,
    label: "Female",
  }
]

export default AddEmployee