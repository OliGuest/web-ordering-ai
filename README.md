# GuestIt - Web Ordering

A modern, tablet-first web ordering application for restaurants and hospitality venues. Customers browse menus, customize items with modifiers, manage their cart, and place orders directly from a tablet at their table.

## Features

- **Menu Browsing** - Category tabs, product list/grid views, image slideshows
- **Product Customization** - Modifier wizards with mandatory/optional options
- **Shopping Cart** - Add, edit, remove items with real-time totals
- **Order Placement** - Submit orders with order tracking and confirmation
- **Payment Methods** - PIN, Cash, and QR payment support
- **Allergen Filtering** - Filter products by 22 allergen types
- **Multi-language** - Dutch, English, German, Turkish, French (via i18next)
- **Real-time Sync** - SignalR integration for multi-user order coordination
- **Dynamic Theming** - API-driven colors, logos, and branding per restaurant
- **QR Code Entry** - Scan to access without URL parameters
- **Service Requests** - Call staff, request bill, extra utensils
- **Order History** - View and track previous orders
- **Responsive Design** - Tablet-first with mobile and desktop support

## Tech Stack

- **React 17** with Context API for state management
- **40+ Custom Hooks** for business logic separation
- **57 Components** with proper separation of concerns
- **SCSS** with design tokens, animations, and mixins
- **React Bootstrap** for modals and UI components
- **React Router 5** for navigation
- **Axios** for API communication
- **SignalR** for real-time updates
- **i18next** for internationalization
- **Moment.js** for date/time handling

## Project Structure

```
src/
  context/          # Context API state management
  Hooks/            # 40+ custom hooks (payment, orders, modifiers, etc.)
  Pages/            # Page components (Login, Home, Landing, About, etc.)
  components/       # Reusable UI components
    TopFixMenu/     # Header, tabs, search
    OrderListItems/ # Product list, cards, banners
    BottomMenu/     # Bottom navigation bar
    CartBar/        # Floating cart summary
    FilterSidebar/  # Allergen filter panel
    Modals/         # 15+ modal components
    Icons/          # SVG icon library
  styles/           # Design system (tokens, animations, mixins, theme)
  services/         # API service layer
  global/           # Configuration and constants
  utils/            # HTTP client, session management
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/OliGuest/web-ordering-ai.git
cd web-ordering-ai

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Configuration

Server endpoints are configured in `public/config.js`:

```js
window.config = {
  APP_CONNECTION: "your-signalr-endpoint",
  APP_LOCALHOST: "your-api-base-url",
  APP_PLATFORM: "your-platform-url",
};
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Login / Welcome screen |
| `/home` | Main ordering interface |
| `/landing` | Category selection landing |
| `/about` | About us page |
| `/HouseRules` | House rules page |
| No params | QR code scanner entry |

## Design System

The app uses a custom design system with:

- **Tokens** - Spacing (4px base), typography scale, radius, shadows, z-index
- **Animations** - fadeIn, slideUp, slideInRight, scaleIn, shimmer, spring easing
- **Mixins** - Glass morphism, responsive grid, text truncation, skeleton loading
- **Theme** - CSS custom properties with dark mode support, API-driven colors
