// src/lib/ProtectedRoute/Protectedroute.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Protectedroute<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const userId = localStorage.getItem('_id');
      if (!userId) {
        router.replace('/'); // Redirect to the login page
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

export default Protectedroute;
