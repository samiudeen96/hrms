import { Route, Routes } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import ManageDepartment from "./ManageDepartment";
import EmployeeWise from "./EmployeeWise";

const DepartmentTab = () => {
  return (
    <>
      <Tabs basePath="/admin/department" tabs={tabs} />

      <Routes>
        <Route path="manage" element={<ManageDepartment />} />
        <Route path="list" element={<EmployeeWise />} />
        <Route index element={<ManageDepartment />} /> {/* default tab */}
      </Routes>
    </>
  );
};

const tabs = [
  { label: "Manage Department", path: "manage" },
  { label: "Employee-wise", path: "list" },
];

export default DepartmentTab
