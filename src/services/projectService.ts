import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project } from '../types';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';

const COLLECTION_NAME = 'kareem_portfolio_projects';
const LOCAL_STORAGE_KEY = 'kareem_portfolio_projects_local';

// Helper to get local cache
export function getLocalCachedProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading local projects cache:', e);
  }
  return DEFAULT_PROJECTS;
}

// Helper to save local cache
export function setLocalCachedProjects(projects: Project[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error writing local projects cache:', e);
  }
}

/**
 * Loads all projects from Firestore (falling back to LocalStorage & DEFAULT_PROJECTS).
 */
export async function loadProjects(): Promise<{ projects: Project[]; source: 'firebase' | 'local' }> {
  if (db) {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const fetched: Project[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ ...docSnap.data(), id: docSnap.id } as Project);
        });
        
        // Sort: featured first, then newest
        fetched.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return (Number(b.year) || 0) - (Number(a.year) || 0);
        });

        setLocalCachedProjects(fetched);
        return { projects: fetched, source: 'firebase' };
      }
    } catch (error) {
      console.warn('[ProjectService] Failed to load from Firestore, using local cache:', error);
    }
  }

  // Fallback to local storage or defaults
  const cached = getLocalCachedProjects();
  return { projects: cached, source: 'local' };
}

/**
 * Adds a new project.
 */
export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  const newId = `proj-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const fullProject: Project = {
    ...project,
    id: newId
  };

  // 1. Save to Firebase if available
  if (db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, newId);
      await setDoc(docRef, fullProject);
    } catch (e) {
      console.error('[ProjectService] Failed to write to Firebase:', e);
    }
  }

  // 2. Always update local storage
  const current = getLocalCachedProjects();
  const updated = [fullProject, ...current];
  setLocalCachedProjects(updated);

  return fullProject;
}

/**
 * Updates an existing project.
 */
export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  if (db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (e) {
      console.error('[ProjectService] Failed to update in Firebase:', e);
    }
  }

  const current = getLocalCachedProjects();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
  setLocalCachedProjects(updated);
}

/**
 * Deletes a project by ID.
 */
export async function deleteProject(id: string): Promise<void> {
  if (db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error('[ProjectService] Failed to delete from Firebase:', e);
    }
  }

  const current = getLocalCachedProjects();
  const updated = current.filter((p) => p.id !== id);
  setLocalCachedProjects(updated);
}

/**
 * Seeds all default projects into Firestore and LocalStorage.
 */
export async function seedAllDefaults(): Promise<number> {
  if (db) {
    try {
      for (const p of DEFAULT_PROJECTS) {
        const docRef = doc(db, COLLECTION_NAME, p.id);
        await setDoc(docRef, p);
      }
    } catch (e) {
      console.error('[ProjectService] Error seeding to Firebase:', e);
    }
  }

  setLocalCachedProjects(DEFAULT_PROJECTS);
  return DEFAULT_PROJECTS.length;
}
