// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyLoading } from "./LazyLoading/LazyLoading";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LazyLoading />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
