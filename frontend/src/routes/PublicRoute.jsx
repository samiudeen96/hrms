import { Route } from "react-router-dom";
import Login from "../pages/auth/Login";

const PublicRoute = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
        </>
    )
}

export default PublicRoute;