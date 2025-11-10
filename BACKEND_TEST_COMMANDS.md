# 🧪 Backend GraphQL Test Commands

## Your backend is WORKING! ✅

The message you saw confirms your GraphQL endpoint is active.

## Test Commands:

### 1. Test Basic Connection:
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://backend-graphql-portfolio.onrender.com/graphql' \
  --data '{"query":"query { __typename }"}'
```

### 2. Test Profile Query:
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://backend-graphql-portfolio.onrender.com/graphql' \
  --data '{"query":"query { profile { id fullName title bio email location } }"}'
```

### 3. Test Skills Query:
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://backend-graphql-portfolio.onrender.com/graphql' \
  --data '{"query":"query { skills { id name category level } }"}'
```

### 4. Test Projects Query:
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://backend-graphql-portfolio.onrender.com/graphql' \
  --data '{"query":"query { projects { id title description featured status } }"}'
```

## Why Your Frontend Shows Fallback Data:

### Possible Issues:

1. **CORS Configuration** - Backend needs to allow your Vercel domain
2. **Schema Mismatch** - Frontend queries don't match backend schema
3. **Authentication Required** - Some queries might need auth tokens

## Fix CORS Issue:

Add this to your backend CORS configuration:
```javascript
const corsOptions = {
  origin: [
    'https://frontend-react-portfolio-sand.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
};
```

## Test in Browser Console:

Visit your deployed site and run in console:
```javascript
fetch('https://backend-graphql-portfolio.onrender.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: '{ profile { fullName title bio } }'
  })
}).then(r => r.json()).then(console.log);
```