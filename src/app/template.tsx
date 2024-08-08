import Transition from '@/components/animations/Transition';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Template({ children }: { children: React.ReactNode }) {
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
        
        // theme="light"
      />
    <Transition>
      <Header />
      {children}
      <Footer />
    </Transition>
    </>
  );
}
