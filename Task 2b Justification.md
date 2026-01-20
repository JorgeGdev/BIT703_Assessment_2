# Task 2b: JavaScript Validation Justification (Extended)

This ecommerce prototype uses a layered validation approach. HTML5 validation provides the first layer for simple constraints such as required fields, input types, and basic ranges. JavaScript provides the second layer by enforcing business rules, keeping values consistent across pages, and giving immediate user feedback. The interface uses Tailwind CSS for consistent spacing and component styling. Swiper.js (v11) is loaded via CDN and initialised in home.js to power the Featured Products carousel with a 3D coverflow effect. AOS (v2.3.1) is loaded via CDN and initialised in home.js to animate sections on scroll via data-aos attributes.

The project implements four functional elements that also support validation and data integrity across the ecommerce flow:

1. Featured Products carousel (Home): Swiper.js manages slide state, navigation, and responsive behaviour. This ensures users can browse featured items without losing context, and it reduces the chance of layout breakage that can hide key content.

2. Floating anchor navigation (Home): A floating anchor becomes visible after the user scrolls and provides smooth scrolling back to the top and to key sections. JavaScript controls when it appears and guarantees predictable navigation on a long page.

3. Cart totals recalculation and persistence (Cart, Shipping, Payment): JavaScript recalculates subtotal, tax, shipping, and total when the user changes quantities. The updated totals are written to the summary panel immediately and persisted using localStorage, so the shipping and payment pages display consistent values after navigation. This prevents mismatched totals and supports a realistic checkout experience.

4. Automatic shipping offer rule (Shipping Details): JavaScript applies the required rule that free shipping is enforced when the order total exceeds $600. When the threshold is met, the free option is automatically selected and other delivery choices are disabled or ignored, and the summary totals update instantly. When the threshold is not met, delivery options remain selectable and totals update based on the selected option.

HTML5 validation alone is not sufficient for this prototype because it cannot validate cross field rules, perform calculations, update multiple UI elements from a single user action, or persist state between pages. JavaScript bridges these gaps by enforcing business logic, preventing invalid states, and providing immediate feedback. This approach improves usability and reliability while meeting the wireframe requirements and the assessment functional criteria.
