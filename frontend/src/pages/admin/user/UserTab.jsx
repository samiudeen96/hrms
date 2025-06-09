import { Route, Routes } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import Users from "./Users";
import Inactive from "./Inactive";
import Add from "./Add";

const UserTab = () => {
  return (
    <>
      <Tabs basePath="/admin/user" tabs={tabs} />

      <Routes>
        <Route path="list" element={<Users />} />
        <Route path="add" element={<Add />} />
        <Route path="inactive" element={<Inactive />} />
        <Route index element={<Users />} /> {/* default tab */}
      </Routes>
    </>
  );
};

const tabs = [
  { label: "Users", path: "list" },
  { label: "Add User", path: "add" },
  { label: "Inactive Users", path: "inactive" },
];

export default UserTab;
