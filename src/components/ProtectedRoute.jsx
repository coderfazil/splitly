import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <div>
      <Outlet /> {/* This allows the child routes to be displayed */}
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
