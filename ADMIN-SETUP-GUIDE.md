# Portfolio Admin Panel & Backend

This document describes the admin panel and backend system for managing your portfolio content dynamically.

## 🚀 Features

### Admin Panel
- **Dashboard**: Overview of portfolio content and statistics
- **Projects Management**: Add, edit, delete, and publish/unpublish projects
- **Skills Management**: Manage your technical skills and expertise levels
- **Contact Messages**: View and manage contact form submissions
- **User Authentication**: Secure admin access with JWT tokens

### Backend API
- **RESTful APIs**: For all CRUD operations
- **Database Integration**: SQLite for development, PostgreSQL for production
- **Authentication**: JWT-based admin authentication
- **File Upload Support**: Ready for image upload integration

## 📁 File Structure

```
app/
├── admin/                    # Admin panel pages
│   ├── layout.tsx           # Admin layout with authentication
│   ├── page.tsx             # Dashboard
│   └── projects/            # Projects management
├── api/                     # API routes
│   ├── admin/               # Admin-only endpoints
│   │   ├── login/           # Authentication
│   │   ├── verify/          # Token verification
│   │   └── projects/        # Project management APIs
│   ├── projects/            # Public project API
│   ├── skills/              # Public skills API
│   └── contact/             # Contact form API

components/
├── admin/                   # Admin-specific components
│   ├── LoginForm.tsx
│   └── Navigation.tsx

lib/
├── db.ts                    # Database connection
├── auth.ts                  # Authentication utilities
└── data-api.ts              # Data fetching functions

prisma/
├── schema.prisma            # Database schema
└── seed.ts                  # Database seeding script
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local` and update the values:
```bash
cp .env.example .env.local
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
npx prisma db push

# Seed with initial data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Admin Panel
- Visit: `http://localhost:3000/admin`
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`

## 🚀 Deployment to Vercel

### 1. Database Setup (Production)
For production, you'll need a hosted database. Recommended options:

#### Option A: Vercel Postgres (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Create Vercel Postgres database
vercel postgres create
```

#### Option B: PlanetScale
1. Create account at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string

#### Option C: Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create project
3. Get PostgreSQL connection string

### 2. Environment Variables in Vercel
Set these in your Vercel dashboard under Settings → Environment Variables:

```bash
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-super-secret-production-key"
NEXTAUTH_URL="https://yourdomain.vercel.app"
ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD="your-secure-admin-password"
SITE_URL="https://yourdomain.vercel.app"
```

### 3. Database Migration
After setting up your production database:

```bash
# Push schema to production database
npx prisma db push

# Seed production database (optional)
npm run db:seed
```

### 4. Deploy
```bash
# Deploy to Vercel
vercel --prod
```

## 📝 API Endpoints

### Public APIs
- `GET /api/projects` - Get published projects
- `GET /api/skills` - Get published skills
- `POST /api/contact` - Submit contact form

### Admin APIs (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify token
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project
- `GET /api/admin/skills` - Get all skills
- `POST /api/admin/skills` - Create skill

## 🔐 Authentication

The admin panel uses JWT token authentication:

1. Login via `/api/admin/login` with email/password
2. Receive JWT token
3. Include token in `Authorization: Bearer <token>` header
4. Token validates admin access to protected routes

## 💾 Database Schema

### Projects
- Basic info: title, description, image
- Technical details: tech stack, languages, difficulty
- Project metadata: status, category, year
- Rich content: challenges, solutions, results
- Publishing: featured, published, order

### Skills
- Name, category, proficiency level
- Years of experience
- Description and icons
- Publishing controls

### Contact Messages
- User submissions from contact form
- Read/unread status
- Response tracking

## 🎨 Customization

### Adding New Content Types
1. Add model to `prisma/schema.prisma`
2. Create API routes in `app/api/admin/`
3. Add admin pages in `app/admin/`
4. Update navigation in `components/admin/Navigation.tsx`

### Styling
- Uses Tailwind CSS and shadcn/ui components
- Customize in `tailwind.config.ts`
- Component styling in individual files

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Database operations
npx prisma studio          # Open database browser
npx prisma db push         # Push schema changes
npm run db:seed           # Seed database

# Production
npm run build             # Build for production
npm start                 # Start production server
```

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check `DATABASE_URL` in `.env.local`
   - Ensure database exists
   - Run `npx prisma db push`

2. **Admin Login Failed**
   - Verify admin user exists: `npx prisma studio`
   - Check credentials in `.env.local`
   - Re-run seed: `npm run db:seed`

3. **API Authentication Error**
   - Check `NEXTAUTH_SECRET` is set
   - Verify token in browser localStorage
   - Try logging out and back in

4. **Build Errors**
   - Run `npm run build` locally first
   - Check all imports are correct
   - Ensure all environment variables are set

## 📖 Next Steps

1. **Customize Content**: Update projects, skills, and personal info
2. **Add Features**: Implement testimonials, blog posts, or experience sections
3. **Enhance UI**: Customize the admin panel design
4. **Add Analytics**: Track portfolio views and engagement
5. **SEO Optimization**: Ensure dynamic content is SEO-friendly

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review error logs in Vercel dashboard
3. Ensure all environment variables are correctly set
4. Test locally before deploying to production

The admin panel provides a powerful way to manage your portfolio content without code changes. All updates are reflected immediately on your live site!
