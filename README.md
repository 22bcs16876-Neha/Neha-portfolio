# AI Engineer Portfolio

A modern, full-stack portfolio website showcasing my experience, projects, technical skills, and work in **Artificial Intelligence, Generative AI, Conversational AI, and Agentic AI**.

The portfolio is designed not just as a personal website, but as a representation of my hands-on experience building AI-powered applications and production-oriented software systems.

## 🌐 Live Portfolio

**Portfolio:** Add your deployed portfolio URL here

---

## 👩‍💻 About Me

I am an **AI Engineer** with a strong foundation in full-stack development and practical experience building AI-powered applications.

My work focuses on:

* Generative AI
* Agentic AI
* Conversational AI
* LLM-powered applications
* AI agents and workflows
* Google ADK
* Dialogflow CX
* Gemini
* Vertex AI
* Backend API development
* Full-stack application development

I enjoy building systems where AI is integrated with real-world applications rather than being limited to experimentation or model training alone.

---

## 🚀 Featured Projects

### 🛍️ Mr.Shop — AI Shopping Assistant

An AI-powered shopping assistant designed to provide intelligent product discovery and conversational shopping experiences.

**Key concepts:**

* Generative AI
* AI agents
* Conversational interaction
* Product discovery
* Intelligent recommendations
* Backend API integration

---

### 🏥 Enterprise Healthcare Voice Assistant

A conversational AI solution designed for healthcare use cases with a focus on natural voice-based interaction and workflow automation.

**Key concepts:**

* Conversational AI
* Voice AI
* Dialogflow CX
* Gemini
* Google Cloud
* Intent and entity recognition
* Conversational flows
* Enterprise AI workflows

---

### 🤖 Agentic AI Applications

Projects exploring the transition from traditional chatbot architectures to **agent-based AI systems** capable of reasoning, tool usage, workflow execution, and dynamic task handling.

**Technologies explored:**

* Google ADK
* Gemini
* LLMs
* Tool calling
* Multi-step workflows
* Agent orchestration
* Retrieval-Augmented Generation (RAG)

---

## 🧠 Technical Skills

### Artificial Intelligence

* Generative AI
* Large Language Models (LLMs)
* Agentic AI
* Conversational AI
* Prompt Engineering
* RAG
* AI Agents
* Tool Calling
* AI Workflow Orchestration

### Google AI & Cloud

* Google ADK
* Dialogflow CX
* Gemini
* Vertex AI
* Google Cloud Platform

### Programming

* Python
* Java
* JavaScript
* SQL

### Backend

* Spring Boot
* REST APIs
* JWT Authentication
* API Integration
* Database Design

### Frontend

* React
* JavaScript
* HTML
* CSS
* Responsive UI Development

### Databases

* PostgreSQL
* MySQL
* MongoDB

### Tools & Platforms

* Git
* GitHub
* Docker
* Postman
* VS Code
* IntelliJ IDEA

---

## 🏗️ Portfolio Architecture

The portfolio follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │       React         │
                    └──────────┬──────────┘
                               │
                               │ REST APIs
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │    Spring Boot      │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
             ┌─────────────┐      ┌─────────────┐
             │  Database   │      │     Auth    │
             │ PostgreSQL  │      │ JWT Security│
             └─────────────┘      └─────────────┘
```

The application separates the presentation layer, backend services, authentication, and data persistence to maintain a clean and scalable architecture.

---

## ✨ Features

### Portfolio

* Professional introduction
* About section
* Technical skills
* Experience
* Projects
* Education
* Contact section

### Project Showcase

Projects are presented with:

* Project descriptions
* Technologies used
* Key features
* Links to repositories/live applications

### Admin Management

The application includes an authenticated admin workflow for managing portfolio content.

Admin functionality can be used to manage dynamic portfolio information without modifying the frontend code manually.

### Authentication

The backend uses **JWT-based authentication** to secure protected endpoints and administrative functionality.

---

## 📁 Project Structure

```text
portfolio/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── ...
│
├── docker/
│
├── README.md
└── ...
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Java
* Maven
* PostgreSQL
* Git

---

## 🔧 Frontend Setup

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd portfolio
```

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the required environment variables:

```env
VITE_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Configure the application environment variables.

Example:

```env
DB_URL=jdbc:postgresql://localhost:5432/portfolio
DB_USERNAME=your_username
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
```

Build the backend:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

## 🔐 Environment Variables

Do not commit secrets or credentials to GitHub.

Example environment configuration:

```env
# Backend
DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

# Frontend
VITE_API_URL=
```

Add environment files to `.gitignore`:

```text
.env
.env.local
application-local.properties
```

---

## 🔑 Authentication Flow

The application uses JWT-based authentication for protected resources.

```text
User
  │
  ▼
Login
  │
  ▼
Backend Authentication
  │
  ▼
JWT Token
  │
  ▼
Frontend
  │
  ▼
Authenticated API Requests
  │
  ▼
Protected Backend Endpoints
```

This allows administrative functionality to remain protected while keeping the public portfolio accessible to visitors.

---

## 🐳 Docker

The application can also be containerized using Docker.

Build the required images:

```bash
docker build .
```

Run the containers using Docker Compose when configured:

```bash
docker compose up --build
```

---

## 📡 API

The backend exposes REST APIs for portfolio-related functionality.

Typical resources include:

```text
/api/auth
/api/projects
/api/skills
/api/experience
/api/education
/api/contact
```

Protected endpoints require valid authentication credentials.

---

## 🎯 Why I Built This

This project demonstrates my approach to building modern software systems by combining:

**AI + Backend + Frontend + Cloud + Security**

Rather than creating a static portfolio, I wanted to build a system that demonstrates real engineering concepts such as:

* REST API architecture
* Authentication and authorization
* Database integration
* Dynamic content management
* Frontend-backend communication
* Deployment
* Containerization
* Scalable application design

It also provides a central place to showcase my journey from traditional software development toward **Generative AI and Agentic AI engineering**.

---

## 🔮 Future Improvements

Planned improvements include:

* AI-powered portfolio assistant
* RAG-based project discovery
* Voice interaction
* Intelligent project recommendations
* Agentic portfolio assistant
* Analytics dashboard
* Improved CMS capabilities
* Automated deployment pipeline
* Enhanced observability and monitoring

---

## 📬 Contact

If you are interested in discussing **AI Engineering, Generative AI, Agentic AI, Conversational AI, or software engineering opportunities**, feel free to connect with me.

**LinkedIn:** Add your LinkedIn URL

**GitHub:** Add your GitHub URL

**Email:** Add your email

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is intended for personal portfolio and demonstration purposes.
