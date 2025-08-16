import { useState, useEffect } from "react";
import BaseDialog from './shared/BaseDialog';
import FormField from './shared/FormField';
import { initialBusinessTypeForm } from "./utils/constants";

const BusinessTypeDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  editingBusinessType, 
  loading,
  businessTypes = []
}) => {
  const [businessTypeForm, setBusinessTypeForm] = useState(initialBusinessTypeForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingBusinessType) {
      setBusinessTypeForm({ name: editingBusinessType.name });
    } else {
      setBusinessTypeForm(initialBusinessTypeForm);
    }
    setError(''); // Clear error when dialog opens/closes
  }, [editingBusinessType, open]);

  const handleChange = (e) => {
    setBusinessTypeForm({ ...businessTypeForm, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const checkDuplicate = (name) => {
    const trimmedName = name.trim().toLowerCase();
    return businessTypes.some(bt => 
      bt.name.toLowerCase() === trimmedName && 
      (!editingBusinessType || bt.id !== editingBusinessType.id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedName = businessTypeForm.name.trim();
    
    // Client-side validation
    if (!trimmedName) {
      setError('Business type name is required');
      return;
    }
    
    if (checkDuplicate(trimmedName)) {
      setError('A business type with this name already exists');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await onSubmit({ ...businessTypeForm, name: trimmedName });
      
      if (result && result.success) {
        // Success - close dialog and reset form
        setBusinessTypeForm(initialBusinessTypeForm);
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
    setBusinessTypeForm(initialBusinessTypeForm);
    setError('');
    onClose();
  };

  // Improved validation - button disabled if no text entered or there's an error
  const isValid = businessTypeForm.name.trim().length > 0 && !error;

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={editingBusinessType ? 'Edit Business Type' : 'Add Business Type'}
      submitText={editingBusinessType ? 'Update' : 'Add'}
      loading={loading || isSubmitting}
      error={error}
      isValid={isValid}
      maxWidth="xs"
    >
      <FormField
        label="Name"
        name="name"
        value={businessTypeForm.name}
        onChange={handleChange}
        required
        error={!!error}
        helperText={error ? '' : 'Enter a unique business type name (e.g., E-commerce, HR, Clinic)'}
      />
    </BaseDialog>
  );
};

export default BusinessTypeDialog;