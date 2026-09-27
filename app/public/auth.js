import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// =======================================================
// ⚠️ ATENCIÓN: CONFIGURACIÓN DE FIREBASE
// Reemplaza estos valores con los de tu proyecto de Firebase
// =======================================================
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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
