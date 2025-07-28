import { Route, Routes } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import Profile from "./Profile";
import Branding from "./Branding";
import Settings from "./Settings";


const SettingTab = () => {
  return (
    <>
      <Tabs basePath="/admin/settings" tabs={tabs} />

      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="theme" element={<Branding />} />
        <Route path="settings" element={<Settings />} />

        <Route index element={<Profile />} /> {/* default tab */}
      </Routes>
    </>
  );
};

const tabs = [
  { label: "Profile", path: "profile" },
  { label: "Theme", path: "theme" },
  { label: "Settings", path: "settings" },
];

export default SettingTab;
