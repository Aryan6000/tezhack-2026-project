import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isAdmin,   setIsAdmin]   = useState(false);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const snap = await getDoc(doc(db, 'users', u.uid));
          const role = snap.exists() ? snap.data()?.role : null;
          if (role === 'admin') {
            setAdminUser(u);
            setIsAdmin(true);
          } else {
            // Signed in but not admin — sign out silently
            await auth.signOut();
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
