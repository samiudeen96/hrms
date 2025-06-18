import React from 'react'
import Tabs from '../../../components/Tabs';
import { Route, Routes } from 'react-router-dom';
import Attendance from './Attendance';
import Report from './Report';

const AttendanceTab = () => {
    return (
        <>
            <Tabs basePath="/employee/attendance" tabs={tabs} />

            <Routes>
                <Route path="entry" element={<Attendance />} />
                <Route path="report" element={<Report />} />
                <Route index element={<Attendance />} /> {/* default tab */}
            </Routes>
        </>
    );
}


const tabs = [
    { label: "Attendance", path: "entry" },
    { label: "Report", path: "report" },
];

export default AttendanceTab