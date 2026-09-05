import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { adminAuth, adminDb } from '../lib/firebase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isAdmin,   setIsAdmin]   = useState(false);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    return onAuthStateChanged(adminAuth, async (u) => {
      if (u) {
        try {
          const snap = await getDoc(doc(adminDb, 'users', u.uid));
          const role = snap.exists() ? snap.data()?.role : null;
          if (role === 'admin') {
            setAdminUser(u);
            setIsAdmin(true);
          } else {
            // User is a citizen or other role, not admin
            setAdminUser(null);
            setIsAdmin(false);
          }
        } catch {
          setAdminUser(null);
          setIsAdmin(false);
        }
      } else {
        setAdminUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminUser, isAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
