import { Outlet } from "react-router-dom"

const Content = () => {
    return (
        <div className='grow p-5 bg-background'><Outlet /></div>
    )
}

export default Content;