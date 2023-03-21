import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  return (
    <main className="App">
      <ToastContainer />
      <Outlet />
    </main>
  );
};
