import { Route, Routes } from "react-router-dom";
import Tabs from '../../../components/Tabs';
import Profile from '../../common/Profile';

const SettingTab = () => {
  return (
    <>
      <Tabs basePath="/employee/settings" tabs={tabs} />

      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route index element={<Profile />} /> {/* default tab */}
      </Routes>
    </>
  );
};

const tabs = [
  { label: "Profile", path: "profile" },
];

export default SettingTab;