// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from './firebase.config';

/**
 * Add your own firebase config here
 */
const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);

export { db };
