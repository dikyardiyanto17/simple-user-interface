import { createBrowserRouter } from "react-router-dom";
import Login from '../views/Login'
import Register from '../views/Register';
import Home from "../views/Home";
import { redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
        if (!localStorage.access_token) throw redirect('/login')
        return null
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
          path: "register",
          element: (
              <Register />
          ),
      }
    ],
  },
  {
    path: "/",
    loader: () => {
        if (localStorage.access_token) throw redirect('/')
        return null
    },
    children: [
        {
            path: "login",
            element: (
                <Login />
            ),
        }
    ]
  },
]);

export default router;
