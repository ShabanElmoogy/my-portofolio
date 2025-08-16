import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load projects:', err);
      return { success: false, error: 'Failed to load projects' };
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    setLoading(true);
    console.log("projects Data",projectData)
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...projectData, 
          businessTypeId: projectData.businessTypeId ? Number(projectData.businessTypeId) : null,
          categoryId: projectData.categoryId ? Number(projectData.categoryId) : null,
          featured: Boolean(projectData.featured)
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save project");
      }
      
      await fetchProjects();
      return { success: true, message: 'Project added' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...projectData, 
          businessTypeId: projectData.businessTypeId ? Number(projectData.businessTypeId) : null,
          categoryId: projectData.categoryId ? Number(projectData.categoryId) : null,
          featured: Boolean(projectData.featured)
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save project");
      }
      
      await fetchProjects();
      return { success: true, message: 'Project updated' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    // Removed window.confirm - confirmation is now handled in the UI component
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      await fetchProjects();
      return { success: true, message: 'Project deleted' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};