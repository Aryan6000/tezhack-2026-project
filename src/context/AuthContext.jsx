import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [profile, setProfile] = useState(null); // { role, fullName, ... }
  const [loading, setLoading] = useState(true);

  async function loadProfile(uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        // Self-heal: create missing profile doc with default role
        const fallback = {
          uid,
          fullName: auth.currentUser?.displayName || 'Citizen',
          email: auth.currentUser?.email || '',
          role: 'citizen',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        try {
          await setDoc(doc(db, 'users', uid), fallback);
          setProfile(fallback);
        } catch {
          setProfile({ role: 'citizen', fullName: auth.currentUser?.displayName || 'Citizen' });
        }
      }
    } catch {
      setProfile({ role: 'citizen', fullName: auth.currentUser?.displayName || 'Citizen' });
    }
  }

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await loadProfile(u.uid);
      else    setProfile(null);
      setLoading(false);
    });
  }, []);

  const signUp = async (email, password, name) => {
    const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await updateProfile(u, { displayName: name });
    } catch (e) {
      console.warn('updateProfile warning:', e);
    }
    try {
      // Create user profile doc with default citizen role
      await setDoc(doc(db, 'users', u.uid), {
        uid: u.uid, fullName: name, email, role: 'citizen',
        createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('setDoc user profile warning:', e);
    }
  };

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logOut = () => signOut(auth);

  const isAdmin   = profile?.role === 'admin';
  const isOfficer = profile?.role === 'officer';

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, logOut, isAdmin, isOfficer }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
