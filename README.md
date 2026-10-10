# Merchera Studio — Bespoke Shopify 2.0 Theme

![Merchera Studio](assets/Logo-Photoroom.png)

> **Merchera Studio** is a bespoke, high-performance Shopify 2.0 theme engineered for premium custom merchandise, high-grade apparel, and studio print-on-demand brands. Designed with a luxury editorial aesthetic, buttery-smooth micro-interactions, responsive sticky navigation, and high-converting storefront sections.

---

## 🎨 Visual Identity & Brand Philosophy

- **Burgundy Studio Accent (`#641f1f`)**: Evoking heritage craftsmanship, artisanal textiles, and bold authority.
- **Warm Ivory Background (`#f5eee5`)**: Soft, tactile paper/fabric warmth that replaces sterile cold whites.
- **Espresso Ink Typography (`#211b18`)**: Deep contrast for high legibility across editorial headlines and body copy.
- **Champagne & Sand Borders (`#d5c6b7`)**: Delicate luxury framing and dividers.
- **Studio White (`#fffdf9`)**: Crisp card surfaces with subtle soft drop shadows.

---

## 🚀 Key Features & Custom Architectures

### 1. Floating Studio Header & Sticky Navigation
- **Frosted Glass Blur**: Dynamic backdrop-filter navigation bar that glides into view on downward scroll.
- **Tactile Circular Utility Actions**: Symmetrically aligned search, wishlist, cart, and account buttons.
- **Edge Containment**: Calculated right-aligned flex bounds ensuring the customer login icon never clips or overflows on any display resolution.
- **Integrated Free Shipping Announcement Bar**: High-contrast top ribbon highlighting delivery thresholds and trust guarantees.

### 2. Bespoke Motion & Animation Engine (`merchera-motion.css` & `merchera-motion.js`)
- **Physics-Based Transitions**: Custom cubic-bezier spring curves for card lifts, button expansions, and modal reveals.
- **Staggered Scroll Reveals**: Progressive entry animations powered by lightweight `IntersectionObserver` instances.
- **Radial Ambient Follower**: Subtle cursor illumination highlighting tactile borders and card edges on desktop.
- **Circular Scroll-To-Top Indicator**: Interactive floating pill featuring a real-time SVG progress ring showing page read percentage.

### 3. Interactive Craft & Fabric Showcase (`sections/merchera-craft-showcase.liquid`)
- Tabbed interactive studio inspector showcasing fabric weights, thread counts, and print techniques:
  - *320 GSM French Terry Fleece*
  - *240 GSM Combed Ring-Spun Cotton*
  - *High-Density Studio Embroidery (15,000+ stitches)*
  - *Eco-Solvent Soft-Touch Screen Print*
- Dynamic specification badges and tactile interactive selection states.

### 4. Bespoke 4-Step Customization Journey (`sections/merchera-process.liquid`)
- Step-by-step visual roadmap guiding customers from raw blank selection to artwork upload, digital proofing, and final dispatch.
- Visual connector lines with responsive tablet and mobile adaptations.

### 5. Smart Sales Social Proof Toast (`sections/popup-sale-notification.liquid`)
- Non-intrusive live buyer notifications configured with an optimal **8-second cadence**.
- Shows genuine UK regional orders (London, Glasgow, Birmingham, Swansea, Belfast) with smooth slide-in entry and dismissal controls.

### 6. Interactive Apparel Size Guide (`templates/page.json`)
- Dedicated Men’s Polo Size Guide with standard Chest & Garment Length measurements in inches (S through 2XL).
- Floating SVG garment diagram with animated chest and length measurement reference markers.
- Streamlined layout focused strictly on the measurement matrix and direct FAQ concierge support.

### 7. Refined Single-Tier Compact Footer (`sections/footer-v2.liquid`)
- Streamlined horizontal layout pairing the Merchera studio logo, core store navigation, social links, and security/payment trust marks.
- Reduced vertical padding with crisp white logo contrast over the rich burgundy backdrop.

---

## 📁 Repository Structure

```text
merchera-studio-shopify-theme/
├── assets/                  # CSS stylesheets, animations, client-side JS engines, brand assets
│   ├── merchera-motion.css  # Core bespoke animation styles and brand design tokens
│   ├── merchera-motion.js   # Interactive components, scroll observers, and progress logic
│   └── ...
├── blocks/                  # Reusable app and section blocks
├── config/                  # Theme settings schema and presets
│   ├── settings_data.json   # Active store configuration, colors, and typography
│   └── settings_schema.json # Theme customizer field definitions
├── layout/                  # Base Liquid wrappers
│   ├── theme.liquid         # Primary HTML layout including motion engine assets
│   └── password.liquid      # Password protection layout
├── locales/                 # Internationalization dictionary files (en.default.json, etc.)
├── sections/                # Modular Shopify 2.0 sections
│   ├── header-v1.liquid     # Studio header
│   ├── footer-v2.liquid     # Streamlined footer
│   ├── merchera-craft-showcase.liquid  # Interactive fabric and craft tabs
│   ├── merchera-process.liquid         # 4-step customization flow
│   ├── merchera-community.liquid       # Creators club loyalty banner
│   └── ...
├── snippets/                # Micro Liquid templates, icons, UI cards, and helper components
├── templates/               # JSON-based Shopify 2.0 template definitions
│   ├── index.json           # Home page section hierarchy and configuration
│   ├── page.json            # Size Guide & standard page template
│   ├── product.json         # Product detail page layout
│   └── ...
├── .gitignore               # Standard Shopify theme exclusion rules
└── README.md                # Project documentation
```

---

## 🛠️ Installation & Deployment

### Option A: Shopify Admin Zip Upload (Quickest)
1. In your Shopify Admin, navigate to **Online Store** > **Themes**.
2. Under the **Theme library** section, click **Add theme** > **Upload zip file**.
3. Choose the generated package `merchera-theme-updated-latest.zip`.
4. Click **Actions** > **Preview** to review the live storefront, or **Publish** to make it active.

### Option B: Shopify CLI Development
```bash
# Clone the repository
git clone https://github.com/ecomwithdaud-hub/merchera-studio-shopify-theme.git
cd merchera-studio-shopify-theme

# Authenticate with your Shopify store
shopify theme dev --store your-store.myshopify.com

# Push directly to Shopify theme library
shopify theme push --store your-store.myshopify.com
```

---

## ⚙️ Theme Customizer Configuration

1. **Navigation Menus**:
   - Go to **Shopify Admin > Online Store > Navigation**.
   - Assign your navigation links to `main-menu` and your footer menu.
2. **Sales Popup**:
   - Customize products, customer locations, and display timer inside **Theme Customizer > Theme Settings > Popups**.
3. **Products & Inventory**:
   - Ensure products exist with corresponding handles (e.g., `custom-blue-pullover-hoodie`, `custom-oversized-drop-shoulder-t-shirt-black`), or link your own catalog items directly via section settings.

---

## 👤 Author & Maintainer

- **Developer**: [ecomwithdaud-hub](https://github.com/ecomwithdaud-hub)
- **Store**: Merchera Studio
- **License**: Private & Proprietary
