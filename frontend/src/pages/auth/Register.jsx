import React, { useState } from 'react'
import Title from '../../components/Title';
import { BiUser } from "react-icons/bi";
import { IoCameraOutline } from "react-icons/io5";
import { male, female } from "../../assets/index.js"
import { store } from '../../redux/store.js';

const Register = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [formData, setFormData] = useState({
        name: store.getState().auth.user.name,
        dob: "",
        gender: selectedGender.toLowerCase(),

        dept_id: null,
        position_id: null,
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

    return (
        <div className='flex justify-center w-full min-h-screen p-5'>
            <div className='w-10/12'>
                {/* <Title title="General information" /> */}
                <Title title="Employee registrtion" />

                <form className='space-y-6'>
                    <h2 className='font-semibold mb-3'>Basic details</h2>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='flex items-center gap-2 justify-center'>
                            <div className='bg-gray-100 rounded-full w-16 h-16 border-3 border-[#f7b35b] flex items-center justify-center relative'>
                                <BiUser className='w-8 h-8 text-white' />
                                <div className='absolute bottom-0 right-0 p-1 bg-[#f7b35b] rounded-full cursor-pointer'>
                                    <IoCameraOutline className='w-4 h-4 text-white' />
                                </div>
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
                            <input type="date" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter your date of birth" />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Gender<sup className='text-red-400'>*</sup></label>
                            <div className='flex justify-around'>
                                {gender.map((item, index) => (
                                    <div className="flex gap-4 items-center">
                                        <div key={index} onClick={() => setSelectedGender(item.name)} className={`w-12 h-12 rounded-full border-3 cursor-pointer ${selectedGender === item.name ? 'border-[#f7b35b]' : 'border-gray-100'}`}>
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <p className={`${selectedGender === item.name ? 'text-[#f7b35b]' : ''}`}>{item.name}</p>
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
                                <div className='sm:p-[10px] p-4 bg-gray-100 rounded-sm'>
                                    <select name="" className='w-full  focus:outline-none'>
                                        <option value="">Human Resource</option>
                                        <option value="">Information Technology</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Position<sup className='text-red-400'>*</sup></label>
                                <div className='sm:p-[10px] p-4 bg-gray-100 rounded-sm'>
                                    <select name="" className='w-full  focus:outline-none'>
                                        <option value="">Requirter</option>
                                        <option value="">Admin</option>
                                    </select>
                                </div>
                            </div>

                            {/* <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Employee number<sup className='text-red-400'>*</sup></label>
                                <input type="text" className='w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none' placeholder='Enter employee number' />
                            </div> */}

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Joining date<sup className='text-red-400'>*</sup></label>
                                <input type="date" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter joining date" />
                            </div>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h2 className='font-semibold mb-3'>Address details</h2>

                        <div className="grid grid-cols-4 gap-5 ">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Address<sup className='text-red-400'>*</sup></label>
                                <input type="text" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter address" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">City<sup className='text-red-400'>*</sup></label>
                                <input type="text" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter city" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Pincode<sup className='text-red-400'>*</sup></label>
                                <input type="text" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter pincode" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Country<sup className='text-red-400'>*</sup></label>
                                <input type="text" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter country" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Nationality<sup className='text-red-400'>*</sup></label>
                                <input type="text" className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none" placeholder="Enter nationality" />
                            </div>
                        </div>


                    </div>

                    <div className='mt-8'>
                        <h2 className='font-semibold mb-3'>Contact details</h2>

                        <div className="grid grid-cols-3 gap-5">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Phone<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter phone number"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Emergency contact<sup className='text-red-400'>*</sup></label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 sm:p-[10px] p-4 rounded-sm focus:outline-none"
                                    placeholder="Enter emergency contact"
                                />
                            </div>
                        </div>

                        <div className='flex justify-end mt-6'>
                            <button className='px-10 py-2 bg-[#f7b35b] text-white rounded-sm'>Save</button>
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