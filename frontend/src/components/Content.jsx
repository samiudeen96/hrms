import { Outlet } from "react-router-dom"

const Content = () => {
    return (
        <div className='grow p-5'><Outlet /></div>
    )
}

export default Content;