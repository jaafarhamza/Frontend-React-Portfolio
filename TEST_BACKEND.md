# 🧪 Backend Connection Test

## Test Your Backend

### 1. Check if backend is running:
```bash
curl https://backend-graphql-portfolio.onrender.com/graphql
```

### 2. Test GraphQL query:
```bash
curl -X POST https://backend-graphql-portfolio.onrender.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ profile { fullName title bio } }"}'
```

### 3. Check browser console:
1. Open your deployed site
2. Open DevTools → Console
3. Look for GraphQL errors or network failures

## Common Issues:

### Backend Sleeping (Render Free Tier)
- First request takes 30+ seconds
- Solution: Wait or upgrade to paid plan

### CORS Error
- Error: "Access to fetch blocked by CORS policy"
- Solution: Add your Vercel domain to backend CORS

### GraphQL Schema Mismatch
- Error: "Cannot query field 'profile'"
- Solution: Check backend schema matches frontend queries

## Your Current Setup:
- ✅ Frontend fetches data correctly
- ✅ Fallback data shows when backend fails
- ✅ Loading states implemented
- ❓ Backend connection needs verification