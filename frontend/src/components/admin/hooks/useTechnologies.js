import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTechnologies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/technologies`);
      const data = await res.json();
      setTechnologies(data);
      console.log('Fetched technologies:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load technologies:', err);
      return { success: false, error: 'Failed to load technologies' };
    } finally {
      setLoading(false);
    }
  };

  const createTechnology = async (technologyData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first
      const existingTech = technologies.find(tech => 
        tech.name.toLowerCase().trim() === technologyData.name.toLowerCase().trim()
      );
      
      if (existingTech) {
        return { success: false, error: 'A technology with this name already exists' };
      }

      const res = await fetch(`${API_URL}/technologies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(technologyData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save technology");
      }
      
      await fetchTechnologies();
      return { success: true, message: 'Technology added successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTechnology = async (id, technologyData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first (excluding current technology)
      const existingTech = technologies.find(tech => 
        tech.name.toLowerCase().trim() === technologyData.name.toLowerCase().trim() && 
        tech.id !== id
      );
      
      if (existingTech) {
        return { success: false, error: 'A technology with this name already exists' };
      }

      const res = await fetch(`${API_URL}/technologies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(technologyData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save technology");
      }
      
      await fetchTechnologies();
      return { success: true, message: 'Technology updated successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTechnology = async (id) => {
    if (!window.confirm("Delete this technology?")) return { success: false };
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/technologies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete technology");
      await fetchTechnologies();
      return { success: true, message: 'Technology deleted successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    fetchTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
  };
};