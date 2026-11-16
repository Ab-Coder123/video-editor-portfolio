import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { 
  loadProjects, 
  addProject, 
  updateProject, 
  deleteProject, 
  seedAllDefaults,
  getLocalCachedProjects 
} from '../services/projectService';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => getLocalCachedProjects());
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<'firebase' | 'local'>('local');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await loadProjects();
      setProjects(res.projects);
      setSource(res.source);
    } catch (e) {
      console.error('Error refreshing projects:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = async (projectData: Omit<Project, 'id'>) => {
    const created = await addProject(projectData);
    setProjects(prev => [created, ...prev]);
    return created;
  };

  const handleUpdate = async (id: string, updates: Partial<Project>) => {
    await updateProject(id, updates);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      await seedAllDefaults();
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    source,
    refresh,
    addProject: handleAdd,
    updateProject: handleUpdate,
    deleteProject: handleDelete,
    seedDefaults: handleSeed,
  };
}
