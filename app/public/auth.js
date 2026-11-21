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
// SINCRONIZACIÓN SEGURA EN LA NUBE (FIRESTORE READ-MERGE-WRITE)
// =======================================================

let cloudHydratedUid = null;

function safeParseLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function isLegacyDemoVeh(v) {
  if (typeof window.isLegacyDemoVehicle === "function") return window.isLegacyDemoVehicle(v);
  if (!v || typeof v !== "object") return false;
  if (v.userConfigured === true) return false;
  if (v.model && String(v.model).includes("Corolla") && Number(v.odo) === 148500) return true;
  if (v.id === "gwm-haval-jolion-classic-6mt" && v.plate === "EN-RODAJE" && v.nickname === "Jolion Turbo" && Number(v.odo) === 100) return true;
  return false;
}

function isValidUserVehicle(v) {
  return Boolean(v && typeof v === "object" && (v.maker || v.model) && !isLegacyDemoVeh(v));
}

function updateCloudStatusUI(text, isError = false) {
  const el = document.getElementById("cloudSyncStatusText");
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? "var(--amber)" : "";
}

function sortRecordsByDateDesc(arr) {
  return arr.slice().sort((a, b) => {
    const ta = new Date(a && a.date ? a.date : 0).getTime() || 0;
    const tb = new Date(b && b.date ? b.date : 0).getTime() || 0;
    return tb - ta;
  });
}

function mergeUniqueArrays(localArr, cloudArr) {
  const map = new Map();
  const safeCloud = Array.isArray(cloudArr) ? cloudArr : [];
  const safeLocal = Array.isArray(localArr) ? localArr : [];
  [...safeCloud, ...safeLocal].forEach(item => {
    if (!item) return;
    const sig = typeof item === "object"
      ? (item.id
          ? String(item.id) + "|" + (item.date || "") + "|" + (item.costUsd ?? item.cost ?? item.usd ?? "")
          : (item.hash
              ? String(item.hash)
              : `${item.date || ""}|${item.liters ?? ""}|${item.usd ?? ""}|${item.km ?? ""}|${item.type || ""}`))
      : String(item);
    map.set(sig, item);
  });
  return Array.from(map.values());
}

function mergeOdometerChains(localChain, cloudChain) {
  const safeCloud = Array.isArray(cloudChain) ? cloudChain : [];
  const safeLocal = Array.isArray(localChain) ? localChain : [];
  if (safeCloud.length === 0) return safeLocal;
  if (safeLocal.length === 0) return safeCloud;
  return safeCloud.length >= safeLocal.length ? safeCloud : safeLocal;
}

function resolveBestActiveVehicle(localVeh, cloudVeh) {
  const validLocal = isValidUserVehicle(localVeh) ? { ...localVeh, userConfigured: true } : null;
  const validCloud = isValidUserVehicle(cloudVeh) ? { ...cloudVeh, userConfigured: true } : null;
  if (!validLocal && !validCloud) return null;
  if (!validLocal) return validCloud;
  if (!validCloud) return validLocal;
  // Si ambos son válidos, preferimos local si ya sincronizamos o tiene mayor odómetro; si es el mismo vehículo y nube tiene mayor odómetro, conservamos el mayor
  if (validLocal.id === validCloud.id && Number(validCloud.odo || 0) > Number(validLocal.odo || 0)) {
    return { ...validLocal, odo: Number(validCloud.odo) };
  }
  return validLocal;
}

function refreshUiAfterCloudSync() {
  if (typeof window.refreshAllGarageUI === "function") {
    window.refreshAllGarageUI();
    return;
  }
  if (typeof renderGarageVehicleHeader === "function") renderGarageVehicleHeader();
  if (typeof renderPreventiveMatrix === "function") renderPreventiveMatrix();
  if (typeof renderFuelHistory === "function") renderFuelHistory();
  if (typeof renderGarageAnalytics === "function") renderGarageAnalytics();
  if (typeof renderSavedComparisons === "function") renderSavedComparisons();
}

window.syncUserDataToCloud = async (options = {}) => {
  const user = auth.currentUser;
  if (!user) return { ok: false, reason: "no-auth" };

  updateCloudStatusUI("Sincronizando con BajoKapot Cloud...");

  try {
    const userRef = doc(db, "users", user.uid);
    const existingSnap = await getDoc(userRef);
    const cloudData = existingSnap.exists() ? existingSnap.data() : {};

    const localFuel = safeParseLocal("charu_fuel_history", []);
    const localMaint = safeParseLocal("charu_maintenance_logs", []);
    const localComp = safeParseLocal("charu_saved_comparisons", []);
    const localVeh = safeParseLocal("charu_active_vehicle", null);
    const localChain = safeParseLocal("charu_odometer_chain", []);
    const localCustomRegime = safeParseLocal("charu_custom_regime_config", null);
    const rawRegime = localStorage.getItem("charu_maint_regime");
    const maintRegime = rawRegime === "personalizado" ? "personalizado" : "severo";

    const mergedFuel = options.allowEmptyFuel
      ? localFuel
      : sortRecordsByDateDesc(mergeUniqueArrays(localFuel, cloudData.fuelHistory));
    const mergedMaint = sortRecordsByDateDesc(mergeUniqueArrays(localMaint, cloudData.maintenanceLogs));
    const mergedComp = options.allowReplaceComparisons
      ? localComp
      : mergeUniqueArrays(localComp, cloudData.savedComparisons);
    const mergedChain = mergeOdometerChains(localChain, cloudData.odometerChain);

    const bestVehicle = resolveBestActiveVehicle(localVeh, cloudData.activeVehicle);

    // Reflejar cualquier registro fusionado desde la nube en localStorage para no perder nada
    if (!options.allowEmptyFuel && mergedFuel.length > localFuel.length) {
      localStorage.setItem("charu_fuel_history", JSON.stringify(mergedFuel));
    }
    if (mergedMaint.length > localMaint.length) {
      localStorage.setItem("charu_maintenance_logs", JSON.stringify(mergedMaint));
    }
    if (!options.allowReplaceComparisons && mergedComp.length > localComp.length) {
      localStorage.setItem("charu_saved_comparisons", JSON.stringify(mergedComp));
    }
    if (mergedChain.length > localChain.length) {
      localStorage.setItem("charu_odometer_chain", JSON.stringify(mergedChain));
    }
    if (bestVehicle && !isValidUserVehicle(localVeh)) {
      localStorage.setItem("charu_active_vehicle", JSON.stringify(bestVehicle));
    }

    const dataToSync = {
      fuelHistory: mergedFuel,
      maintenanceLogs: mergedMaint,
      maintRegime,
      savedComparisons: mergedComp,
      odometerChain: mergedChain,
      lastSync: new Date().toISOString()
    };
    if (bestVehicle) {
      dataToSync.activeVehicle = bestVehicle;
    }
    if (localCustomRegime) {
      dataToSync.customRegimeConfig = localCustomRegime;
    } else if (cloudData.customRegimeConfig) {
      dataToSync.customRegimeConfig = cloudData.customRegimeConfig;
    }

    await setDoc(userRef, dataToSync, { merge: true });
    cloudHydratedUid = user.uid;

    const hhmm = new Date().toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" });
    updateCloudStatusUI(`Nube OK (${hhmm}) · ${mergedFuel.length} tanq. · ${mergedMaint.length} serv.`);
    console.log("☁️ Respaldado de forma segura en BajoKapot Cloud.");
    return { ok: true, fuelCount: mergedFuel.length, maintCount: mergedMaint.length, hasVehicle: Boolean(bestVehicle) };
  } catch (e) {
    console.error("Error sincronizando a la nube:", e);
    updateCloudStatusUI(`Error al respaldar (${e.code || "sin red"})`, true);
    return { ok: false, error: e };
  }
};

window.downloadUserDataFromCloud = async (user, { showSummaryAlert = false } = {}) => {
  if (!user) return { ok: false, reason: "no-auth" };
  updateCloudStatusUI("Consultando respaldo en la nube...");

  try {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      const data = docSnap.data();

      // 1. Fusionar historial de tanqueos
      const localFuel = safeParseLocal("charu_fuel_history", []);
      const cloudFuel = Array.isArray(data.fuelHistory) ? data.fuelHistory : [];
      const mergedFuel = sortRecordsByDateDesc(mergeUniqueArrays(localFuel, cloudFuel));
      if (mergedFuel.length > 0) {
        localStorage.setItem("charu_fuel_history", JSON.stringify(mergedFuel));
      }

      // 2. Fusionar historial de mantenimientos
      const localMaint = safeParseLocal("charu_maintenance_logs", []);
      const cloudMaint = Array.isArray(data.maintenanceLogs) ? data.maintenanceLogs : [];
      const mergedMaint = sortRecordsByDateDesc(mergeUniqueArrays(localMaint, cloudMaint));
      if (mergedMaint.length > 0) {
        localStorage.setItem("charu_maintenance_logs", JSON.stringify(mergedMaint));
      }

      // 3. Restaurar régimen y configuración personalizada
      if (data.customRegimeConfig && typeof data.customRegimeConfig === "object") {
        localStorage.setItem("charu_custom_regime_config", JSON.stringify(data.customRegimeConfig));
      }
      if (data.maintRegime) {
        const normRegime = data.maintRegime === "personalizado" ? "personalizado" : "severo";
        localStorage.setItem("charu_maint_regime", normRegime);
      }

      // 4. Fusionar comparativas guardadas
      const localComp = safeParseLocal("charu_saved_comparisons", []);
      const cloudComp = Array.isArray(data.savedComparisons) ? data.savedComparisons : [];
      const mergedComp = mergeUniqueArrays(localComp, cloudComp);
      if (mergedComp.length > 0) {
        localStorage.setItem("charu_saved_comparisons", JSON.stringify(mergedComp));
      }

      // 5. Fusionar cadena de odómetro
      const localChain = safeParseLocal("charu_odometer_chain", []);
      const cloudChain = Array.isArray(data.odometerChain) ? data.odometerChain : [];
      const mergedChain = mergeOdometerChains(localChain, cloudChain);
      if (mergedChain.length > 0) {
        localStorage.setItem("charu_odometer_chain", JSON.stringify(mergedChain));
      }

      // 6. Restaurar vehículo real (reemplazando vacío o cualquier demo heredado)
      const localVeh = safeParseLocal("charu_active_vehicle", null);
      const bestVeh = resolveBestActiveVehicle(localVeh, data.activeVehicle);
      if (bestVeh) {
        localStorage.setItem("charu_active_vehicle", JSON.stringify(bestVeh));
      }

      cloudHydratedUid = user.uid;
      refreshUiAfterCloudSync();

      const hhmm = new Date().toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" });
      updateCloudStatusUI(`Nube OK (${hhmm}) · ${mergedFuel.length} tanq. · ${mergedMaint.length} serv.`);
      console.log("⬇️ Historial restaurado y fusionado desde BajoKapot Cloud.");

      if (showSummaryAlert) {
        const vehText = bestVeh ? `${bestVeh.maker || ""} ${bestVeh.model || ""}`.trim() : "Sin vehículo aún";
        alert(`Sincronización completada con BajoKapot Cloud:\n\n• Vehículo: ${vehText}\n• Tanqueos recuperados: ${mergedFuel.length}\n• Mantenimientos recuperados: ${mergedMaint.length}`);
      }
      return { ok: true, fuelCount: mergedFuel.length, maintCount: mergedMaint.length, hasVehicle: Boolean(bestVeh) };
    } else {
      cloudHydratedUid = user.uid;
      updateCloudStatusUI("Conectado · Sin respaldo previo en nube");
      if (showSummaryAlert) {
        alert("Tu cuenta está conectada, pero aún no existe un respaldo guardado en BajoKapot Cloud. Registra tu vehículo para empezar a respaldar.");
      }
      return { ok: true, empty: true };
    }
  } catch (e) {
    console.error("Error descargando de la nube:", e);
    updateCloudStatusUI(`Error al leer nube (${e.code || "sin red"})`, true);
    if (showSummaryAlert) {
      alert(`No se pudo consultar BajoKapot Cloud (${e.code || e.message}). Verifica tu conexión a internet.`);
    }
    return { ok: false, error: e };
  }
};

window.manualCloudSync = async () => {
  const user = auth.currentUser;
  if (!user) {
    if (typeof toggleUserProfilePopover === "function") toggleUserProfilePopover(false);
    if (typeof openAuthModal === "function") openAuthModal();
    return;
  }
  const res = await window.downloadUserDataFromCloud(user, { showSummaryAlert: true });
  if (res && res.ok) {
    const localVeh = safeParseLocal("charu_active_vehicle", null);
    const localFuel = safeParseLocal("charu_fuel_history", []);
    const localMaint = safeParseLocal("charu_maintenance_logs", []);
    if (isValidUserVehicle(localVeh) || localFuel.length > 0 || localMaint.length > 0) {
      await window.syncUserDataToCloud();
    }
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
          <span id="cloudSyncStatusText">Conectando con BajoKapot Cloud...</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" style="width:100%; margin-top:8px;" onclick="if(typeof window.manualCloudSync === 'function') window.manualCloudSync();">
          Sincronizar ahora
        </button>
        <button type="button" class="btn btn-secondary btn-sm" style="width:100%; margin-top:6px;" onclick="if(typeof toggleUserProfilePopover === 'function') toggleUserProfilePopover(false); logoutUser();">
          Cerrar sesión
        </button>
      `;
    }

    // ☁️ Descargar e hidratar UI al iniciar sesión
    window.downloadUserDataFromCloud(user);
  } else {
    cloudHydratedUid = null;
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
