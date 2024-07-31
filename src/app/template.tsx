import Transition from '@/components/animations/Transition';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Transition>
      <Header />
      {children}
      <Footer />
    </Transition>
  );
}
