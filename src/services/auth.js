import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

// Mock Admin User
const MOCK_ADMIN = {
  uid: 'admin123',
  email: 'admin@example.com',
  role: 'admin'
};

export const loginAdmin = async (email, password) => {
  if (USE_MOCK) {
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('mockAuth', JSON.stringify(MOCK_ADMIN));
      return MOCK_ADMIN;
    }
    throw new Error('Invalid credentials');
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  if (USE_MOCK) {
    localStorage.removeItem('mockAuth');
    return;
  }
  return await signOut(auth);
};

export const subscribeToAuth = (callback) => {
  if (USE_MOCK) {
    const user = JSON.parse(localStorage.getItem('mockAuth'));
    callback(user);
    // Mimic listener (no real cleanup needed for sync mock)
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
