import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNgR579wSV8J89xTxCQxdq1keU-8j0fV4",
  authDomain: "vuetask-deb54.firebaseapp.com",
  projectId: "vuetask-deb54",
  storageBucket: "vuetask-deb54.firebasestorage.app",
  messagingSenderId: "134869178374",
  appId: "1:134869178374:web:093236a41ad9c95a1c8b87",
  measurementId: "G-8F3BPYHH1H",
};

export default defineNuxtPlugin((nuxtApp) => {
  // Inicializa o FireStore.
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Acesso Global.
  nuxtApp.provide("db", db);
});
