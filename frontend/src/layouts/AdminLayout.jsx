import SideBar from '../components/SideBar'
import Content from '../components/Content'
import SideNav from '../components/SideNav';

const AdminLayout = () => {
  return (
    <div className='flex '>
      <><SideBar /></>
      {/* <><SideNav /></> */}

      <><Content /></>
    </div>
  )
}

export default AdminLayout;