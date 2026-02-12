import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home.jsx";
import { Layout } from "./views/Layout.jsx";
import AboutUs from "./views/AboutUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/aboutUs", element: <AboutUs /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
