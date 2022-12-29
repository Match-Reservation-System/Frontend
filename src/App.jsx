// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import UserAccount from "./UserAccount/UserAccount";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "account",
      element: <UserAccount />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
