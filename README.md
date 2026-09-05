# Neha — AI Engineer Portfolio

A full-stack personal portfolio built to showcase my work, experience, projects, technical skills, certifications, achievements, and coding profiles.

Unlike a traditional static portfolio, this project includes a **custom Admin CMS** backed by a Spring Boot REST API, allowing portfolio content to be managed dynamically through an authenticated dashboard.

---

## ✨ Overview

This portfolio represents my journey as an **AI Engineer**, with a focus on:

* Generative AI
* Agentic AI
* Conversational AI
* LLM-powered applications
* AI Agents & workflows
* Full-stack application development
* Backend engineering
* Cloud & API-based systems

The application is built as a complete full-stack system rather than a static frontend, with a React client communicating with a Spring Boot backend through REST APIs.

---

## 🚀 Features

### Public Portfolio

* Responsive portfolio website
* Hero / introduction section
* About section
* Technical skills
* Professional experience
* Projects & case studies
* Education
* Certifications
* Achievements
* Coding profiles
* Resume section
* Contact form
* Social / external profile links
* Light & dark theme

### Admin CMS

A protected admin dashboard allows portfolio content to be managed without changing the source code.

Admin functionality includes:

* Dashboard & portfolio statistics
* Profile management
* Project CRUD
* Skills CRUD
* Experience CRUD
* Education CRUD
* Certification CRUD
* Achievement CRUD
* Coding profile management
* Contact message management
* Admin account management
* Password change
* EmailJS configuration
* Image/file upload support

### Authentication & Security

* JWT-based authentication
* Stateless Spring Security configuration
* BCrypt password hashing
* Protected admin routes
* JWT request interception
* Role-based endpoint protection
* CORS configuration
* Request validation
* Global exception handling

---

## 🛠️ Tech Stack

### Frontend

* **React 18**
* **Vite**
* **React Router**
* **Axios**
* **Lucide React**
* **EmailJS**
* CSS / CSS Variables

### Backend

* **Java 21**
* **Spring Boot 3.3.3**
* **Spring Web**
* **Spring Data JPA**
* **Hibernate**
* **Spring Security**
* **Jakarta Validation**
* **JWT**
* **Lombok**

### Database

* **MySQL** — production
* **H2** — development/testing

### DevOps

* Docker
* Docker Compose
* Nginx
* Maven

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      Portfolio       │
                    │       Visitor        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │      + Vite          │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │                      │
                    │ Controllers          │
                    │ Services             │
                    │ Repositories         │
                    │ Security / JWT       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Database       │
                    │    MySQL / H2        │
                    └──────────────────────┘


              Admin
                │
                ▼
       ┌──────────────────┐
       │ Admin Login      │
       └────────┬─────────┘
                │
             JWT Auth
                │
                ▼
       ┌──────────────────┐
       │ Admin Dashboard  │
       │                  │
       │ CRUD Operations  │
       │ Messages         │
       │ Profile          │
       │ Settings         │
       └──────────────────┘
```

---

## 📂 Project Structure

```text
Neha-portfolio/
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── sections/
│   │   │   └── admin/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext
│   │   │   ├── ThemeContext
│   │   │   └── ToastContext
│   │   │
│   │   ├── pages/
│   │   │   ├── Home
│   │   │   ├── AdminLogin
│   │   │   ├── AdminDashboard
│   │   │   ├── AdminProjects
│   │   │   ├── AdminSkills
│   │   │   ├── AdminExperience
│   │   │   ├── AdminEducation
│   │   │   ├── AdminCertifications
│   │   │   ├── AdminAchievements
│   │   │   ├── AdminCodingProfiles
│   │   │   ├── AdminMessages
│   │   │   └── AdminSettings
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── portfolioService.js
│   │   │   └── adminService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/
│   ├── src/main/java/com/portfolio/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   │
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── application-dev.yml
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have:

* Java 21
* Maven 3.9+
* Node.js 18+
* npm
* MySQL 8+ or Docker
* Git

---

## 🔹 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Neha-portfolio-main
```

---

## 🔹 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install/build the project:

```bash
mvn clean install
```

Configure the required environment variables.

Example:

```env
DB_URL=jdbc:mysql://localhost:3306/portfolio_db
DB_USERNAME=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRATION_MS=86400000

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
ADMIN_EMAIL=your_email
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend API:

```text
http://localhost:8080
```

---

## 🔹 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🐳 Docker Setup

The project also supports containerized development.

From the project root:

```bash
docker compose up --build
```

This starts the required application services through Docker Compose.

To stop the containers:

```bash
docker compose down
```

---

## 🔐 Admin Dashboard

The portfolio contains a separate protected administration panel.

```text
/admin/login
```

After successful authentication, the admin can manage the portfolio through the dashboard.

### Admin Modules

```text
Dashboard
│
├── Profile
├── Projects
├── Skills
├── Experience
├── Education
├── Certifications
├── Achievements
├── Coding Profiles
├── Messages
└── Settings
```

Changes made through the CMS are persisted through the backend API and database.

---

## 🔑 Authentication Flow

Authentication is implemented using JWT.

```text
Admin
  │
  ▼
Login
  │
  ▼
POST /api/auth/login
  │
  ▼
Spring Security
  │
  ▼
JWT Token
  │
  ▼
Frontend stores authentication state
  │
  ▼
Axios attaches Bearer Token
  │
  ▼
Protected /api/admin/** endpoints
```

The backend validates the JWT before allowing access to protected resources.

---

## 📡 API Overview

### Public APIs

```text
GET    /api/profile
GET    /api/skills
GET    /api/skills/category/{category}
GET    /api/experience
GET    /api/projects
GET    /api/projects/featured
GET    /api/projects/{slug}
GET    /api/education
GET    /api/certifications
GET    /api/achievements
GET    /api/coding-profiles
POST   /api/contact
```

### Authentication

```text
POST   /api/auth/login
POST   /api/auth/change-password
```

### Admin APIs

```text
GET/PUT       /api/admin/profile

POST/PUT/DELETE
              /api/admin/projects

POST/PUT/DELETE
              /api/admin/skills

POST/PUT/DELETE
              /api/admin/experience

POST/PUT/DELETE
              /api/admin/education

POST/PUT/DELETE
              /api/admin/certifications

POST/PUT/DELETE
              /api/admin/achievements

POST/PUT/DELETE
              /api/admin/coding-profiles

GET           /api/admin/messages
PUT           /api/admin/messages/{id}/status

GET           /api/admin/dashboard
```

---

## 📧 Contact System

The portfolio includes a contact workflow that allows visitors to submit messages.

The system supports:

* Contact form validation
* Backend message persistence
* Admin message management
* Message status updates
* EmailJS integration for email delivery/configuration

---

## 🎨 Design Philosophy

The UI follows a clean editorial-style design with a focus on readability and content.

### Design principles

* Minimal visual noise
* Strong typography
* Responsive layouts
* Consistent spacing
* Solid colors
* Clear hierarchy
* Light and dark themes
* Subtle transitions
* Mobile-friendly experience

The portfolio intentionally avoids unnecessary visual effects in favor of a professional developer-focused presentation.

---

## 🔒 Security

Security considerations implemented in the project include:

* JWT authentication
* BCrypt password hashing
* Stateless authentication
* Protected admin endpoints
* Protected frontend admin routes
* CORS configuration
* Jakarta request validation
* Centralized exception handling
* Environment-based configuration
* No hardcoded production credentials

**Never commit `.env` files, database credentials, JWT secrets, or other sensitive configuration to the repository.**

---

## 📱 Responsive Design

The portfolio is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The frontend uses responsive layouts and reusable components to maintain consistency across screen sizes.

---

## 📌 Key Engineering Concepts Demonstrated

This project demonstrates practical implementation of:

* Full-stack application architecture
* REST API development
* React component architecture
* Spring Boot backend development
* Spring Data JPA
* Database persistence
* JWT authentication
* Spring Security
* CRUD operations
* DTO-based API design
* Global exception handling
* Input validation
* CORS
* File uploads
* Frontend-backend integration
* Docker containerization
* Environment-based configuration
* Responsive UI development

---

## 🔮 Future Improvements

Potential future additions include:

* AI-powered portfolio assistant
* RAG-based portfolio Q&A
* Voice-enabled portfolio interaction
* AI project recommendation system
* GitHub activity integration
* Automated deployment pipeline
* Portfolio analytics
* Improved admin analytics
* AI-powered resume/job matching

---

## 👩‍💻 About

Built and maintained by **Neha**, an AI Engineer interested in building practical AI systems and full-stack applications.

My primary areas of interest include:

**Generative AI • Agentic AI • Conversational AI • LLM Applications • AI Agents • Full-Stack Engineering**

---

## 📬 Connect

* **GitHub:** `<(https://github.com/22bcs16876-Neha)>`
* **LinkedIn:** `<(https://www.linkedin.com/in/neha-k-nandini/)>`
* **Email:** `<(nehakumarinandini@gmail.com)>`

---

## ⭐ If You Like This Project

If you find the project useful or interesting, consider giving the repository a ⭐.
