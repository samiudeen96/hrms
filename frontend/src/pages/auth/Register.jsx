import React, { useEffect, useState } from 'react'
import Title from '../../components/Title';
import { BiUser } from "react-icons/bi";
import { IoCameraOutline } from "react-icons/io5";
import { male, female } from "../../assets/index.js"
import { store } from '../../redux/store.js';
import { useDptList } from '../../hooks/deptHook.js';
import { useCreateEmp, useEmpInfo } from '../../hooks/empHook.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getRedirectPathByRole } from '../../utils/helper.js';

const Register = () => {
    const { data: department } = useDptList();
    const { data: employee } = useEmpInfo();
    const createEmp = useCreateEmp()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        profile_picture: "",
        name: store.getState().auth.user.name,
        dob: "",
        gender: "",

        dept_id: "",
        position_id: "",
        emp_code: "",
        joining_date: "",

        address: "",
        city: "",
        pincode: "",
        country: "",
        nationality: "",

        phone: "",
        emg_contact: ""
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        createEmp.mutate(formData, {
            onSuccess: (data) => {
                console.log(data);
                toast.success("Employee has registered successfully")

                const role = store.getState().auth.role
                const redirectTo = getRedirectPathByRole(role);
                navigate(redirectTo)
            },
            onError: (error) => {
                const message = error?.response?.data?.message || error.message || "Something went wrong";
                toast.error(message)
            }
        })
    }
    

    const selectedDept = department?.find((dept) => (dept.id === parseInt(formData.dept_id)));
    const positions = selectedDept?.positions || [];
    

    return (
        <div className='flex justify-center w-full min-h-screen p-5'>
            <div className='w-10/12'>
                {/* <Title title="General information" /> */}
                <Title title="Employee registrtion" />

                <form onSubmit={onSubmitHandler} className='space-y-6'>
                    <h2 className='font-semibold mb-3'>Basic details</h2>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='flex gap-2 '>
                            <div className='bg-gray-100 rounded-full w-14 h-14 border-3 border-primary flex items-center justify-center relative'>
                                <BiUser className='w-8 h-8 text-white' />
                                <div className='absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer'>
                                    <IoCameraOutline className='w-4 h-4 text-white' />
                                </div>
                            </div>
                            <div>
                                {/* <input
                                    className='text-sm'
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
                                /> */}
                            </div>
                        </div>



                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Name<sup className='text-red-400'>*</sup></label>
                            <input
                                type="text"
                                className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Date of birth<sup className='text-red-400'>*</sup></label>
                            <input
                                type="date"
                                className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                placeholder="Enter your date of birth"
                                name='dob'
                                value={formData.dob}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Gender<sup className='text-red-400'>*</sup></label>
                            <div className='flex justify-around'>
                                {gender.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                gender: item.name,
                                            }));

                                            onChangeHandler({
                                                target: { name: "gender", value: item.name },
                                            })
                                        }} className={`w-12 h-12 rounded-full border-3 cursor-pointer ${formData.gender === item.name ? 'border-primary' : 'border-gray-100'}`}>
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <p className={`${formData.gender === item.name ? 'text-primary' : ''}`}>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className='font-semibold mb-3'>Employment details</h2>
                        <div className="grid grid-cols-3 gap-5">

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Department<sup className='text-red-400'>*</sup></label>
                                <div className='sm:px-[10px] px-4  bg-gray-100 rounded-sm'>
                                    <select
                                        className='w-full h-11  focus:outline-none'
                                        name='dept_id'
                                        value={formData.dept_id}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="" disabled>Select department</option>
                                        {department?.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Position<sup className='text-red-400'>*</sup></label>
                                <div className='sm:px-[10px] px-4 bg-gray-100 rounded-sm'>
                                    <select
                                        className='w-full h-11 focus:outline-none'
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

                            {/* <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Employee number<sup className='text-red-400'>*</sup></label>
                                <input type="text" className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none' placeholder='Enter employee number' />
                            </div> */}

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Joining date<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter joining date"
                                    name="joining_date"
                                    value={formData.joining_date}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h2 className='font-semibold mb-3'>Address details</h2>

                        <div className="grid grid-cols-4 gap-5 ">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Address<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter address"
                                    name="address"
                                    value={formData.address}
                                    onChange={onChangeHandler}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">City<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter city"
                                    name="city"
                                    value={formData.city}
                                    onChange={onChangeHandler}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Pincode<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter pincode"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={onChangeHandler}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Country<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter country"
                                    name="country"
                                    value={formData.country}
                                    onChange={onChangeHandler}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Nationality<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter nationality"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>


                    </div>

                    <div className='mt-8'>
                        <h2 className='font-semibold mb-3'>Contact details</h2>

                        <div className="grid grid-cols-3 gap-5">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Phone<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="tel"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter phone number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={onChangeHandler}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Emergency contact<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="tel"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter emergency contact"
                                    name="emg_contact"
                                    value={formData.emg_contact}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>

                        <div className='flex justify-end mt-6'>
                            <button className='px-10 py-2 bg-primary text-white rounded-sm'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const gender = [
    {
        id: 1,
        name: "Male",
        img: male
    },
    {
        id: 2,
        name: "Female",
        img: female
    },
]

export default Register