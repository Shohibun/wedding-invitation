# Production Deployment Guide (Vercel + Next.js)

## 1. Project Configuration
- **Framework Preset**: Next.js
- **Node.js Version**: 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## 2. Environment Variables
Map all variables from `.env.example` into Vercel Project Settings -> Environment Variables.
> Ensure `NEXT_PUBLIC_SITE_URL` perfectly matches the primary custom domain attached to the project.

## 3. Production Optimizations
- **Image Optimization**: Images are automatically optimized by Next.js edge caching since we utilize remote patterns in `next.config.ts`.
- **Edge Runtime**: Currently, `src/proxy.ts` operates seamlessly at the edge for session verification before hitting the server rendering pool.

## 4. Custom Domains
1. Add custom domains in Vercel -> Settings -> Domains.
2. Vercel will automatically provision SSL certificates.
3. Configure your DNS provider to CNAME point to `cname.vercel-dns.com`.

## 5. Post-Deployment Verification
1. Access the production URL.
2. Ensure `/login` redirects and handles authentication properly.
3. Attempt to upload a media asset to verify Storage RLS and bucket routing.
4. Publish a test draft to ensure the static site generation pipeline operates successfully under production environment configurations.
