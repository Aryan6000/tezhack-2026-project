import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setAdminUser(u);
      setLoading(false);
    });
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminUser, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
