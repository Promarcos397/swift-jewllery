# Implementation Plan - Phase 3

## 1. Data Refactoring
*   **Goal**: Eliminate duplicate product issues and prepare for modal/dynamic rendering.
*   **Action**:
    *   Create a `const products = [...]` array in `script.js` containing all product details (id, name, price, image, category).
    *   Create a function `renderProducts(containerSelector, filterCategory)` to generate HTML.
    *   Replace hardcoded HTML in `index.html` and `collections.html` with empty containers targeted by JS.

## 2. Product Details Modal
*   **Goal**: Quick view of product details without leaving the page.
*   **Action**:
    *   Create a modal HTML structure in `index.html` / `collections.html` (or inject via JS).
    *   Add event listeners to product cards to populate and open the modal.
    *   Modal content: Image, Title, Price, Description, "Add to Bag" button.

## 3. Mobile Navigation
*   **Goal**: functional menu on small screens.
*   **Action**:
    *   Add a hamburger icon to `.site-header`.
    *   CSS media queries to hide/show the menu on click.
    *   Ensure the "Account" dropdown works in mobile view too.

## 4. Checkout Page
*   **Goal**: A simple checkout form.
*   **Action**:
    *   Create `checkout.html`.
    *   sections: Order Summary (read from localStorage), Shipping Address Form, Payment Placeholder.
    *   "Place Order" button that clears cart and shows success message.
