import { useState, useEffect } from "react";
import BaseDialog from './shared/BaseDialog';
import FormField from './shared/FormField';

const initialTechnologyForm = { name: "" };

const TechnologyDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  editingTechnology, 
  loading,
  technologies = []
}) => {
  const [technologyForm, setTechnologyForm] = useState(initialTechnologyForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTechnology) {
      setTechnologyForm({ name: editingTechnology.name });
    } else {
      setTechnologyForm(initialTechnologyForm);
    }
    setError(''); // Clear error when dialog opens/closes
  }, [editingTechnology, open]);

  const handleChange = (e) => {
    setTechnologyForm({ ...technologyForm, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const checkDuplicate = (name) => {
    const trimmedName = name.trim().toLowerCase();
    return technologies.some(tech => 
      tech.name.toLowerCase() === trimmedName && 
      (!editingTechnology || tech.id !== editingTechnology.id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedName = technologyForm.name.trim();
    
    // Client-side validation
    if (!trimmedName) {
      setError('Technology name is required');
      return;
    }
    
    if (checkDuplicate(trimmedName)) {
      setError('A technology with this name already exists');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await onSubmit({ ...technologyForm, name: trimmedName });
      
      if (result && result.success) {
        // Success - close dialog and reset form
        setTechnologyForm(initialTechnologyForm);
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
    setTechnologyForm(initialTechnologyForm);
    setError('');
    onClose();
  };

  // Improved validation - button disabled if no text entered or there's an error
  const isValid = technologyForm.name.trim().length > 0 && !error;

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={editingTechnology ? 'Edit Technology' : 'Add Technology'}
      submitText={editingTechnology ? 'Update' : 'Add'}
      loading={loading || isSubmitting}
      error={error}
      isValid={isValid}
      maxWidth="xs"
    >
      <FormField
        label="Name"
        name="name"
        value={technologyForm.name}
        onChange={handleChange}
        required
        error={!!error}
        helperText={error ? '' : 'Enter a unique technology name'}
      />
    </BaseDialog>
  );
};

export default TechnologyDialog;