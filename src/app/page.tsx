import HomePage from "@/components/homepage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { poppins } from "./layout";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // className={poppins.className}
        // theme="light"
      />
      <HomePage />
    </>
  );
}
