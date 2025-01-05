# Service Catalogue Platform

A modern React-based web application for managing and displaying IT services. This platform allows users to browse, search, and order various IT services like Antivirus, Monitoring, and Automation solutions.

## Features

- Browse available IT services with detailed descriptions
- Search functionality for finding specific services (filtering is done as you type)
- Responsive grid layout with pagination
- Service ordering wizard
- Modern UI using Tailwind CSS and shadcn/ui components
- Form validation using Zod

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn package manager
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd service-catalogue
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or your configured port).

## Project Structure

```
service-catalogue/
├── src/
│   ├── components/          # React components
│   │   ├── common/         # Shared components
│   │   ├── ServiceList/    # Service listing components
│   │   ├── ServiceOrderWizard/ # Order wizard components
│   │   └── ui/            # UI components (buttons, cards, etc.)
│   ├── contexts/          # React contexts
│   ├── data/             # Mock data and types
│   ├── services/         # API services and utilities
│   ├── App.tsx          # Main application component
│   └── router.ts        # Application routing
├── public/              # Static assets
└── package.json        # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Development Guide

### Working with the API Service

The application uses a mock API service (`src/services/api.ts`) that simulates backend functionality. The service includes:

- `getAllServices()` - Fetch all available services
- `getServiceById()` - Get a specific service by ID
- `searchServices()` - Search services by name or description
- `getServicesByPriceRange()` - Filter services by price range

### Adding New Services

To add new services, modify the mock data in `src/data/data.ts`. Each service should follow the defined `Service` interface:

```typescript
interface Service {
    id: number;
    name: string;
    shortDescription: string;
    detailedDescription: string;
    price: string;
}
```
