// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyLoading } from "./LazyLoading/LazyLoading";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import UserAccount from "./UserAccount/UserAccount";
import { Admin } from "./Admin/AdminPage";
import { ProtectedRoutes } from "./UtilsComponents/ProtectedRoutes";
import { CreateMatch } from "./Manager/MatchCreate/CreateMatch";
import Matches from "./Matches/Matches";
import ReserveTicket from "./ReserveTicket/ReserveTicket";
const App = () => {
  const token = localStorage.getItem("token");
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/account",
        element: (
          <ProtectedRoutes requestedRole="fan">
            <UserAccount />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: token ? <HomePage /> : <Login />,
      },
      {
        path: "/signup",
        element: token ? <HomePage /> : <Signup />,
      },
      {
        path: "/admin/managers",
        element: (
          <ProtectedRoutes requestedRole="admin">
            <Admin fetchUrl="/admin/unverified" />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoutes requestedRole="admin">
            <Admin fetchUrl="/admin/all" />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/matches/create",
        element: (
          <ProtectedRoutes requestedRole="manager">
            <CreateMatch />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/matches/reserveTicket/:match_id",
        element: (
          <ProtectedRoutes requestedRole="fan">
            <ReserveTicket />
          </ProtectedRoutes>
        ),
      },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
