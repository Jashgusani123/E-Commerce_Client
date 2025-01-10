import { Navigate, Outlet } from "react-router-dom"
import { ProtectedRouteProps } from "../Types/types"

const ProtectedRoute = ({isAuthenticated,children,adminOnly,admin,redirect="/"}:ProtectedRouteProps) => {
  
    if(!isAuthenticated)return <Navigate to={redirect}/>
    if(adminOnly && !admin){
        return <Navigate to={redirect}/>
    }
  return children?children:<Outlet />
}

export default ProtectedRoute