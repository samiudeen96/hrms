import { Route, Routes } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import DailyAttendance from "./DailyAttendance";
import Reports from "./Reports";
import ManualEntry from "./ManualEntry";

const AttendanceTab = () => {
  return (
    <>
      <Tabs basePath="/admin/attendance" tabs={tabs} />

      <Routes>
        <Route path="attendance" element={<DailyAttendance />} />
        <Route path="reports" element={<Reports />} />
        <Route path="entry" element={<ManualEntry />} />
        <Route index element={<DailyAttendance />} /> {/* default tab */}
      </Routes>
    </>
  );
};


const tabs = [
  { label: "Daily Attendance", path: "attendance" },
  { label: "Report", path: "reports" },
  { label: "Manual Entry", path: "entry" },
];

export default AttendanceTab
