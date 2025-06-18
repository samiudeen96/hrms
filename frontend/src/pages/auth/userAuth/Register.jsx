import React, { useState, useRef, useEffect } from 'react';
import { usePositionList, useUserDeptList, useUserPositionList } from '../../../hooks/deptHook';
import Title from '../../../components/Title';
import { BiUser } from 'react-icons/bi';
import { IoCameraOutline } from 'react-icons/io5';
import { male, female } from '../../../assets/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterEmp } from '../../../hooks/employeeHook';
import toast from 'react-hot-toast';
import { getRedirectPathByRole } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom'
import { setRegisteredData } from '../../../redux/reducers/authSlice';

const Register = () => {
    const { data: userDeptList } = useUserDeptList();
    const { data: userPositionList } = useUserPositionList();
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { loggedData } = useSelector((state) => state.auth);
    const createEmployee = useRegisterEmp();
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        profile_picture: '',
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
    });


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setFormData((prev) => ({
                ...prev,
                profile_picture: file
            }));
        }
    };

    const handleDelete = () => {
        setPreviewImage(null);
        setFormData((prev) => ({
            ...prev,
            profile_picture: ''
        }));
        fileInputRef.current.value = null;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        createEmployee.mutate(formData, {
            onSuccess: (data) => {
                toast.success("Employee registered successfully")
                const redirectTo = getRedirectPathByRole(loggedData?.role)
                navigate(redirectTo)
                console.log(data);

                dispatch(setRegisteredData({ registeredInfo: data.employee }))
            },
            onError: (error) => {
                const message = error?.response?.data?.message || error.message || "Something went wrong";
                toast.error(message)
            }
        })
    };

    const genderOptions = [
        { id: 1, name: 'Male', img: male },
        { id: 2, name: 'Female', img: female }
    ];


    const selectedDept = userDeptList?.find((dept) => dept.id === parseInt(formData.dept_id));
    // console.log(selectedDept);

    const positions = selectedDept
        ? userPositionList?.filter((pos) => pos.dept_id === selectedDept.id)
        : [];

    return (
        <div className="flex justify-center w-full min-h-screen p-5">
            <div className="w-10/12">
                {/* <Title title="Employee registration" /> */}
                <h2 className='text-lg font-semibold'>Employee Registeration</h2>

                <form onSubmit={onSubmitHandler} className="space-y-6 mt-2">
                    {/* <h2 className="font-semibold mb-3">Basic details</h2> */}
                    <Title title="Basic details" />
                    <div className="grid grid-cols-3 gap-5">
                        {/* Profile Image Section */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="bg-gray-200 rounded-full border-3 border-primary w-20 h-20 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <BiUser className="w-8 h-8 text-white" />
                                    )}
                                </div>
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer"
                                >
                                    <IoCameraOutline className="w-4 h-4 text-white" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div>
                                <p className='text-sm font-semibold mb-[-1px]'>{loggedData?.name}</p>
                                <p className='text-xs'>{loggedData?.role}</p>
                                {previewImage ? (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="border border-gray-300 text-sm px-2 py-1 rounded mt-2 hover:border-red-500 hover:text-red-500"
                                    >
                                        Remove picture
                                    </button>
                                ) : (
                                    ""
                                )}

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
                            <div className='flex justify-around'>
                                {genderOptions.map((item, index) => (
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
                        {/* <h2 className='font-semibold mb-3'>Employment details</h2> */}
                        <Title title="Employment details" />
                        <div className="grid grid-cols-3 gap-5">

                            <div>
                                <label className="label">Department<sup className='text-red-400'>*</sup></label>
                                <div className='sm:px-[10px] px-4  bg-gray-100 rounded-sm'>
                                    <select
                                        className='w-full h-11  focus:outline-none'
                                        name='dept_id'
                                        value={formData.dept_id}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="" disabled>Select department</option>
                                        {userDeptList?.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="label">Position<sup className='text-red-400'>*</sup></label>
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

                    <div className='mt-8'>
                        {/* <h2 className='font-semibold mb-3'>Address details</h2> */}
                        <Title title="Address details" />

                        <div className="grid grid-cols-4 gap-5 ">
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
                                    type="number"
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

                    <div className='mt-8'>
                        {/* <h2 className='font-semibold mb-3'>Contact details</h2> */}
                        <Title title="Contact details" />

                        <div className="grid grid-cols-3 gap-5 items-end">
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

                            <button className='button_primary'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register