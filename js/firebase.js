import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjqN4v3Z-FXsg4e8BlZoZ8z0m8OaEcnjg",
  authDomain: "biblioteca-7f854.firebaseapp.com",
  projectId: "biblioteca-7f854",
  storageBucket: "biblioteca-7f854.firebasestorage.app",
  messagingSenderId: "178547109911",
  appId: "1:178547109911:web:4310c396a8a4cbed2cec52"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };