import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
      console.log('Fetched categories:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load categories:', err);
      return { success: false, error: 'Failed to load categories' };
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first
      const existingCategory = categories.find(cat => 
        cat.name.toLowerCase().trim() === categoryData.name.toLowerCase().trim()
      );
      
      if (existingCategory) {
        return { success: false, error: 'A category with this name already exists' };
      }

      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save category");
      }
      
      await fetchCategories();
      return { success: true, message: 'Category added successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first (excluding current category)
      const existingCategory = categories.find(cat => 
        cat.name.toLowerCase().trim() === categoryData.name.toLowerCase().trim() && 
        cat.id !== id
      );
      
      if (existingCategory) {
        return { success: false, error: 'A category with this name already exists' };
      }

      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save category");
      }
      
      await fetchCategories();
      return { success: true, message: 'Category updated successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return { success: false };
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");
      await fetchCategories();
      return { success: true, message: 'Category deleted successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};