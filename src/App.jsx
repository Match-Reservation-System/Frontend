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
const App = () => {
 
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/account",
        element: <UserAccount />,
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
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
