# Professional Java Software Developer Portfolio & CMS

A complete, production-ready full-stack developer portfolio and content management system engineered with **Java 21**, **Spring Boot 3**, **MySQL**, **Spring Security (JWT)**, and **React 18 (Vite)**.

Designed around a modern **Grenato-style editorial aesthetic**:
- **Zero Gradients**: Strictly solid flat colors and crisp 1px borders.
- **Sharp Visual Hierarchy**: Clear typography (Inter & JetBrains Mono), intentional whitespace, and subtle micro-transitions.
- **Dynamic Content Management**: Fully functional administrative CMS allowing complete CRUD operations over projects, skills, timeline, credentials, external coding platforms, and inquiries.
- **Zero Fake Statistics**: No artificial percentage bars or generic AI fluff.

---

## Architecture & Monorepo Structure

```
portfolio/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg               # Editorial SVG monogram badge
│   │   ├── robots.txt                # Search engine crawler policies
│   │   └── sitemap.xml               # SEO sitemap
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Navbar, Footer, ThemeToggle, Modal, ProtectedRoute, IconRenderer
│   │   │   ├── sections/             # Hero, About, Skills, Experience, Projects, Education, Certifications, Achievements, CodingProfiles, ResumeSection, Contact
│   │   │   └── admin/                # AdminLayout, AdminDashboard, Forms, Modals
│   │   ├── context/                  # ThemeContext, AuthContext, ToastContext
│   │   ├── pages/                    # Home, AdminLogin, AdminDashboard, AdminProfile, AdminProjects, AdminSkills, AdminExperience, AdminEducation, AdminCertifications, AdminAchievements, AdminCodingProfiles, AdminMessages, AdminSettings
│   │   ├── services/                 # api.js (Axios + JWT interceptor), portfolioService.js, adminService.js
│   │   ├── index.css                 # Zero-gradient editorial CSS design tokens
│   │   ├── App.jsx                   # React Router route registry
│   │   └── main.jsx                  # Root React mount
│   ├── index.html                    # SEO metadata & fonts
│   ├── netlify.toml                  # Netlify SPA redirect & security headers
│   ├── package.json
│   ├── vite.config.js                # Vite build & local API reverse proxy
│   ├── Dockerfile                    # Multi-stage Node -> Nginx Alpine
│   ├── nginx.conf                    # Production Nginx SPA routing & gzip
│   └── .env.example
│
├── backend/
│   ├── src/main/
│   │   ├── java/com/portfolio/
│   │   │   ├── config/               # SecurityConfig (Stateless JWT), CorsConfig, WebMvc
│   │   │   ├── controller/           # REST endpoints for public showcase & /api/admin/**
│   │   │   ├── dto/                  # Request/Response payloads with Jakarta Validation
│   │   │   ├── entity/               # JPA Hibernate MySQL entity models
│   │   │   ├── exception/            # GlobalExceptionHandler, ResourceNotFound, ApiError
│   │   │   ├── repository/           # Spring Data JPA repositories
│   │   │   ├── security/             # JwtTokenProvider, JwtAuthenticationFilter, UserPrincipal
│   │   │   ├── service/              # Core business services & DataInitializerService
│   │   │   └── PortfolioBackendApplication.java
│   │   └── resources/
│   │       ├── application.yml       # Production & default MySQL configuration
│   │       └── application-dev.yml   # Embedded H2 in-memory profile for standalone testing
│   ├── pom.xml                       # Maven dependencies (Spring Boot 3.3.3, Java 21)
│   ├── Dockerfile                    # Multi-stage Maven -> Eclipse Temurin JRE 21
│   └── .env.example
│
├── docker-compose.yml                # Local orchestration (MySQL 8 + Backend + Frontend)
├── .gitignore                        # Standard multi-language ignore rules
└── README.md                         # Detailed documentation
```

---

## Technology Stack

### Backend
- **Language**: Java 21 / 17
- **Framework**: Spring Boot 3.3.x
- **Persistence**: Spring Data JPA / Hibernate
- **Database**: MySQL 8.0 (Production) / H2 (Development profile)
- **Security**: Spring Security 6, Stateless JWT (HMAC-SHA256), BCrypt hashing
- **Validation**: Jakarta Bean Validation
- **Build Tool**: Apache Maven

### Frontend
- **Framework**: React 18
- **Tooling**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with automatic JWT bearer header injection and 401 interception
- **Icons**: Lucide React
- **Design System**: Modular CSS with CSS Variables, Dark/Light theme switching, Strictly Solid Colors (Zero Gradients)

### DevOps & Cloud Deployment
- **Frontend Host**: Netlify
- **Backend Host**: Render
- **Database**: Managed MySQL (Render MySQL, Aiven, or PlanetScale)
- **Local Containerization**: Docker & Docker Compose

---

## Quick Start (Local Development)

### Prerequisites
- Java 21 or 17 JDK
- Apache Maven 3.9+
- Node.js 18+ and npm
- Docker Desktop (optional, for running with Docker Compose)

---

### Option 1: Running with Docker Compose (Fastest Full-Stack)

1. Clone the repository and copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Launch the full stack (MySQL + Spring Boot Backend + React Frontend):
   ```bash
   docker compose up --build
   ```
3. Access the applications:
   - **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
   - **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

### Option 2: Running Without Docker (Standard Dev)

#### Step 1: Start Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. **With MySQL installed locally**:
   Create a database in MySQL:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
   Configure your credentials in `application.yml` or export them:
   ```bash
   export DB_URL="jdbc:mysql://localhost:3306/portfolio_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
   export DB_USERNAME="root"
   export DB_PASSWORD="your_password"
   ```
   Run the backend:
   ```bash
   mvn spring-boot:run
   ```

3. **Or run with Embedded H2 (No MySQL needed for testing)**:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```
   The backend will start at `http://localhost:8080`.

#### Step 2: Start Frontend

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Default Seed Admin Credentials

When the database starts for the first time, `DataInitializerService` detects that the database is empty and automatically creates:
1. An administrator user account.
2. Complete realistic placeholder data (Hero, Bio, Skills, Experience, Case Studies, Credentials, Coding Profiles).

| Credential | Value |
| :--- | :--- |
| **Username** | `admin` |
| **Default Password** | `Admin@12345` (or configured via `ADMIN_PASSWORD` env) |
| **Admin Portal URL** | `/admin/login` |

> [!IMPORTANT]
> Change the default password immediately after your first sign-in via the **Security & Password** tab (`/admin/settings`) in the Admin Dashboard.

---

## Environment Variables Reference

### Backend Configuration

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | HTTP port used by Spring Boot (automatically set by Render) | `8080` |
| `DB_URL` | JDBC connection string | `jdbc:mysql://localhost:3306/portfolio_db` |
| `DB_USERNAME` | Database username | `root` |
| `DB_PASSWORD` | Database password | *(empty)* |
| `JWT_SECRET` | 256-bit secret key for HMAC SHA-256 signing | *(pre-configured fallback)* |
| `JWT_EXPIRATION_MS` | Token validity duration in milliseconds | `86400000` (24 hours) |
| `ADMIN_USERNAME` | Default seed administrator username | `admin` |
| `ADMIN_PASSWORD` | Default seed administrator password | `Admin@12345` |
| `ADMIN_EMAIL` | Default seed administrator email | `admin@example.com` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed origins | `http://localhost:5173,http://localhost:3000` |

### Frontend Configuration

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Full URL to the Spring Boot `/api` prefix | `https://your-backend.onrender.com/api` |

---

## REST API Documentation

### Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token |
| `GET` | `/api/profile` | Retrieve developer profile, bio, links, and stats |
| `GET` | `/api/skills` | Retrieve all technical skills sorted by display order |
| `GET` | `/api/skills/category/{category}` | Filter skills by category (e.g. `BACKEND`, `FRONTEND`) |
| `GET` | `/api/experience` | Retrieve work history timeline |
| `GET` | `/api/projects` | Retrieve all projects |
| `GET` | `/api/projects/featured` | Retrieve featured case studies |
| `GET` | `/api/projects/{slug}` | Retrieve single project by URL slug |
| `GET` | `/api/education` | Retrieve academic records |
| `GET` | `/api/certifications` | Retrieve verified industry credentials |
| `GET` | `/api/achievements` | Retrieve hackathon and coding honors |
| `GET` | `/api/coding-profiles` | Retrieve external profile links (GitHub, LeetCode, etc.) |
| `POST` | `/api/contact` | Submit contact message (validated & stored in DB) |

### Protected Endpoints (Requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/change-password` | Update administrator password |
| `GET` | `/api/admin/dashboard` | Retrieve summary metrics and recent inquiries |
| `PUT` | `/api/admin/profile` | Update profile information, bio, and stats counters |
| `POST` | `/api/admin/projects` | Create a new project case study |
| `PUT` | `/api/admin/projects/{id}` | Update existing project |
| `DELETE` | `/api/admin/projects/{id}` | Delete project |
| `POST` | `/api/admin/skills` | Create a new technical skill |
| `PUT` | `/api/admin/skills/{id}` | Update existing skill |
| `DELETE` | `/api/admin/skills/{id}` | Delete skill |
| `POST` | `/api/admin/experience` | Add new work experience entry |
| `PUT` | `/api/admin/experience/{id}` | Update work experience |
| `DELETE` | `/api/admin/experience/{id}` | Delete work experience |
| `POST` | `/api/admin/education` | Add new education record |
| `PUT` | `/api/admin/education/{id}` | Update education record |
| `DELETE` | `/api/admin/education/{id}` | Delete education record |
| `POST` | `/api/admin/certifications` | Add new certification |
| `PUT` | `/api/admin/certifications/{id}` | Update certification |
| `DELETE` | `/api/admin/certifications/{id}` | Delete certification |
| `POST` | `/api/admin/achievements` | Add new achievement |
| `PUT` | `/api/admin/achievements/{id}` | Update achievement |
| `DELETE` | `/api/admin/achievements/{id}` | Delete achievement |
| `POST` | `/api/admin/coding-profiles` | Add new external profile link |
| `PUT` | `/api/admin/coding-profiles/{id}` | Update external profile link |
| `DELETE` | `/api/admin/coding-profiles/{id}` | Delete external profile link |
| `GET` | `/api/admin/messages` | Retrieve contact inquiries (optional `?status=UNREAD`) |
| `PUT` | `/api/admin/messages/{id}/status` | Mark message as `READ` or `ARCHIVED` |
| `DELETE` | `/api/admin/messages/{id}` | Delete message |

---

## Production Deployment Guide

### Deploying Backend to Render

1. Create a MySQL Database on Render or a cloud MySQL provider (such as Aiven or PlanetScale).
2. Note your database credentials (`Host`, `Database`, `User`, `Password`, `Port`).
3. In [Render Dashboard](https://dashboard.render.com), click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. In the Service Settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`
   - **Instance Type**: Free or Starter
6. Add the following **Environment Variables**:
   - `PORT`: `8080` (Render will bind its routing dynamically)
   - `DB_URL`: `jdbc:mysql://<db-host>:<port>/<database-name>?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`
   - `DB_USERNAME`: `<db-user>`
   - `DB_PASSWORD`: `<db-password>`
   - `JWT_SECRET`: `generate_a_secure_random_string_at_least_32_characters_long`
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: `<your-secure-custom-initial-password>`
   - `CORS_ALLOWED_ORIGINS`: `https://<your-app-name>.netlify.app`
7. Click **Create Web Service**.
8. Once deployed, copy your Render URL: `https://<your-backend-name>.onrender.com`.

---

### Deploying Frontend to Netlify

1. In [Netlify Dashboard](https://app.netlify.com), click **Add new site** -> **Import an existing project**.
2. Connect your GitHub repository.
3. In the Build & Deploy settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Add the following **Environment Variable**:
   - `VITE_API_URL`: `https://<your-backend-name>.onrender.com/api`
5. The included `netlify.toml` automatically handles:
   - SPA route redirects (`/*` -> `/index.html 200`)
   - Security headers (`X-Frame-Options`, `X-Content-Type-Options`)
   - Asset cache control
6. Click **Deploy Site**.

---

## Git & Version Control

To commit and push to your GitHub repository:

```bash
git init
git add .
git commit -m "feat: complete production-ready Java Software Developer portfolio & CMS"
git branch -M main
git remote add origin https://github.com/AmitKumar9430/Portfolio.git
git push -u origin main
```

---

## License

MIT License. Designed and engineered for professional software developers.
