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
import { CreateStadium } from "./Manager/MatchCreate/CreateStadiums";
import MatchCard from "./UtilsComponents/MatchCard/MatchCard";
import Matches from "./Matches/Matches";
import { Error } from "./Error/Error";
const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/account",
        element: (
          // <ProtectedRoutes requestedRole="fan">
          <UserAccount />
          // </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
        path: "/matches/edit/:id",
        element: (
          <ProtectedRoutes requestedRole="manager">
            <CreateMatch />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/stadiums",
        element: (
          <ProtectedRoutes requestedRole="manager">
            <CreateStadium />
          </ProtectedRoutes>
        ),
        path: "/matches",
        element: <Matches />,
      },
      // add errorElement to the route
      {
        path: "*",
        element: <Error message="404 Page Not Found" />,
      },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
