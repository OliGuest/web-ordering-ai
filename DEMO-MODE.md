# Demo Mode & Local Testing

## Quick Start

### Demo Mode (no API needed)

1. Open `public/config.js`
2. Set `APP_DEMO_MODE: true`
3. Run `npm start`
4. Open `http://localhost:3000/?tableNumber=1&orderCode=1&tableCode=1&validation=1`

Demo mode uses local JSON files from `src/data/` — no network connection required.

### Real API Mode

1. Open `public/config.js`
2. Set `APP_DEMO_MODE: false`
3. Set the API endpoints to your POS server:

```js
window.config = {
  APP_DEMO_MODE: false,
  APP_CONNECTION: "http://f.revelapps.com:9955/signalr/hubs/",
  APP_LOCALHOST: "http://f.revelapps.com:9955",
  APP_PLATFORM: "http://f.revelapps.com:9955",
};
```

4. Run `npm start`
5. Scan a QR code from POS or use the URL with real table parameters

## Available API Servers

| Server | URL | Notes |
|--------|-----|-------|
| F-server | `http://f.revelapps.com:9955` | Current test POS |
| Dev | `http://dev.revelapps.com:9988` | Development |
| Cloud | `https://webordering.cloud.revelapps.com` | Production cloud |
| Local POS | `http://192.168.x.x:9944` | Local network POS |

## Demo Data Files

All in `src/data/`:

| File | Purpose | Used By |
|------|---------|---------|
| `getresources.json` | Full menu, themes, categories, products, modifiers, allergens, languages, service calls | `getResources()`, `getResourcesWithParams()` |
| `demo-order-response.json` | Success response for placing orders | `postOrder()` |
| `demo-history-response.json` | Order history with 2 rounds, totals | `getOrderHistory()` |
| `demo-service-response.json` | Success response for service requests | `postService()`, `postPayWithPinService()`, `postPayWithCashService()` |

## How Demo Mode Works

In `src/services/adminService.js`, every API function checks `window.config.APP_DEMO_MODE`:

- **true** → returns local JSON data immediately, no network call
- **false** → calls the real API as normal

SignalR (real-time sync) is not active in demo mode. Cart works locally only.

## Data Structure (getresources.json)

```
ThemeResponse
├── ServiceCallTheme     → service bell colors
├── BillTheme            → bill/cart modal colors
├── HistoryTheme         → order history colors
├── OrderTheme           → product text/bg colors
├── MessageTheme         → ready/done modal colors
├── LanguagesList[]      → available languages + house rules
├── LogoImage            → restaurant logo URL
├── CoverImage           → cover photo URL
├── ActiveColor          → primary theme color (e.g. "#0B6C53")
├── ArrowBackButtonColor → back button color
├── CurrencySettings     → currency symbol
├── PaymentMethods       → { Pin, Cash, QRCode }
├── ThemeType            → "1" (dark) or "2" (light)
└── CategoriesScreenLayoutType → 1 or 2

TMKData[]
└── [language index]
    ├── MainCategories[]
    │   ├── Name, PictureUrl
    │   └── SubCategories[]
    │       └── Products[]
    │           ├── ProductId, Name, Price
    │           ├── SmallPictureUrl
    │           ├── ProductDetails.MenuItems[]
    │           └── ModifierWizards[]
    └── ServiceCallsGroups[]
        └── ServiceCalls[]
```

## API Endpoints Reference

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `api/getresources` | Menu, theme, everything (no auth) |
| GET | `api/GetFullResources?tableNumber=&orderNumber=&validation=&deviceSessionId=` | Same but with table session |
| POST | `api/CreateOrder?tableNumber=&orderNumber=&validation=&deviceSessionId=&senderName=` | Place an order |
| GET | `api/HistoryOrders?tableNumber=&orderNumber=&validation=&deviceSessionId=` | Get order history |
| POST | `api/ServiceRequest?...` | Call staff / request bill |
| POST | `api/ServicePayWithPinRequest?...` | Pay with PIN |
| POST | `api/ServicePayWithCashRequest?...` | Pay with cash |
| POST | `api/AddQuantityViaSignalR` | Sync cart via SignalR |

## To Update Demo Data

To refresh `getresources.json` with real data from a POS:

```bash
curl -o src/data/getresources.json "http://f.revelapps.com:9955/api/getresources"
```

## URL Parameters

The app requires these URL parameters to function:

| Parameter | Example | Required |
|-----------|---------|----------|
| `tableNumber` | `A15` | Yes |
| `orderCode` | `ABC123` | Yes (or orderNumber) |
| `orderNumber` | `12345` | Yes (or orderCode) |
| `tableCode` | `XYZ` | Optional |
| `validation` | `abc-def-123` | Yes |

For demo mode, any values work: `?tableNumber=1&orderCode=1&tableCode=1&validation=1`
