import { Route, Routes } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import Employees from "./Employees";
import AddEmployee from "./AddEmployee";

const EmployeeTab = () => {
    return (
        <>
            <Tabs basePath="/admin/employee" tabs={tabs} />

            <Routes>
                <Route path="list" element={<Employees />} />
                <Route path="add" element={<AddEmployee />} />
                {/* <Route path="emplist" element={<EmployeeWise />} /> */}
                <Route index element={<Employees />} /> {/* default tab */}
            </Routes>
        </>
    );
};


const tabs = [
    { label: "Employees", path: "list" },
    { label: "Add Employee", path: "add" },
];

export default EmployeeTab
