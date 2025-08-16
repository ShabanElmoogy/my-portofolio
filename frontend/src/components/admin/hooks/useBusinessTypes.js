import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

export const useBusinessTypes = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBusinessTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/business-types`);
      const data = await res.json();
      setBusinessTypes(data);
      console.log('Fetched business types:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load business types:', err);
      return { success: false, error: 'Failed to load business types' };
    } finally {
      setLoading(false);
    }
  };

  const createBusinessType = async (businessTypeData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first
      const existing = businessTypes.find(bt => 
        bt.name.toLowerCase().trim() === businessTypeData.name.toLowerCase().trim()
      );
      
      if (existing) {
        return { success: false, error: 'A business type with this name already exists' };
      }

      const res = await fetch(`${API_URL}/business-types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessTypeData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save business type");
      }
      
      await fetchBusinessTypes();
      return { success: true, message: 'Business type added successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessType = async (id, businessTypeData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first (excluding current)
      const existing = businessTypes.find(bt => 
        bt.name.toLowerCase().trim() === businessTypeData.name.toLowerCase().trim() && 
        bt.id !== id
      );
      
      if (existing) {
        return { success: false, error: 'A business type with this name already exists' };
      }

      const res = await fetch(`${API_URL}/business-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessTypeData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save business type");
      }
      
      await fetchBusinessTypes();
      return { success: true, message: 'Business type updated successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteBusinessType = async (id) => {
    if (!window.confirm("Delete this business type?")) return { success: false };
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/business-types/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete business type");
      await fetchBusinessTypes();
      return { success: true, message: 'Business type deleted successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessTypes();
  }, []);

  return {
    businessTypes,
    loading,
    fetchBusinessTypes,
    createBusinessType,
    updateBusinessType,
    deleteBusinessType
  };
};