/* common.js
   Shared helpers used across pages.
*/

/* Storage keys used by this prototype */
const STORAGE_KEYS = {
  totals: "cpa_totals",
  cart: "cpa_cart"
};

/* Default tax rate based on the wireframe values:
   $13 taxes when subtotal is $600.
*/
const TAX_RATE = 13 / 600;

/* Format a number as currency like $613 */
function formatCurrency(value) {
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return `$${rounded.toFixed(0)}`;
}

/* Parse "$600" -> 600 */
function parseCurrency(text) {
  if (!text) return 0;
  const cleaned = String(text).replace(/[^0-9.]/g, "");
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
}

/* Save JSON to localStorage */
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* Load JSON from localStorage */
function loadFromStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

/* Smooth scroll to top */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
