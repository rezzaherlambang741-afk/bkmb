import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot, setDoc } from 'firebase/firestore';
import { MOCK_STAFF, MOCK_RESULTS, MOCK_JACKPOT, MOCK_SETTINGS } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

// Helper for Mock Subscriptions
const mockSubscribe = (data, callback) => {
  callback(data);
  return () => {}; // Unsubscribe function
};

// --- Staff Services ---
export const subscribeToStaff = (callback) => {
  if (USE_MOCK) return mockSubscribe(MOCK_STAFF, callback);
  const q = query(collection(db, 'customer_service'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const getStaff = async () => {
  if (USE_MOCK) return MOCK_STAFF;
  const q = query(collection(db, 'customer_service'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addStaff = async (staffData) => {
  if (USE_MOCK) {
    const newStaff = { id: Date.now().toString(), ...staffData };
    MOCK_STAFF.push(newStaff);
    return newStaff;
  }
  return await addDoc(collection(db, 'customer_service'), staffData);
};

export const deleteStaff = async (id) => {
  if (USE_MOCK) {
    const index = MOCK_STAFF.findIndex(s => s.id === id);
    if (index !== -1) MOCK_STAFF.splice(index, 1);
    return true;
  }
  return await deleteDoc(doc(db, 'customer_service', id));
};

// --- Result Services ---
export const subscribeToResults = (callback) => {
  if (USE_MOCK) return mockSubscribe(MOCK_RESULTS, callback);
  const q = query(collection(db, 'results'), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const getResults = async () => {
  if (USE_MOCK) return MOCK_RESULTS;
  const q = query(collection(db, 'results'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addResult = async (resultData) => {
  if (USE_MOCK) {
    const newResult = { id: Date.now().toString(), ...resultData };
    MOCK_RESULTS.unshift(newResult);
    return newResult;
  }
  return await addDoc(collection(db, 'results'), resultData);
};

export const deleteResult = async (id) => {
  if (USE_MOCK) {
    const index = MOCK_RESULTS.findIndex(r => r.id === id);
    if (index !== -1) MOCK_RESULTS.splice(index, 1);
    return true;
  }
  return await deleteDoc(doc(db, 'results', id));
};

// --- Jackpot Services ---
export const subscribeToJackpot = (callback) => {
  if (USE_MOCK) return mockSubscribe(MOCK_JACKPOT, callback);
  const q = query(collection(db, 'jackpot_proof'), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const getJackpotImages = async () => {
  if (USE_MOCK) return MOCK_JACKPOT;
  const q = query(collection(db, 'jackpot_proof'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addJackpot = async (jackpotData) => {
  if (USE_MOCK) {
    const newJackpot = { id: Date.now().toString(), ...jackpotData };
    MOCK_JACKPOT.unshift(newJackpot);
    return newJackpot;
  }
  return await addDoc(collection(db, 'jackpot_proof'), jackpotData);
};

export const deleteJackpot = async (id) => {
  if (USE_MOCK) {
    const index = MOCK_JACKPOT.findIndex(j => j.id === id);
    if (index !== -1) MOCK_JACKPOT.splice(index, 1);
    return true;
  }
  return await deleteDoc(doc(db, 'jackpot_proof', id));
};

// --- Settings/Links Services ---
export const subscribeToSettings = (callback) => {
  if (USE_MOCK) return mockSubscribe(MOCK_SETTINGS, callback);
  // Settings is a single doc usually, but we'll use a collection 'settings' doc 'config'
  const docRef = doc(db, 'settings', 'config');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback({}); // Return empty if not set
    }
  });
};

export const getSettings = async () => {
  if (USE_MOCK) return MOCK_SETTINGS;
  const docRef = doc(db, 'settings', 'config');
  const docSnap = await getDoc(docRef); // Note: need getDoc import, or just use getDocs and filter
  // Using getDocs to avoid extra import if lazy, but cleaner to fix imports
  const snapshot = await getDocs(collection(db, 'settings'));
  if (snapshot.empty) return {};
  // Assuming first doc or ID 'config'
  const configDoc = snapshot.docs.find(d => d.id === 'config');
  return configDoc ? configDoc.data() : (snapshot.docs[0]?.data() || {});
};

export const updateSettings = async (newSettings) => {
  if (USE_MOCK) {
    Object.assign(MOCK_SETTINGS, newSettings);
    return true;
  }
  // Use setDoc with merge to ensure 'config' doc exists
  return await setDoc(doc(db, 'settings', 'config'), newSettings, { merge: true });
};

// --- Complaint Services ---
export const subscribeToComplaints = (callback) => {
  if (USE_MOCK) {
    return mockSubscribe(window.MOCK_COMPLAINTS || [], callback);
  }
  const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const submitComplaint = async (complaintData) => {
  if (USE_MOCK) {
    if (!window.MOCK_COMPLAINTS) window.MOCK_COMPLAINTS = [];
    window.MOCK_COMPLAINTS.push({ id: Date.now().toString(), ...complaintData, createdAt: new Date().toISOString() });
    return true;
  }
  return await addDoc(collection(db, 'complaints'), {
    ...complaintData,
    createdAt: new Date().toISOString()
  });
};

export const getComplaints = async () => {
  if (USE_MOCK) {
    return window.MOCK_COMPLAINTS || [];
  }
  const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
