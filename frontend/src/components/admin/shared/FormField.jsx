import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  OutlinedInput,
  Chip,
  Box,
  useTheme
} from '@mui/material';

const FormField = ({ 
  type = 'text',
  label,
  name,
  value,
  onChange,
  required = false,
  fullWidth = true,
  margin = 'normal',
  error = false,
  helperText = '',
  options = [], // For select fields
  multiple = false, // For multi-select
  renderValue, // Custom render for multi-select
  children, // For custom content in select
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      background: isDark 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s ease',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'rgba(0, 0, 0, 0.23)',
      },
      '&:hover': {
        background: isDark 
          ? 'rgba(255, 255, 255, 0.08)' 
          : 'rgba(255, 255, 255, 0.9)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: isDark 
            ? 'rgba(102, 126, 234, 0.7)' 
            : 'rgba(102, 126, 234, 0.5)',
        },
      },
      '&.Mui-focused': {
        background: isDark 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 1)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#667eea',
          borderWidth: '2px',
        },
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#f44336',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontWeight: 500,
      color: isDark 
        ? 'rgba(255, 255, 255, 0.7)' 
        : 'rgba(0, 0, 0, 0.6)',
      '&.Mui-focused': {
        color: '#667eea',
      },
      '&.Mui-error': {
        color: '#f44336',
      },
    },
    '& .MuiInputBase-input': {
      color: isDark 
        ? 'rgba(255, 255, 255, 0.87)' 
        : 'rgba(0, 0, 0, 0.87)',
    },
    '& .MuiFormHelperText-root': {
      color: isDark 
        ? 'rgba(255, 255, 255, 0.6)' 
        : 'rgba(0, 0, 0, 0.6)',
      '&.Mui-error': {
        color: '#f44336',
      },
    },
  };

  const selectStyles = {
    ...baseStyles,
    '& .MuiSelect-select': {
      color: isDark 
        ? 'rgba(255, 255, 255, 0.87)' 
        : 'rgba(0, 0, 0, 0.87)',
    },
    '& .MuiSelect-icon': {
      color: isDark 
        ? 'rgba(255, 255, 255, 0.7)' 
        : 'rgba(0, 0, 0, 0.54)',
    },
  };

  if (type === 'select') {
    return (
      <FormControl 
        fullWidth={fullWidth} 
        margin={margin} 
        error={error}
        sx={selectStyles}
      >
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          required={required}
          multiple={multiple}
          input={multiple ? <OutlinedInput label={label} /> : undefined}
          renderValue={renderValue}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: isDark 
                  ? 'rgba(30, 30, 30, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.1)' 
                  : '1px solid rgba(0, 0, 0, 0.1)',
                '& .MuiMenuItem-root': {
                  color: isDark 
                    ? 'rgba(255, 255, 255, 0.87)' 
                    : 'rgba(0, 0, 0, 0.87)',
                  '&:hover': {
                    backgroundColor: isDark 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: isDark 
                      ? 'rgba(102, 126, 234, 0.2)' 
                      : 'rgba(102, 126, 234, 0.1)',
                    '&:hover': {
                      backgroundColor: isDark 
                        ? 'rgba(102, 126, 234, 0.3)' 
                        : 'rgba(102, 126, 234, 0.15)',
                    },
                  },
                },
              },
            },
          }}
          {...props}
        >
          {children || options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <TextField
      margin={margin}
      fullWidth={fullWidth}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      helperText={helperText}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      sx={baseStyles}
      {...props}
    />
  );
};

export default FormField;