import { Route, Routes } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import EmployeeWise from "./EmployeeWise";
import AddDepartment from "./addDepartment";
import Departments from "./Departments";

const DepartmentTab = () => {
  return (
    <>
      <Tabs basePath="/admin/department" tabs={tabs} />

      <Routes>
        <Route path="list" element={<Departments />} />
        <Route path="add" element={<AddDepartment />} />
        <Route path="emplist" element={<EmployeeWise />} />
        <Route index element={<Departments />} /> {/* default tab */}
      </Routes>
    </>
  );
};


const tabs = [
  { label: "Departments", path: "list" },
  { label: "Add Department", path: "add" },
  { label: "Employee-wise", path: "emplist" },
];

export default DepartmentTab
