
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { poppins } from "./layout";
// import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic'
const HomePage = dynamic(() => import('@/components/homepage/HomePage'),{
  ssr:false
})


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
