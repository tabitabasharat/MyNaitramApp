
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { poppins } from "./layout";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head"

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <style>
          {
            `html {
                -webkit-overflow-scrolling: touch;
              }
            `
          }
        </style>
        </Head>
      <HomePage />
    </>
  );
}
