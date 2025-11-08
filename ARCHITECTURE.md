# 🏗️ Portfolio Frontend Architecture

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │   Pages      │──────│  Components  │                     │
│  │              │      │              │                     │
│  │ - Home       │      │ - Profile    │                     │
│  │ - Portfolio  │      │ - Projects   │                     │
│  │ - Admin      │      │ - Skills     │                     │
│  └──────┬───────┘      └──────────────┘                     │
│         │                                                    │
│         │ uses                                               │
│         ▼                                                    │
│  ┌──────────────────────────────────────┐                   │
│  │        Custom Hooks Layer            │                   │
│  ├──────────────────────────────────────┤                   │
│  │ - usePortfolio()                     │                   │
│  │ - useProfile()                       │                   │
│  │ - useProjects()                      │                   │
│  │ - useSkills()                        │                   │
│  │ - useExperiences()                   │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                            │
│                 │ executes                                   │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │      GraphQL Queries Layer           │                   │
│  ├──────────────────────────────────────┤                   │
│  │ - GET_PORTFOLIO                      │                   │
│  │ - GET_PROFILE                        │                   │
│  │ - GET_PROJECTS                       │                   │
│  │ - GET_SKILLS                         │                   │
│  │ - GET_EXPERIENCES                    │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                            │
│                 │ uses                                       │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │      GraphQL Fragments               │                   │
│  ├──────────────────────────────────────┤                   │
│  │ - PROFILE_FIELDS                     │                   │
│  │ - PROJECT_FIELDS                     │                   │
│  │ - SKILL_FIELDS                       │                   │
│  │ - EXPERIENCE_FIELDS                  │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                            │
└─────────────────┼────────────────────────────────────────────┘
                  │
                  │ through
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Apollo Client                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Link    │→ │ Error Link   │→ │ HTTP Link    │      │
│  │              │  │              │  │              │      │
│  │ - JWT Token  │  │ - Error      │  │ - GraphQL    │      │
│  │ - CSRF Token │  │   Handling   │  │   Endpoint   │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
│                                              │              │
│  ┌──────────────┐  ┌──────────────┐         │              │
│  │ Rate Limit   │  │ Logging Link │         │              │
│  │ Link         │  │              │         │              │
│  └──────────────┘  └──────────────┘         │              │
│                                              │              │
│  ┌──────────────────────────────────────────┘              │
│  │                                                          │
│  │           InMemory Cache                                │
│  │  ┌────────────────────────────────┐                     │
│  │  │ - Profile (normalized)         │                     │
│  │  │ - Projects (normalized)        │                     │
│  │  │ - Skills (normalized)          │                     │
│  │  │ - Experiences (normalized)     │                     │
│  │  └────────────────────────────────┘                     │
│  │                                                          │
└──┼──────────────────────────────────────────────────────────┘
   │
   │ HTTP Request
   ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend GraphQL Server                          │
│              http://localhost:4000/graphql                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1. Query Execution Flow
```
Component
   │
   ├─ calls hook: useProjects()
   │
   ▼
Custom Hook
   │
   ├─ executes: GET_PROJECTS query
   │
   ▼
Apollo Client
   │
   ├─ checks cache
   │   ├─ if cached → return immediately
   │   └─ if not cached → continue
   │
   ├─ applies middleware
   │   ├─ Rate Limiting
   │   ├─ Auth (JWT + CSRF)
   │   └─ Logging
   │
   ├─ sends HTTP request
   │
   ▼
Backend Server
   │
   ├─ validates request
   ├─ executes resolvers
   ├─ returns data
   │
   ▼
Apollo Client
   │
   ├─ normalizes data
   ├─ updates cache
   ├─ triggers re-render
   │
   ▼
Component
   │
   └─ displays data
```

### 2. Error Handling Flow
```
Error Occurs
   │
   ├─ GraphQL Error?
   │   ├─ Yes → ErrorLink catches
   │   │   ├─ Auth error? → Clear tokens + Redirect
   │   │   └─ Other error → Log + Pass to component
   │   │
   │   └─ No → Network Error?
   │       ├─ Yes → ErrorLink catches
   │       │   ├─ 401/403? → Clear tokens + Redirect
   │       │   └─ Other → Log + Pass to component
   │       │
   │       └─ React Error?
   │           └─ ErrorBoundary catches → Show fallback UI
   │
   ▼
Component
   │
   └─ Displays error message
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx      # React error catching
│   │   └── QueryWrapper.tsx       # Loading/error states
│   ├── features/
│   │   ├── Profile/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   └── Experience/
│   └── layout/
│
├── graphql/
│   ├── client.ts                  # Apollo Client setup
│   ├── fragments/
│   │   └── index.ts               # Reusable fragments
│   ├── queries/
│   │   ├── index.ts               # Barrel export
│   │   ├── profile.ts             # Profile queries
│   │   ├── skills.ts              # Skills queries
│   │   ├── projects.ts            # Projects queries
│   │   ├── experiences.ts         # Experience queries
│   │   ├── portfolio.ts           # Complete portfolio
│   │   └── user.ts                # Auth queries
│   └── mutations/
│
├── hooks/
│   ├── index.ts                   # Barrel export
│   ├── useAuth.ts                 # Authentication
│   ├── usePortfolio.ts            # Complete portfolio
│   ├── useProfile.ts              # Profile data
│   ├── useProjects.ts             # Projects data
│   ├── useSkills.ts               # Skills data
│   └── useExperiences.ts          # Experience data
│
├── types/
│   ├── index.ts                   # Barrel export
│   ├── auth.types.ts              # Auth types
│   └── portfolio.types.ts         # Portfolio types
│
├── utils/
│   ├── security.ts                # CSRF, Rate limiting, XSS
│   ├── storage.ts                 # Encrypted storage
│   ├── jwt.ts                     # JWT utilities
│   └── constants.ts               # App constants
│
└── config/
    └── env.ts                     # Environment config
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Stack                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Layer 1: Input Validation                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - TypeScript type checking                         │     │
│  │ - GraphQL schema validation                        │     │
│  │ - XSS sanitization                                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Layer 2: Authentication                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - JWT token validation                             │     │
│  │ - Token expiration check                           │     │
│  │ - Auto-logout on expiry                            │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Layer 3: CSRF Protection                                    │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - Token generation                                 │     │
│  │ - Token validation                                 │     │
│  │ - Header injection                                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Layer 4: Rate Limiting                                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - Query rate limiting (100/min)                    │     │
│  │ - Mutation rate limiting (20/min)                  │     │
│  │ - Login rate limiting (5/min)                      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Layer 5: Secure Storage                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - XOR encryption                                   │     │
│  │ - Encrypted token storage                          │     │
│  │ - Secure user data storage                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Layer 6: Error Handling                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - Error boundaries                                 │     │
│  │ - Graceful degradation                             │     │
│  │ - No sensitive data in errors                      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Query Strategy

### Cache-First (Static Data)
```
Profile, Skills → Rarely change → cache-first
```

### Cache-and-Network (Dynamic Data)
```
Projects, Experiences → May change → cache-and-network
```

### Network-Only (Real-time Data)
```
Admin mutations → Always fresh → network-only
```

---

## 🚀 Performance Optimizations

### 1. Fragment Reuse
```graphql
# Instead of repeating fields
fragment SkillFields on Skill {
  id
  name
  category
  icon
}

# Use in multiple queries
query GetProjects {
  projects {
    skills {
      ...SkillFields  # Reused
    }
  }
}
```

### 2. Normalized Cache
```typescript
// Apollo automatically normalizes by ID
Profile:1 → { id: 1, name: "name" }
Project:1 → { id: 1, title: "App" }

// Updates to Profile:1 reflect everywhere
```

### 3. Optimized Queries
```typescript
// ❌ Bad: Multiple requests
useProfile();
useProjects();
useSkills();
useExperiences();

// ✅ Good: Single request
usePortfolio(); // Fetches all at once
```

---

## 🧩 Component Integration

### Example: Portfolio Page
```typescript
import { usePortfolio } from '@/hooks';
import { QueryWrapper, ErrorBoundary } from '@/components/common';

function PortfolioPage() {
  const { data, loading, error } = usePortfolio();

  return (
    <ErrorBoundary>
      <QueryWrapper loading={loading} error={error} data={data}>
        <ProfileSection profile={data?.getPortfolio.profile} />
        <ProjectsSection projects={data?.getPortfolio.projects} />
        <SkillsSection skills={data?.getPortfolio.skills} />
        <ExperienceSection experiences={data?.getPortfolio.experiences} />
      </QueryWrapper>
    </ErrorBoundary>
  );
}
```

---

## 📊 Type Safety Flow

```
GraphQL Schema (Backend)
   │
   ├─ defines types
   │
   ▼
TypeScript Types (Frontend)
   │
   ├─ portfolio.types.ts
   │
   ▼
GraphQL Queries
   │
   ├─ typed with response types
   │
   ▼
Custom Hooks
   │
   ├─ return typed QueryResult
   │
   ▼
Components
   │
   └─ receive typed data
```

---

## 🎨 Best Practices Applied

✅ **Separation of Concerns**
- Queries separate from components
- Hooks encapsulate data fetching
- Types separate from logic

✅ **DRY (Don't Repeat Yourself)**
- Fragments for field reuse
- Barrel exports for imports
- Shared utilities

✅ **Type Safety**
- Full TypeScript coverage
- No `any` types
- Strict null checks

✅ **Error Handling**
- Multiple error boundaries
- Graceful degradation
- User-friendly messages

✅ **Performance**
- Smart caching
- Optimized queries
- Lazy loading ready

---

## 🔄 State Management

```
┌─────────────────────────────────────────┐
│         Apollo Cache (Global)           │
├─────────────────────────────────────────┤
│ - Profile                               │
│ - Projects                              │
│ - Skills                                │
│ - Experiences                           │
└─────────────────────────────────────────┘
           │
           ├─ Normalized by ID
           ├─ Automatic updates
           └─ Reactive queries
           
┌─────────────────────────────────────────┐
│      Local Storage (Persistent)         │
├─────────────────────────────────────────┤
│ - JWT Token (encrypted)                 │
│ - User Data (encrypted)                 │
│ - CSRF Token                            │
└─────────────────────────────────────────┘
```

---

## 📈 Scalability

### Implementation
- ✅ 12 queries + 1 optimized
- ✅ Type-safe
- ✅ Cached
- ✅ Secure

### Easy to Add
- ✅ New queries (follow pattern)
- ✅ New types (extend existing)
- ✅ New hooks (copy template)

---
