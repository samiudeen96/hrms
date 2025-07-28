import React, { useEffect, useRef, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";
import { GrPlay } from "react-icons/gr";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import Title from "../../../components/Title";
import { useGetAttendance, useMarkAttendance } from '../../../hooks/attendanceHook';
import { toast } from 'react-hot-toast';

const Attendance = () => {
  // const { data: getAttendance } = useGetAttendance();
  // console.log("attendance: ", getAttendance);

  const defaultForm = {
    check_in: '',
    break_in: '',
    break_out: '',
    check_out: '',
    date: todayDate,
    status: 'absent',
    total_working_seconds: ''
  };

  const [formData, setFormData] = useState(defaultForm);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef(null);
  const createAttendance = useMarkAttendance();

  const formatElapsed = (ms) => {
    if (!ms || isNaN(ms)) return '--:--:--';
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // ✅ Load saved data from localStorage
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('daily_attendance'));
    const savedTime = parseInt(localStorage.getItem('elapsed_time') || '0');
    const today = new Date().toISOString().split('T')[0];

    if (savedForm?.date === today) {
      setFormData(savedForm);
      setElapsedTime(savedTime);

      const shouldResume =
        savedForm.check_in && !savedForm.check_out &&
        (!savedForm.break_in || (savedForm.break_out && !savedForm.check_out));

      if (shouldResume) setTimerRunning(true);
    } else {
      localStorage.removeItem('daily_attendance');
      localStorage.removeItem('elapsed_time');
      setFormData(defaultForm);
      setElapsedTime(0);
    }

    setIsLoaded(true);
  }, []);

  // ✅ Persist form and timer
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('daily_attendance', JSON.stringify(formData));
      localStorage.setItem('elapsed_time', elapsedTime.toString());
    }
  }, [formData, elapsedTime, isLoaded]);

  // ✅ Manage Timer
  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerRunning]);

  const saveAttendance = async (updated) => {
    createAttendance.mutate(updated, {
      onSuccess: () => toast.success("Attendance saved."),
      onError: () => toast.error("Error saving attendance."),
    });
  };

  const handleTimeMark = async (field) => {
    const now = new Date().toISOString();
    const updated = { ...formData, [field]: now };

    if (field === 'check_in') {
      updated.status = 'present';
      setElapsedTime(0);
      setTimerRunning(true);
    }

    if (field === 'break_in') setTimerRunning(false);
    if (field === 'break_out') setTimerRunning(true);

    if (field === 'check_out') {
      setTimerRunning(false);

      const checkIn = new Date(formData.check_in);
      const checkOut = new Date(now);
      let totalWorkingMs = checkOut - checkIn;

      if (formData.break_in && formData.break_out) {
        const breakIn = new Date(formData.break_in);
        const breakOut = new Date(formData.break_out);
        const breakDuration = breakOut - breakIn;
        if (breakDuration > 0) {
          totalWorkingMs -= breakDuration;
        }
      }

      const totalSeconds = Math.floor(totalWorkingMs / 1000);
      updated.total_working_seconds = totalSeconds;
    }

    setFormData(updated);
    await saveAttendance(updated);
  };

  const renderTime = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleTimeString() : '--';
  };

  const currentStep = (() => {
    if (!formData.check_in) return 'check_in';
    if (!formData.break_in) return 'break_in';
    if (!formData.break_out) return 'break_out';
    if (!formData.check_out) return 'check_out';
    return 'summary';
  })();

  if (!isLoaded) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="wrapper flex items-center justify-center px-4 h-[calc(100vh-151px)]">
      <div className="w-full max-w-sm text-center space-y-6 flex flex-col items-center">
        <div className="text-3xl font-bold text-yellow-600">
          ⏱️ {formatElapsed(elapsedTime)}
        </div>

        <div className="bg-white p-8 rounded-xl shadow w-full space-y-6 flex flex-col items-center">
          <Title title="Daily Attendance" />

          <div className=''>
                      {currentStep === 'check_in' && (
            <button onClick={() => handleTimeMark('check_in')} className="button_entry bg-green-600 hover:bg-green-700">
              <IoMdCheckmarkCircleOutline className='w-10 h-10' /> Check In
            </button>
          )}

          {currentStep === 'break_in' && (
            <button onClick={() => handleTimeMark('break_in')} className="button_entry bg-yellow-500 hover:bg-yellow-600">
              <IoPauseSharp className='w-10 h-10' /> Break In
            </button>
          )}

          {currentStep === 'break_out' && (
            <button onClick={() => handleTimeMark('break_out')} className="button_entry bg-yellow-700 hover:bg-yellow-800">
              <GrPlay className='w-10 h-10' /> Break Out
            </button>
          )}

          {currentStep === 'check_out' && (
            <button onClick={() => handleTimeMark('check_out')} className="button_entry bg-red-500 hover:bg-red-600">
              <HiOutlineArrowRightCircle className='w-10 h-10' /> Check Out
            </button>
          )}

          {currentStep === 'summary' && (
            <div className="mt-4 bg-primary/20 p-4 rounded-md text-left w-full">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Check In:</strong> {renderTime(formData.check_in)}</p>
              <p><strong>Break In:</strong> {renderTime(formData.break_in)}</p>
              <p><strong>Break Out:</strong> {renderTime(formData.break_out)}</p>
              <p><strong>Check Out:</strong> {renderTime(formData.check_out)}</p>
              <p><strong>Status:</strong> {formData.status}</p>
              <p className="mt-2 text-yellow-600 font-semibold">
                Total Working Hours: {
                  formData.total_working_seconds
                    ? formatElapsed(formData.total_working_seconds * 1000)
                    : '--:--:--'
                }
              </p>
            </div>
          )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Attendance;
