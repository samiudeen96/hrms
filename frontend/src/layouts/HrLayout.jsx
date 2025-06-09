import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import { headerDropdown, roleMenus } from '../utils/constant';
import Header from '../components/Header';

const HrLayout = () => {
  return (
    <>
      {/* Sidebar - Fixed */}
      <div className="fixed top-0 left-0 w-60 h-screen z-50 hidden sm:block">
        <Sidebar menu={roleMenus.hr} />
      </div>

      {/* Header - Fixed */}
      <div className="fixed top-0 sm:left-60 right-0 h-15 z-40">
        <Header menu={headerDropdown.hr} />
      </div>

      {/* Content - Scrollable */}
      <div className="sm:ml-60 mt-15 p-4 h-[calc(100vh-4rem)] overflow-y-auto bg-background">
        <Content />
      </div>
    </>
  );
};



export default HrLayout