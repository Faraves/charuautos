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
    maintenanceLogs: JSON.parse(localStorage.getItem("charu_maintenance_logs") || "[]"),
    maintRegime: localStorage.getItem("charu_maint_regime") || "severe",
    savedComparisons: JSON.parse(localStorage.getItem("charu_saved_comparisons") || "[]"),
    activeVehicle: JSON.parse(localStorage.getItem("charu_active_vehicle") || "null"),
    lastSync: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, "users", user.uid), dataToSync, { merge: true });
    console.log("☁️ Respaldado en la nube de BajoKapot.");
  } catch (e) {
    console.error("Error sincronizando a la nube:", e);
  }
};

function mergeUniqueArrays(localArr, cloudArr) {
  const map = new Map();
  [...cloudArr, ...localArr].forEach(item => {
    const sig = item && typeof item === "object"
      ? (item.id ? String(item.id) + "|" + (item.date || "") + "|" + (item.cost || item.usd || "") : JSON.stringify(item))
      : String(item);
    map.set(sig, item);
  });
  return Array.from(map.values());
}

window.downloadUserDataFromCloud = async (user) => {
  try {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      const data = docSnap.data();

      if (Array.isArray(data.fuelHistory) && data.fuelHistory.length > 0) {
        const localFuel = JSON.parse(localStorage.getItem("charu_fuel_history") || "[]");
        localStorage.setItem("charu_fuel_history", JSON.stringify(localFuel.length ? mergeUniqueArrays(localFuel, data.fuelHistory) : data.fuelHistory));
      }
      if (Array.isArray(data.maintenanceLogs) && data.maintenanceLogs.length > 0) {
        const localMaint = JSON.parse(localStorage.getItem("charu_maintenance_logs") || "[]");
        localStorage.setItem("charu_maintenance_logs", JSON.stringify(localMaint.length ? mergeUniqueArrays(localMaint, data.maintenanceLogs) : data.maintenanceLogs));
      }
      if (data.maintRegime && !localStorage.getItem("charu_maint_regime")) {
        localStorage.setItem("charu_maint_regime", data.maintRegime);
      }
      if (Array.isArray(data.savedComparisons) && data.savedComparisons.length > 0) {
        const localComp = JSON.parse(localStorage.getItem("charu_saved_comparisons") || "[]");
        localStorage.setItem("charu_saved_comparisons", JSON.stringify(localComp.length ? mergeUniqueArrays(localComp, data.savedComparisons) : data.savedComparisons));
      }
      if (data.activeVehicle && !localStorage.getItem("charu_active_vehicle")) {
        localStorage.setItem("charu_active_vehicle", JSON.stringify(data.activeVehicle));
      }

      // Refrescar la UI sin destruir el estado actual
      if (typeof renderGarageVehicleHeader === "function") renderGarageVehicleHeader();
      if (typeof renderPreventiveMatrix === "function") renderPreventiveMatrix();
      if (typeof renderFuelHistory === "function") renderFuelHistory();
      if (typeof renderGarageAnalytics === "function") renderGarageAnalytics();
      if (typeof renderSavedComparisons === "function") renderSavedComparisons();
      console.log("⬇️ Historial sincronizado desde la nube de BajoKapot.");
    }
  } catch (e) {
    console.error("Error descargando de la nube:", e);
  }
};

// =======================================================
// OBSERVADOR DE ESTADO (Se ejecuta al cargar y al loguearse)
// =======================================================
function escapeAuthHtml(val) {
  return String(val || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

onAuthStateChanged(auth, (user) => {
  const authBtn = document.getElementById('authBtn');
  const popover = document.getElementById('userProfilePopover');
  if (!authBtn) return;

  if (user) {
    // ESTADO: LOGUEADO (Solo avatar circular en barra; detalles en popover)
    const rawName = user.displayName || (user.email ? user.email.split('@')[0] : 'Piloto');
    const safeName = escapeAuthHtml(rawName);
    const safeEmail = escapeAuthHtml(user.email || 'Cuenta vinculada');
    const safePhoto = escapeAuthHtml(user.photoURL || 'bajokapot-icon.png');

    authBtn.innerHTML = `
      <img src="${safePhoto}" alt="${safeName}" onerror="this.onerror=null;this.src='bajokapot-icon.png';" style="width:100%; height:100%; border-radius:50%; object-fit:cover; display:block;">
    `;
    authBtn.onclick = (e) => { if (typeof toggleUserProfilePopover === 'function') toggleUserProfilePopover(e); };
    authBtn.title = rawName;
    authBtn.classList.add('logged-in');

    if (popover) {
      const authSec = document.getElementById('userPopoverAuthSection') || popover;
      authSec.innerHTML = `
        <div class="user-popover-head">
          <img src="${safePhoto}" alt="${safeName}" onerror="this.onerror=null;this.src='bajokapot-icon.png';" class="user-popover-avatar">
          <div class="user-popover-meta">
            <div class="user-popover-name">${safeName}</div>
            <div class="user-popover-email">${safeEmail}</div>
          </div>
        </div>
        <div class="user-popover-cloud">
          <svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
          <span>Sincronizado en BajoKapot Cloud</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" style="width:100%; margin-top:8px;" onclick="if(typeof toggleUserProfilePopover === 'function') toggleUserProfilePopover(false); logoutUser();">
          Cerrar sesión
        </button>
      `;
    }

    // ☁️ Descargar e hidratar UI al iniciar sesión
    window.downloadUserDataFromCloud(user);
  } else {
    // ESTADO: DESLOGUEADO (Solo icono de usuario en barra; acceso dentro del popover)
    authBtn.innerHTML = `
      <svg class="cockpit-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    `;
    authBtn.onclick = (e) => { if (typeof toggleUserProfilePopover === 'function') toggleUserProfilePopover(e); };
    authBtn.title = "Cuenta de usuario";
    authBtn.classList.remove('logged-in');

    if (popover) {
      const authSec = document.getElementById('userPopoverAuthSection') || popover;
      authSec.innerHTML = `
        <div class="user-popover-head">
          <span class="user-popover-avatar">
            <svg class="cockpit-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </span>
          <div class="user-popover-meta">
            <div class="user-popover-name">Modo Local</div>
            <div class="user-popover-email">Sesión local (Sin sincronizar)</div>
          </div>
        </div>
        <div class="user-popover-cloud">Guardado localmente en este dispositivo</div>
        <button type="button" class="btn btn-secondary btn-sm" style="width:100%; margin-top:8px;" onclick="if(typeof toggleUserProfilePopover === 'function') toggleUserProfilePopover(false); if(typeof openAuthModal === 'function') openAuthModal();">
          Iniciar sesión / Registrarse
        </button>
      `;
    }
  }
});
