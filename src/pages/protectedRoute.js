import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  if (roles && !roles.includes(user.user_role)) {
    toast.error("Only Admin have Access !! ");
    return <Navigate to="/landing" />;
  }

  return children;
};
export default ProtectedRoute;
