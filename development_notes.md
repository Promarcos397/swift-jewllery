# Development Notes

## Purpose and Requirements (AC 2.1)

The Luxury Lune website serves as an e-commerce platform for a high-end jewellery brand targeting affluent consumers aged 25-55 who value craftsmanship and exclusivity. The primary purpose is to showcase premium silver and diamond jewellery collections while providing a seamless shopping experience that reflects the brand's luxury positioning.

The target audience consists of discerning customers who appreciate minimalist design and expect a browsing experience comparable to established luxury houses such as Cartier or Tiffany. These users typically access the site from both desktop devices in professional settings and mobile devices while commuting or relaxing at home. The website therefore requires responsive design that maintains elegance across all screen sizes.

Key functional requirements include product catalogue browsing with category filtering, a shopping bag with quantity controls, user account registration and authentication, and a streamlined checkout process. The site must load quickly despite featuring high-resolution product imagery, and all interactive elements must provide clear visual feedback to users.

## Performance Factors (AC 4.1)

Several technical factors directly influence the website's performance and user experience. Image optimisation represents the most significant consideration, as jewellery photography requires high detail to showcase product quality. The decision to convert all product images to WebP format reduced file sizes by approximately forty percent compared to traditional JPEG files while maintaining visual fidelity. This format offers superior compression and is supported by all modern browsers.

The loading strategy employs lazy loading for images below the initial viewport, ensuring that the hero banner and first product row load immediately while subsequent content loads as users scroll. This approach reduces initial page load time from several seconds to under two seconds on typical broadband connections.

CSS and JavaScript resources are kept minimal by avoiding heavy frameworks. The stylesheet uses CSS custom properties for theming, which reduces code repetition and file size. JavaScript handles only essential functionality including cart management, product filtering, and form validation. LocalStorage provides persistent cart data without requiring server requests on every page load.

Font loading uses the display swap strategy, allowing text to render immediately with system fonts before custom typography loads. This prevents invisible text during the critical first moments of page rendering.

## Security and Legal Constraints (AC 4.2)

The website implements several security measures to protect user data. All form submissions use client-side validation before processing, preventing malformed data from causing errors. The account forms validate email formats and enforce minimum password lengths. Input fields sanitise content to prevent cross-site scripting attacks where malicious code might be injected through form submissions.

Under the General Data Protection Regulation and UK data protection laws, the website must obtain explicit consent before collecting personal information. The newsletter subscription only collects email addresses and includes implied consent through the submission action. A comprehensive privacy policy must be accessible from the footer, explaining how customer data is stored, processed, and protected.

The checkout process collects sensitive payment information, requiring secure transmission through encrypted connections. Card details should never be stored locally, and payment processing must occur through certified third-party providers such as Stripe that handle PCI compliance requirements.

Legal obligations also include accurate product descriptions, transparent pricing displaying all costs before checkout, and clear terms regarding returns and refunds. Consumer protection regulations require the website to honour cancellation rights within fourteen days of purchase.
