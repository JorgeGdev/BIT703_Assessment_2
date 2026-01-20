/* validation.js
   Form Validation Module for Aotearoa Adventure Gear
   
   This module provides comprehensive client-side validation including:
   - HTML5 validation enhancement
   - Custom validation for emails, postal codes, phone numbers
   - Credit card validation (number, expiry, CVV)
   - Real-time validation feedback
   - Accessible error messages
   
   Task 3: Implement forms with data validation and error handling
*/

/* ==========================================
   VALIDATION PATTERNS & CONSTANTS
   ========================================== */

const ValidationPatterns = {
  // Email pattern (RFC 5322 simplified)
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Postal codes by country
  postalCodes: {
    NZ: /^\d{4}$/,                           // New Zealand: 4 digits (e.g., 1010, 6011)
    AU: /^\d{4}$/,                           // Australia: 4 digits
    US: /^\d{5}(-\d{4})?$/                   // USA: 5 digits or ZIP+4
  },
  
  // Phone patterns by country
  phonePatterns: {
    NZ: /^(\+?64|0)[2-9]\d{7,9}$/,           // NZ phone: +64 or 0 followed by digits
    AU: /^(\+?61|0)[2-9]\d{8}$/,             // AU phone
    US: /^(\+?1)?[2-9]\d{2}[2-9]\d{6}$/      // US phone
  },
  
  // Generic phone (fallback)
  phone: /^[\d\s\-\+\(\)]{8,20}$/,
  
  // Name pattern (letters, spaces, hyphens, apostrophes)
  name: /^[A-Za-zÀ-ÿ\s\-']{2,50}$/,
  
  // Credit card number (13-19 digits, spaces allowed)
  cardNumber: /^[\d\s]{13,23}$/,
  
  // Card expiry (MM/YY or MM / YY)
  cardExpiry: /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/,
  
  // CVV (3-4 digits)
  cvv: /^\d{3,4}$/,
  
  // Non-negative currency (positive number with up to 2 decimals)
  currency: /^\d+(\.\d{0,2})?$/,
  
  // Product quantity (positive integer)
  quantity: /^[1-9]\d*$/
};

/* ==========================================
   ERROR MESSAGES
   ========================================== */

const ErrorMessages = {
  required: 'This field is required',
  firstName: 'Please enter a valid first name (2-50 letters)',
  lastName: 'Please enter a valid last name (2-50 letters)',
  email: 'Please enter a valid email address (e.g., name@example.com)',
  phone: {
    NZ: 'Please enter a valid NZ phone number (e.g., 021 123 4567 or +64 21 123 4567)',
    AU: 'Please enter a valid AU phone number',
    US: 'Please enter a valid US phone number',
    default: 'Please enter a valid phone number'
  },
  postalCode: {
    NZ: 'Please enter a valid NZ postal code (4 digits, e.g., 1010)',
    AU: 'Please enter a valid AU postal code (4 digits)',
    US: 'Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)',
    default: 'Please enter a valid postal code'
  },
  address: 'Please enter a valid address (minimum 5 characters)',
  city: 'Please enter a valid city name',
  country: 'Please select a country',
  cardNumber: 'Please enter a valid card number (13-19 digits)',
  cardExpiry: 'Please enter a valid expiry date (MM/YY)',
  cardExpiryPast: 'Card has expired. Please use a valid card',
  cvv: 'Please enter a valid CVV (3-4 digits on back of card)',
  cardHolder: 'Please enter the cardholder name as shown on card',
  currency: 'Please enter a valid positive amount',
  quantity: 'Please enter a valid quantity (1 or more)',
  quantityMax: 'Maximum quantity is 99'
};

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

/**
 * Remove all non-digit characters from a string
 */
function stripNonDigits(value) {
  return String(value).replace(/\D/g, '');
}

/**
 * Format credit card number with spaces every 4 digits
 */
function formatCardNumber(value) {
  const digits = stripNonDigits(value);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digits;
}

/**
 * Format expiry date as MM / YY
 */
function formatExpiry(value) {
  const digits = stripNonDigits(value);
  if (digits.length >= 2) {
    return digits.slice(0, 2) + ' / ' + digits.slice(2, 4);
  }
  return digits;
}

/**
 * Format phone number for display
 */
function formatPhoneNZ(value) {
  const digits = stripNonDigits(value);
  if (digits.startsWith('64')) {
    // International format
    return '+' + digits.slice(0, 2) + ' ' + digits.slice(2, 4) + ' ' + digits.slice(4, 7) + ' ' + digits.slice(7);
  } else if (digits.startsWith('0')) {
    // Local format
    return digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
  }
  return value;
}

/* ==========================================
   VALIDATION FUNCTIONS
   ========================================== */

/**
 * Validate email address
 */
function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  const isValid = ValidationPatterns.email.test(email.trim());
  return {
    valid: isValid,
    message: isValid ? '' : ErrorMessages.email
  };
}

/**
 * Validate name (first name, last name, cardholder name)
 */
function validateName(name, fieldType = 'firstName') {
  if (!name || name.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  const isValid = ValidationPatterns.name.test(name.trim());
  return {
    valid: isValid,
    message: isValid ? '' : ErrorMessages[fieldType] || ErrorMessages.firstName
  };
}

/**
 * Validate phone number based on country
 */
function validatePhone(phone, country = 'NZ') {
  if (!phone || phone.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const pattern = ValidationPatterns.phonePatterns[country] || ValidationPatterns.phone;
  const isValid = pattern.test(cleanPhone);
  
  return {
    valid: isValid,
    message: isValid ? '' : (ErrorMessages.phone[country] || ErrorMessages.phone.default)
  };
}

/**
 * Validate postal code based on country
 */
function validatePostalCode(postalCode, country = 'NZ') {
  if (!postalCode || postalCode.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  
  const cleanCode = postalCode.trim().toUpperCase();
  const pattern = ValidationPatterns.postalCodes[country];
  
  if (!pattern) {
    // For unsupported countries, just check it's not empty
    return { valid: true, message: '' };
  }
  
  const isValid = pattern.test(cleanCode);
  return {
    valid: isValid,
    message: isValid ? '' : (ErrorMessages.postalCode[country] || ErrorMessages.postalCode.default)
  };
}

/**
 * Validate address
 */
function validateAddress(address) {
  if (!address || address.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  const isValid = address.trim().length >= 5;
  return {
    valid: isValid,
    message: isValid ? '' : ErrorMessages.address
  };
}

/**
 * Validate city
 */
function validateCity(city) {
  if (!city || city.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  const isValid = ValidationPatterns.name.test(city.trim());
  return {
    valid: isValid,
    message: isValid ? '' : ErrorMessages.city
  };
}

/**
 * Validate credit card number using Luhn algorithm
 */
function validateCardNumber(cardNumber) {
  if (!cardNumber || cardNumber.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  
  const digits = stripNonDigits(cardNumber);
  
  // Check length (13-19 digits for major cards)
  if (digits.length < 13 || digits.length > 19) {
    return { valid: false, message: ErrorMessages.cardNumber };
  }
  
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  const isValid = sum % 10 === 0;
  return {
    valid: isValid,
    message: isValid ? '' : ErrorMessages.cardNumber
  };
}

/**
 * Detect card type from number
 */
function detectCardType(cardNumber) {
  const digits = stripNonDigits(cardNumber);
  
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6(?:011|5)/.test(digits)) return 'discover';
  
  return 'unknown';
}

/**
 * Validate card expiry date
 */
function validateCardExpiry(expiry) {
  if (!expiry || expiry.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  
  // Check format
  if (!ValidationPatterns.cardExpiry.test(expiry)) {
    return { valid: false, message: ErrorMessages.cardExpiry };
  }
  
  // Parse month and year
  const parts = expiry.replace(/\s/g, '').split('/');
  const month = parseInt(parts[0], 10);
  const year = parseInt('20' + parts[1], 10);
  
  // Check if date is in the future
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { valid: false, message: ErrorMessages.cardExpiryPast };
  }
  
  // Check reasonable future limit (10 years)
  if (year > currentYear + 10) {
    return { valid: false, message: ErrorMessages.cardExpiry };
  }
  
  return { valid: true, message: '' };
}

/**
 * Validate CVV
 */
function validateCVV(cvv, cardType = 'visa') {
  if (!cvv || cvv.trim() === '') {
    return { valid: false, message: ErrorMessages.required };
  }
  
  const digits = stripNonDigits(cvv);
  
  // Amex has 4 digit CVV, others have 3
  const expectedLength = cardType === 'amex' ? 4 : 3;
  const isValid = digits.length >= 3 && digits.length <= 4 && /^\d+$/.test(digits);
  
  return {
    valid: isValid,
    message: isValid ? '' : ErrorMessages.cvv
  };
}

/**
 * Validate non-negative currency amount
 */
function validateCurrency(amount) {
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, message: ErrorMessages.required };
  }
  
  const value = parseFloat(amount);
  
  if (isNaN(value) || value < 0) {
    return { valid: false, message: ErrorMessages.currency };
  }
  
  return { valid: true, message: '' };
}

/**
 * Validate product quantity
 */
function validateQuantity(quantity) {
  if (quantity === '' || quantity === null || quantity === undefined) {
    return { valid: false, message: ErrorMessages.required };
  }
  
  const value = parseInt(quantity, 10);
  
  if (isNaN(value) || value < 1) {
    return { valid: false, message: ErrorMessages.quantity };
  }
  
  if (value > 99) {
    return { valid: false, message: ErrorMessages.quantityMax };
  }
  
  return { valid: true, message: '' };
}

/* ==========================================
   DOM HELPERS FOR ERROR DISPLAY
   ========================================== */

/**
 * Show error message for a field
 */
function showFieldError(input, message) {
  const errorSpan = input.parentElement.querySelector('.error-message') || 
                    input.closest('div').querySelector('.error-message');
  
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.classList.remove('hidden');
  }
  
  // Add error styling to input
  input.classList.add('border-red-500');
  input.classList.remove('border-brand-green-dark');
  input.setAttribute('aria-invalid', 'true');
  
  // Set ARIA description for accessibility
  if (errorSpan && errorSpan.id) {
    input.setAttribute('aria-describedby', errorSpan.id);
  }
}

/**
 * Clear error message for a field
 */
function clearFieldError(input) {
  const errorSpan = input.parentElement.querySelector('.error-message') || 
                    input.closest('div').querySelector('.error-message');
  
  if (errorSpan) {
    errorSpan.textContent = '';
    errorSpan.classList.add('hidden');
  }
  
  // Remove error styling
  input.classList.remove('border-red-500');
  input.classList.add('border-brand-green-dark');
  input.setAttribute('aria-invalid', 'false');
  input.removeAttribute('aria-describedby');
}

/**
 * Show success styling for a field
 */
function showFieldSuccess(input) {
  clearFieldError(input);
  input.classList.add('border-green-500');
}

/**
 * Clear all styling from a field
 */
function resetFieldStyling(input) {
  input.classList.remove('border-red-500', 'border-green-500');
  input.classList.add('border-brand-green-dark');
  input.setAttribute('aria-invalid', 'false');
}

/* ==========================================
   FORM VALIDATION HANDLERS
   ========================================== */

/**
 * Validate a single field based on its type/id
 */
function validateField(input, country = 'NZ') {
  const id = input.id;
  const value = input.value;
  let result = { valid: true, message: '' };
  
  switch (id) {
    case 'firstName':
      result = validateName(value, 'firstName');
      break;
    case 'lastName':
      result = validateName(value, 'lastName');
      break;
    case 'email':
      result = validateEmail(value);
      break;
    case 'phone':
      result = validatePhone(value, country);
      break;
    case 'postalCode':
      result = validatePostalCode(value, country);
      break;
    case 'address1':
      result = validateAddress(value);
      break;
    case 'city':
      result = validateCity(value);
      break;
    case 'country':
      if (!value || value === '') {
        result = { valid: false, message: ErrorMessages.country };
      }
      break;
    case 'cardNumber':
      result = validateCardNumber(value);
      break;
    case 'expiry':
      result = validateCardExpiry(value);
      break;
    case 'cvv':
      const cardType = detectCardType(document.getElementById('cardNumber')?.value || '');
      result = validateCVV(value, cardType);
      break;
    case 'cardHolder':
      result = validateName(value, 'cardHolder');
      break;
    default:
      // For required fields without specific validation
      if (input.hasAttribute('required') && (!value || value.trim() === '')) {
        result = { valid: false, message: ErrorMessages.required };
      }
  }
  
  return result;
}

/**
 * Real-time validation on input/blur
 */
function setupRealTimeValidation(form, options = {}) {
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, select, textarea');
  const getCountry = options.getCountry || (() => 'NZ');
  
  inputs.forEach(input => {
    // Validate on blur (when user leaves field)
    input.addEventListener('blur', function() {
      const result = validateField(this, getCountry());
      
      if (!result.valid) {
        showFieldError(this, result.message);
      } else {
        clearFieldError(this);
      }
    });
    
    // Clear error on input (give user chance to fix)
    input.addEventListener('input', function() {
      // Only clear error, don't validate yet (less aggressive)
      const errorSpan = this.parentElement.querySelector('.error-message') || 
                        this.closest('div').querySelector('.error-message');
      if (errorSpan && !errorSpan.classList.contains('hidden')) {
        // User is typing, clear error but keep neutral styling
        resetFieldStyling(this);
        errorSpan.classList.add('hidden');
      }
    });
  });
}

/**
 * Validate entire form
 */
function validateForm(form, options = {}) {
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select');
  const getCountry = options.getCountry || (() => 'NZ');
  
  let isValid = true;
  let firstInvalidField = null;
  
  inputs.forEach(input => {
    // Skip disabled or hidden fields
    if (input.disabled || input.type === 'hidden') return;
    
    const result = validateField(input, getCountry());
    
    if (!result.valid) {
      showFieldError(input, result.message);
      isValid = false;
      
      if (!firstInvalidField) {
        firstInvalidField = input;
      }
    } else {
      clearFieldError(input);
    }
  });
  
  // Focus first invalid field for accessibility
  if (firstInvalidField) {
    firstInvalidField.focus();
  }
  
  return isValid;
}

/* ==========================================
   INPUT FORMATTERS (real-time formatting)
   ========================================== */

/**
 * Setup automatic formatting for card number input
 */
function setupCardNumberFormatting(input) {
  if (!input) return;
  
  input.addEventListener('input', function(e) {
    const cursorPos = this.selectionStart;
    const oldLength = this.value.length;
    
    // Format the number
    this.value = formatCardNumber(this.value);
    
    // Adjust cursor position
    const newLength = this.value.length;
    const posDiff = newLength - oldLength;
    this.setSelectionRange(cursorPos + posDiff, cursorPos + posDiff);
    
    // Update card type icon
    const cardType = detectCardType(this.value);
    const iconEl = document.getElementById('cardTypeIcon');
    if (iconEl) {
      const icons = {
        visa: 'VISA',
        mastercard: 'MC',
        amex: 'AMEX',
        discover: 'DISC',
        unknown: '▭'
      };
      iconEl.textContent = icons[cardType] || '▭';
    }
  });
}

/**
 * Setup automatic formatting for expiry input
 */
function setupExpiryFormatting(input) {
  if (!input) return;
  
  input.addEventListener('input', function(e) {
    const digits = stripNonDigits(this.value);
    
    if (digits.length >= 2) {
      this.value = digits.slice(0, 2) + ' / ' + digits.slice(2, 4);
    } else {
      this.value = digits;
    }
  });
  
  // Prevent invalid characters
  input.addEventListener('keypress', function(e) {
    if (!/[\d\/\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  });
}

/**
 * Setup CVV input to only allow digits
 */
function setupCVVInput(input) {
  if (!input) return;
  
  input.addEventListener('input', function() {
    this.value = stripNonDigits(this.value).slice(0, 4);
  });
}

/* ==========================================
   SHIPPING FORM VALIDATION
   ========================================== */

function initShippingFormValidation() {
  const form = document.getElementById('shippingForm');
  if (!form) return;
  
  const countrySelect = document.getElementById('country');
  
  // Get current country selection
  function getCountry() {
    return countrySelect?.value || 'NZ';
  }
  
  // Setup real-time validation
  setupRealTimeValidation(form, { getCountry });
  
  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isValid = validateForm(form, { getCountry });
    
    if (isValid) {
      // Save shipping data to storage
      const formData = new FormData(form);
      const shippingData = Object.fromEntries(formData.entries());
      saveToStorage('cpa_shipping', shippingData);
      
      // Navigate to payment page
      window.location.href = 'payment.html';
    }
  });
  
  // Re-validate postal code and phone when country changes
  if (countrySelect) {
    countrySelect.addEventListener('change', function() {
      const postalInput = document.getElementById('postalCode');
      const phoneInput = document.getElementById('phone');
      
      // Re-validate if fields have values
      if (postalInput && postalInput.value) {
        const result = validatePostalCode(postalInput.value, this.value);
        if (!result.valid) {
          showFieldError(postalInput, result.message);
        } else {
          clearFieldError(postalInput);
        }
      }
      
      if (phoneInput && phoneInput.value) {
        const result = validatePhone(phoneInput.value, this.value);
        if (!result.valid) {
          showFieldError(phoneInput, result.message);
        } else {
          clearFieldError(phoneInput);
        }
      }
    });
  }
}

/* ==========================================
   PAYMENT FORM VALIDATION
   ========================================== */

function initPaymentFormValidation() {
  const form = document.getElementById('paymentForm');
  if (!form) return;
  
  // Setup input formatters
  setupCardNumberFormatting(document.getElementById('cardNumber'));
  setupExpiryFormatting(document.getElementById('expiry'));
  setupCVVInput(document.getElementById('cvv'));
  
  // Setup real-time validation
  setupRealTimeValidation(form);
  
  // Handle payment method toggle
  const cardInputs = form.querySelector('article:first-of-type .grid');
  const paymentRadios = form.querySelectorAll('input[name="paymentMethod"]');
  
  paymentRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const isCard = this.value === 'card';
      
      // Toggle card inputs visibility/disabled state
      const cardFields = cardInputs?.querySelectorAll('input');
      cardFields?.forEach(field => {
        if (isCard) {
          field.disabled = false;
          field.closest('.grid')?.classList.remove('opacity-50');
        } else {
          field.disabled = true;
          field.closest('.grid')?.classList.add('opacity-50');
          clearFieldError(field);
        }
      });
    });
  });
  
  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const paymentMethod = form.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    // Only validate card fields if card payment selected
    if (paymentMethod === 'card') {
      const isValid = validateForm(form);
      
      if (isValid) {
        // Show success message (in real app, would process payment)
        showPaymentSuccess();
      }
    } else {
      // PayPal selected - redirect to PayPal (simulated)
      showPaymentSuccess();
    }
  });
}

/**
 * Show payment success message
 */
function showPaymentSuccess() {
  // Create success modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative bg-brand-green-dark border border-brand-green p-8 max-w-md mx-4 text-center">
      <div class="text-green-400 text-5xl mb-4">✓</div>
      <h2 class="text-2xl font-light tracking-widest text-white mb-4">Payment Successful!</h2>
      <p class="text-white opacity-80 mb-6">Thank you for your order. You will receive a confirmation email shortly.</p>
      <a href="index.html" class="inline-flex items-center justify-center bg-brand-blue px-8 py-3 text-xs font-medium tracking-widest text-white hover:bg-brand-blue-dark focus:outline-none">
        Continue Shopping
      </a>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Clear cart data
  localStorage.removeItem(STORAGE_KEYS.totals);
  localStorage.removeItem(STORAGE_KEYS.cart);
  localStorage.removeItem('cpa_shipping');
}

/* ==========================================
   NEWSLETTER FORM VALIDATION
   ========================================== */

function initNewsletterValidation() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  
  setupRealTimeValidation(form);
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const result = validateEmail(emailInput?.value);
    
    if (!result.valid) {
      showFieldError(emailInput, result.message);
      emailInput?.focus();
    } else {
      clearFieldError(emailInput);
      
      // Show success message
      const successMsg = document.createElement('p');
      successMsg.className = 'text-green-400 text-sm mt-2';
      successMsg.textContent = 'Thank you for subscribing!';
      
      // Remove any existing success message
      const existingSuccess = form.querySelector('.text-green-400');
      if (existingSuccess) existingSuccess.remove();
      
      form.appendChild(successMsg);
      
      // Clear form
      emailInput.value = '';
      
      // Remove success message after 3 seconds
      setTimeout(() => successMsg.remove(), 3000);
    }
  });
}

/* ==========================================
   INITIALIZATION
   ========================================== */

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize form validations based on current page
  initShippingFormValidation();
  initPaymentFormValidation();
  initNewsletterValidation();
});
