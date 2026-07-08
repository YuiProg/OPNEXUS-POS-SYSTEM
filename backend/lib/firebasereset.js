import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCTItqNfp1T1oxdprHMFaeJYUHP-Ktqk4Q",
  authDomain: "vaporya-pos.firebaseapp.com",
  databaseURL: "https://vaporya-pos-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "vaporya-pos",
  storageBucket: "vaporya-pos.firebasestorage.app",
  messagingSenderId: "214365673878",
  appId: "1:214365673878:web:19ab0383f2bfdfa2dc65b7",
  measurementId: "G-NNPSE86G0D"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export function scheduleDailyReset() {
    const ONE_DAYS_MS = 1 * 24 * 60 * 60 * 1000;

    setInterval(async () => {
        try {
            console.log(`[Firebase Reset] Starting scheduled wipe at ${new Date().toISOString()}`);
            await remove(ref(db, '/'));
            console.log('[Firebase Reset] Done — all data under "/" deleted.');
        } catch (err) {
            console.error('[Firebase Reset] Failed:', err);
        }
    }, ONE_DAYS_MS);

    console.log(`[Firebase Reset] Reset job scheduled (every ${ONE_DAYS_MS / (1000 * 60 * 60 * 24)} days from server start).`);
}