import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// =======================================================
// ⚠️ ATENCIÓN: CONFIGURACIÓN DE FIREBASE
// Reemplaza estos valores con los de tu proyecto de Firebase
// =======================================================
const firebaseConfig = {
  apiKey: "AIzaSyAJCR0QD6ifBVg6VcMN7ok9hJAQ5gkaxKQ",
  authDomain: "charuautos.firebaseapp.com",
  projectId: "charuautos",
  storageBucket: "charuautos.firebasestorage.app",
  messagingSenderId: "293629761836",
  appId: "1:293629761836:web:a122f3ef8218e567b53489"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// =======================================================
// FUNCIONES DE AUTENTICACIÓN (Expuestas globalmente)
// =======================================================

window.loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("✅ Usuario logueado con Google:", result.user);
    if(typeof closeAuthModal === 'function') closeAuthModal();
  } catch (error) {
    console.error("❌ Error en Google Sign-In:", error);
    alert("Error al iniciar sesión con Google: " + error.message);
  }
};

window.loginWithEmail = async () => {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  
  if(!email || !password) {
    alert("Por favor, ingresa correo y contraseña.");
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Usuario logueado con Email:", result.user);
    if(typeof closeAuthModal === 'function') closeAuthModal();
  } catch (error) {
    console.error("❌ Error en Email Sign-In:", error);
    alert("Credenciales incorrectas o usuario no encontrado.");
  }
};

window.logoutUser = async () => {
  if(confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    try {
      await signOut(auth);
      console.log("👋 Sesión cerrada");
    } catch (error) {
      console.error("❌ Error cerrando sesión:", error);
    }
  }
};


// =======================================================
// SINCRONIZACIÓN EN LA NUBE (FIRESTORE)
// =======================================================

window.syncUserDataToCloud = async () => {
  const user = auth.currentUser;
  if (!user) return; // Solo sincroniza si hay cuenta activa

  const dataToSync = {
    fuelHistory: JSON.parse(localStorage.getItem("charu_fuel_history") || "[]"),
    savedComparisons: JSON.parse(localStorage.getItem("charu_saved_comparisons") || "[]"),
    activeVehicle: JSON.parse(localStorage.getItem("charu_active_vehicle") || "null"),
    lastSync: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, "users", user.uid), dataToSync, { merge: true });
    console.log("☁️ Respaldado en la nube de CharuAutos.");
  } catch (e) {
    console.error("Error sincronizando a la nube:", e);
  }
};

window.downloadUserDataFromCloud = async (user) => {
  try {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if(data.fuelHistory) localStorage.setItem("charu_fuel_history", JSON.stringify(data.fuelHistory));
      if(data.savedComparisons) localStorage.setItem("charu_saved_comparisons", JSON.stringify(data.savedComparisons));
      if(data.activeVehicle) localStorage.setItem("charu_active_vehicle", JSON.stringify(data.activeVehicle));
      
      // Refrescar la UI
      if(typeof renderFuelHistory === "function") renderFuelHistory();
      console.log("⬇️ Historial descargado de la nube.");
    }
  } catch (e) {
    console.error("Error descargando de la nube:", e);
  }
};

// =======================================================
// OBSERVADOR DE ESTADO (Se ejecuta al cargar y al loguearse)
// =======================================================
onAuthStateChanged(auth, (user) => {
  const authBtn = document.getElementById('authBtn');
  if (!authBtn) return;

  if (user) {
    // ESTADO: LOGUEADO
    const displayName = user.displayName || user.email.split('@')[0];
    const photo = user.photoURL || '/assets/icons/favicon.ico';
    
    authBtn.innerHTML = `
      <img src="${photo}" style="width:16px; height:16px; border-radius:50%; object-fit:cover;">
      <span style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${displayName}</span>
    `;
    
    // Cambiar la acción del botón a cerrar sesión
    authBtn.onclick = logoutUser;
    authBtn.title = "Cerrar sesión";
    authBtn.classList.add('logged-in');
    
    // ☁️ Descargar e hidratar UI al iniciar sesión
    window.downloadUserDataFromCloud(user);
  } else {
    // ESTADO: DESLOGUEADO
    authBtn.innerHTML = `
      <svg class="cockpit-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Entrar</span>
    `;
    
    // Cambiar la acción del botón a abrir el modal
    authBtn.onclick = () => { if(typeof openAuthModal === 'function') openAuthModal(); };
    authBtn.title = "Iniciar sesión";
    authBtn.classList.remove('logged-in');
  }
});
