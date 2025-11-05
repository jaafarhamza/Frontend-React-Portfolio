# Project Structure

This document explains the folder structure and organization of the frontend application.

## 📁 Folder Structure

```
src/
├── assets/              # Static files (images, icons, fonts)
├── components/          # Reusable UI components
│   ├── common/          # Shared components (Button, Card, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── features/        # Feature-specific components
├── pages/               # Page components (routes)
│   ├── public/          # Public pages (Home, Projects, Skills, Experience)
│   └── admin/           # Admin pages (Dashboard, Management pages)
├── services/            # API services & business logic
├── graphql/             # GraphQL operations
│   ├── queries/         # GraphQL queries
│   ├── mutations/       # GraphQL mutations
│   └── client.ts        # Apollo Client configuration
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── routes/              # Route configuration
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and constants
```

## 🎯 Folder Purposes

### `/components`
Reusable UI components organized by type:
- **common/**: Generic components used across the app
- **layout/**: Components for page layout structure
- **features/**: Domain-specific components

### `/pages`
Route-level components:
- **public/**: Publicly accessible pages
- **admin/**: Protected admin pages

### `/services`
API communication and business logic

### `/graphql`
GraphQL-related code:
- **queries/**: GraphQL query definitions
- **mutations/**: GraphQL mutation definitions
- **client.ts**: Apollo Client setup

### `/context`
React Context for global state management

### `/hooks`
Custom React hooks for reusable logic

### `/routes`
React Router configuration

### `/types`
TypeScript interfaces and type definitions

### `/utils`
Helper functions and constants

## 🔧 Path Aliases

Use `@/` prefix to import from src:

```typescript
//  import { API_URL } from '../../../utils/constants'
import { API_URL } from '@/utils/constants'
```

