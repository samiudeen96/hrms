import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";
import { GrPlay } from "react-icons/gr";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";



const AttendanceSteps = () => {
    const [formData, setFormData] = useState({
        check_in: '',
        break_in: '',
        break_out: '',
        check_out: '',
    });

    const getTime = () =>
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const getTimeInDate = (timeStr) => {
        const now = new Date();
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    };

    // const getWorkingHours = () => {
    //     if (formData.check_in && formData.check_out) {
    //         const inTime = getTimeInDate(formData.check_in);
    //         const outTime = getTimeInDate(formData.check_out);
    //         const diff = Math.abs(outTime - inTime);
    //         const hours = Math.floor(diff / 36e5);
    //         const mins = Math.floor((diff % 36e5) / 60000);
    //         return `${hours}h ${mins}m`;
    //     }
    //     return '--';
    // };

    const getWorkingHours = () => {
        if (formData.check_in && formData.check_out && formData.break_in && formData.break_out) {
            const inTime = getTimeInDate(formData.check_in);
            const outTime = getTimeInDate(formData.check_out);
            const breakIn = getTimeInDate(formData.break_in);
            const breakOut = getTimeInDate(formData.break_out);

            const totalWorked = outTime - inTime;
            const totalBreak = breakOut - breakIn;
            const netWorked = totalWorked - totalBreak;

            const hours = Math.floor(netWorked / 36e5);
            const mins = Math.floor((netWorked % 36e5) / 60000);
            return `${hours}h ${mins}m`;
        }
        return '--';
    };


    const handleTimeMark = (field) => {
        const time = getTime();
        setFormData((prev) => ({ ...prev, [field]: time }));
    };



    return (
        <div className="wrapper flex items-center justify-center  px-4 h-[calc(100vh-151px)]">
            <div className="bg-white p-8 rounded-xl  w-full max-w-sm text-center space-y-6 flex flex-col items-center">
                <h1 className="text-xl font-semibold text-gray-800">Daily Attendance</h1>

                {!formData.check_in && (
                    <button
                        onClick={() => handleTimeMark('check_in')}
                        className="button_entry bg-green-600 hover:bg-green-700"
                    >
                        <IoMdCheckmarkCircleOutline className='w-10 h-10' />
                        Check In
                    </button>
                )}

                {formData.check_in && !formData.break_in && (
                    <button
                        onClick={() => handleTimeMark('break_in')}
                        className="button_entry bg-yellow-500 hover:bg-yellow-600"
                    >
                        <IoPauseSharp className='w-10 h-10' />
                        Break In
                    </button>
                )}

                {formData.break_in && !formData.break_out && (
                    // <button
                    //     onClick={() => handleTimeMark('break_out')}
                    //     className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-3 rounded text-lg"
                    // >
                    //     Break Out
                    // </button>
                    <button
                        onClick={() => handleTimeMark('break_out')}
                        className="button_entry bg-yellow-700 hover:bg-yellow-800"
                    >
                        <GrPlay className='w-10 h-10' />
                        Break Out
                    </button>
                )}

                {formData.break_out && !formData.check_out && (
                    // <button
                    //     onClick={() => handleTimeMark('check_out')}
                    //     className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded text-lg"
                    // >
                    //     Check Out
                    // </button>
                    <button
                        onClick={() => handleTimeMark('check_out')}
                        className="button_entry bg-red-500 hover:bg-red-600"
                    >
                        <HiOutlineArrowRightCircle className='w-10 h-10' />
                        Check Out
                    </button>
                )}

                {formData.check_out && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-md text-left">
                        <h2 className="text-lg font-medium text-blue-700 mb-2">Summary</h2>
                        <p><strong>Check In:</strong> {formData.check_in}</p>
                        <p><strong>Break In:</strong> {formData.break_in}</p>
                        <p><strong>Break Out:</strong> {formData.break_out}</p>
                        <p><strong>Check Out:</strong> {formData.check_out}</p>
                        <p className="mt-2 text-blue-600 font-semibold">
                            Total Working Hours: {getWorkingHours()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceSteps;
