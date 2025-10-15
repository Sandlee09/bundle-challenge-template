> **This repository is provided **exclusively** for the technical assessment.**  
> Once the hiring process is complete, all of its contents may be deleted.

---

## Full brief

Find the detailed briefing, evaluation criteria, and mock-ups on Notion:  
🔗 **[Link to the exercise](https://www.notion.so/dtc-pages/Technical-Challenge-Dynamic-Product-Bundle-10-OFF-215075df3d7980809acddb8a95d6db91?source=copy_link)**

---

## How to participate

1. **Create a Shopify Partners account** (free) and set up a development store—this is where you’ll preview your work.  
2. **Fork this repository** to your personal account or organization (**Fork → Create a fork**).  
3. Work in your fork; we recommend a branch named `feature/solution`.  
4. **When you’re done**, open a **Pull Request (PR)** from your branch to `main` in *your own fork*.  
   - Leave the PR **open and unmerged** so we can review commits, diffs, and comments.  
   - In the PR **description**, paste the **theme preview link** (e.g. `https://your-dev-store.myshopify.com/?preview_theme_id=123456789`) so we can test the bundle live.  
5. Invite `@hemnys` as a *reviewer* or *collaborator* so we have access to your PR.

### Shopify Functions & Checkout UI Extensions

| What you must do | Why |
|------------------|-----|
| **Create one additional private repository** under your account (e.g. `bundle-backend`). | Keeps code that may require secrets or CI isolated from the theme fork. |
| In that repo, place **both components**:<br>• `bundle-function` (CartTransform)<br>• `bundle-checkout-extension` (UI Extension) | Centralises backend code while remaining separate from storefront assets. |
| **Open a dedicated PR to `main` for each component** (two PRs total). | Allows us to review Function and Extension independently. |
| Add **direct links** to those PRs in the README of your fork. | Fast navigation for the evaluation team. |

> **Functions or Extensions delivered without their own PRs will not be accepted.**

---

## Bundle Product Implementation

This theme now includes bundle product functionality with the following features:

### Bundle Card Features
- **Swiper.js Integration**: Bundle product images are displayed in a carousel using Swiper.js
- **Bundle Pricing**: Shows bundle price, original price, and discount percentage
- **Bundle Detection**: Automatically detects products with associated bundle products via:
  - Metafields: `custom.bundle_product` (product handle)
  - Product tags: `bundle:product-handle`
- **Responsive Design**: Bundle cards work seamlessly on mobile and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Files Added/Modified
- `snippets/card-bundle.liquid` - Bundle card component with Swiper.js
- `sections/bundle-products.liquid` - Bundle products section
- `assets/component-bundle-card.css` - Bundle card styling
- `assets/section-bundle-products.css` - Section styling
- `assets/bundle-card.js` - JavaScript functionality
- `snippets/bundle-data.liquid` - Bundle data structure
- `snippets/card-product.liquid` - Updated to detect bundle products
- `config/settings_schema.json` - Added bundle settings

### Setup Instructions
1. **Enable Bundle Products**: Go to Theme Settings > Bundle Products and enable the functionality
2. **Configure Detection Method**: Choose between metafields, tags, or both
3. **Add Bundle Products**: 
   - Set metafield `custom.bundle_product` to the bundle product handle, OR
   - Add tag `bundle:product-handle` to products
4. **Customize Display**: Configure discount display, card style, and Swiper settings

### Bundle Backend Components
- **Bundle Function**: CartTransform function for bundle pricing
- **Bundle Checkout Extension**: UI Extension for checkout bundle display

## Minimal best practices

- Small, descriptive commits.  
- A clear README with local setup, Shopify CLI commands, and test steps.  

---

Good luck with the challenge!
