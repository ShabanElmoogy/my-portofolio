import { useState, useEffect } from "react";
import BaseDialog from './shared/BaseDialog';
import FormField from './shared/FormField';
import { initialCategoryForm } from "./utils/constants";

const CategoryDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  editingCategory, 
  loading,
  categories = []
}) => {
  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setCategoryForm({ name: editingCategory.name });
    } else {
      setCategoryForm(initialCategoryForm);
    }
    setError(''); // Clear error when dialog opens/closes
  }, [editingCategory, open]);

  const handleChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const checkDuplicate = (name) => {
    const trimmedName = name.trim().toLowerCase();
    return categories.some(cat => 
      cat.name.toLowerCase() === trimmedName && 
      (!editingCategory || cat.id !== editingCategory.id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedName = categoryForm.name.trim();
    
    // Client-side validation
    if (!trimmedName) {
      setError('Category name is required');
      return;
    }
    
    if (checkDuplicate(trimmedName)) {
      setError('A category with this name already exists');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await onSubmit({ ...categoryForm, name: trimmedName });
      
      if (result && result.success) {
        // Success - close dialog and reset form
        setCategoryForm(initialCategoryForm);
        setError('');
        onClose();
      } else if (result && result.error) {
        // Show backend error in dialog
        setError(result.error);
      }
    } catch (err) {
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCategoryForm(initialCategoryForm);
    setError('');
    onClose();
  };

  // Improved validation - button disabled if no text entered or there's an error
  const isValid = categoryForm.name.trim().length > 0 && !error;

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={editingCategory ? 'Edit Category' : 'Add Category'}
      submitText={editingCategory ? 'Update' : 'Add'}
      loading={loading || isSubmitting}
      error={error}
      isValid={isValid}
      maxWidth="xs"
    >
      <FormField
        label="Name"
        name="name"
        value={categoryForm.name}
        onChange={handleChange}
        required
        error={!!error}
        helperText={error ? '' : 'Enter a unique category name'}
      />
    </BaseDialog>
  );
};

export default CategoryDialog;