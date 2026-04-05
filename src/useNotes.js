import { useState, useEffect, useCallback, useRef } from "react";
import { isFirebaseConfigured, auth, db, googleProvider } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LOCAL_STORAGE_KEY = "series65-notes-v2";

// ─── NOTES HOOK ──────────────────────────────────────────────────────────────
// Provides notes with two storage backends:
//   1. Firebase (if configured) — syncs across devices via Google sign-in
//   2. localStorage (fallback)  — works offline, per-device only
//
// The hook returns: { notes, setNote, user, signIn, signOutUser, loading, mode }

export function useNotes() {
  const [notes, setNotes] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(isFirebaseConfigured ? "firebase" : "local");
  const saveTimeout = useRef(null);

  // ── Load from localStorage ──
  const loadLocal = useCallback(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Failed to load local notes:", e);
    }
    return {};
  }, []);

  const saveLocal = useCallback((data) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save local notes:", e);
    }
  }, []);

  // ── Load from Firestore ──
  const loadFirestore = useCallback(async (uid) => {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) return snap.data().notes || {};
    } catch (e) {
      console.warn("Failed to load Firestore notes:", e);
    }
    return {};
  }, []);

  const saveFirestore = useCallback(
    async (uid, data) => {
      try {
        await setDoc(
          doc(db, "users", uid),
          { notes: data, updatedAt: new Date().toISOString() },
          { merge: true }
        );
      } catch (e) {
        console.warn("Failed to save to Firestore:", e);
      }
    },
    []
  );

  // ── Auth listener (Firebase only) ──
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setNotes(loadLocal());
      setMode("local");
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const cloudNotes = await loadFirestore(firebaseUser.uid);
        // Merge: cloud wins, but keep any local-only keys
        const local = loadLocal();
        const merged = { ...local, ...cloudNotes };
        setNotes(merged);
        setMode("firebase");
        // Save merged back to both
        saveLocal(merged);
        saveFirestore(firebaseUser.uid, merged);
      } else {
        setUser(null);
        setNotes(loadLocal());
        // Keep mode as "firebase" so the sign-in button stays visible;
        // saves will fall back to localStorage only (user is null)
        setMode("firebase");
      }
      setLoading(false);
    });

    return () => unsub();
  }, [loadLocal, loadFirestore, saveLocal, saveFirestore]);

  // ── Set a single note with debounced save ──
  const setNote = useCallback(
    (key, value) => {
      setNotes((prev) => {
        const next = { ...prev, [key]: value };

        // Always save to localStorage immediately
        saveLocal(next);

        // Debounce Firestore writes
        if (isFirebaseConfigured && user) {
          if (saveTimeout.current) clearTimeout(saveTimeout.current);
          saveTimeout.current = setTimeout(() => {
            saveFirestore(user.uid, next);
          }, 1000);
        }

        return next;
      });
    },
    [user, saveLocal, saveFirestore]
  );

  // ── Sign in / out ──
  const signIn = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error("Sign-in failed:", e);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign-out failed:", e);
    }
  }, []);

  return { notes, setNote, user, signIn, signOutUser, loading, mode };
}
