 export const userFormSchema = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
      errorMessage:
        "First name must be 2-50 characters and contain only letters",
    },
  },

  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Enter Last name",
    required: true,
    validation: {
      minLength: 1,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
      errorMessage:
        "Last name must be 2-50 characters and contain only letters",
    },
  },

   {
        name:'phoneNumber',
        type:'tel',
        label:'Phone Number',
        placeholder:'123-456-7890',
        required:true,
        validation:{
            // pattern: /^[\d\s\-\+\(\)]+$/,
            validate: validatePhoneNumber,
            errorMessage: 'Please enter a valid phone number'
        }
    },
    
   {
        name:'email',
        type:'email',
        label:'Email Address',
        placeholder:'example@gmail.com',
        required:true,
        validation:{
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Please enter a valid email address'
        }
    }
];


function validatePhoneNumber(value) {
    const digits = value.replace(/\D/g, ''); // remove everything except digits
    return digits.length >= 10; // must have at least 10 digits
}



export const validateField = (field, value) => {
  const stringValue = String(value || '');

  // Check required fields
  if (field.required && !stringValue.trim()) {
    return `${field.label} is required`;
  }

  // Skip validation if field is empty and not required
  if (!stringValue.trim() && !field.required) {
    return '';
  }


  // Apply validation rules if they exist
  if (field.validation) {
    const { minLength, maxLength, pattern, min, max, errorMessage, validate } = field.validation;


      if (validate && typeof validate === 'function') {
    const isValid = validate(stringValue);
    if (!isValid) {
        return errorMessage || `Invalid ${field.label}`;
    }
}

    // String length validation
    if (minLength && stringValue.length < minLength) {
      return errorMessage || `${field.label} must be at least ${minLength} characters`;
    }

    if (maxLength && stringValue.length > maxLength) {
      return errorMessage || `${field.label} must not exceed ${maxLength} characters`;
    }

    // Pattern validation (regex)
    if (pattern && !pattern.test(stringValue)) {
      return errorMessage || `Invalid format for ${field.label}`;
    }

    // Number range validation
    if (field.type === 'number') {
      const numValue = Number(value);
      
      if (min !== undefined && numValue < min) {
        return errorMessage || `${field.label} must be at least ${min}`;
      }

      if (max !== undefined && numValue > max) {
        return errorMessage || `${field.label} must not exceed ${max}`;
      }
    }
  }

  return '';
};