import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { MOCK_STAFF, MOCK_RESULTS, MOCK_JACKPOT, MOCK_SETTINGS } from './mockData';

const USE_MOCK = true; // Set to false when connecting to real Firebase

// --- Staff Services ---
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

// --- Result Services ---
export const getResults = async () => {
  if (USE_MOCK) return MOCK_RESULTS;
  const q = query(collection(db, 'results'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// --- Jackpot Services ---
export const getJackpotImages = async () => {
  if (USE_MOCK) return MOCK_JACKPOT;
  const q = query(collection(db, 'jackpot_proof'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// --- Settings/Links Services ---
export const getSettings = async () => {
  if (USE_MOCK) return MOCK_SETTINGS;
  const snapshot = await getDocs(collection(db, 'settings'));
  if (snapshot.empty) return {};
  return snapshot.docs[0].data();
};

// --- Complaint Services ---
export const submitComplaint = async (complaintData) => {
  if (USE_MOCK) {
    console.log("Mock complaint submitted:", complaintData);
    return true;
  }
  return await addDoc(collection(db, 'complaints'), {
    ...complaintData,
    createdAt: new Date().toISOString()
  });
};
