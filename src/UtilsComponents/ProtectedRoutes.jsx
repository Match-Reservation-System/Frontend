import { Error } from "../Error/Error";

export const ProtectedRoutes = (props) => {
  let { requestedRole, children } = props;

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  if (!token) {
    return <Error message="You are not logged in" />;
  }
  if (requestedRole !== role) {
    return <Error message="You are not authorized to view this page" />;
  }
  return <>{children}</>;
};
