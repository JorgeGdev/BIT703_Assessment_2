/* payment.js
   Payment page functionality:
   - Credit card validation and formatting
   - Payment method switching
   - Form submission handling
   
   Note: Main validation logic is in validation.js
*/

(function initPayment() {
  const form = document.getElementById('paymentForm');
  if (!form) return;

  // Get payment method radios
  const cardRadio = document.querySelector('input[value="card"]');
  const paypalRadio = document.querySelector('input[value="paypal"]');
  
  // Get card input fields container
  const cardInputsContainer = form.querySelector('article:first-of-type');
  const cardInputFields = cardInputsContainer?.querySelectorAll('input[id="cardNumber"], input[id="expiry"], input[id="cvv"], input[id="cardHolder"]');

  /**
   * Toggle card fields enabled/disabled based on payment method
   */
  function toggleCardFields(enabled) {
    if (!cardInputFields) return;

    cardInputFields.forEach(field => {
      field.disabled = !enabled;
      
      // Update visual styling
      const wrapper = field.closest('.grid') || field.closest('div');
      if (wrapper) {
        if (enabled) {
          wrapper.style.opacity = '1';
        } else {
          wrapper.style.opacity = '0.5';
          // Clear any validation errors when disabling
          clearFieldError(field);
        }
      }
    });
  }

  /**
   * Handle payment method change
   */
  function handlePaymentMethodChange(e) {
    const isCard = e.target.value === 'card';
    toggleCardFields(isCard);
    
    // Update styling of payment option boxes
    const cardBox = cardRadio?.closest('article');
    const paypalBox = paypalRadio?.closest('article');
    
    if (isCard) {
      cardBox?.classList.add('border-brand-blue');
      cardBox?.classList.remove('border-brand-green-dark');
      paypalBox?.classList.remove('border-brand-blue');
      paypalBox?.classList.add('border-brand-green-dark');
    } else {
      paypalBox?.classList.add('border-brand-blue');
      paypalBox?.classList.remove('border-brand-green-dark');
      cardBox?.classList.remove('border-brand-blue');
      cardBox?.classList.add('border-brand-green-dark');
    }
  }

  // Attach payment method change handlers
  if (cardRadio) {
    cardRadio.addEventListener('change', handlePaymentMethodChange);
  }
  if (paypalRadio) {
    paypalRadio.addEventListener('change', handlePaymentMethodChange);
  }

  // Initial state: card selected, so ensure fields are enabled
  if (cardRadio?.checked) {
    toggleCardFields(true);
  }

})();
