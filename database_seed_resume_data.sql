-- ============================================================================
-- PORTFOLIO DATABASE SEED SCRIPT: AMIT KUMAR RESUME DATA
-- Compatible with PostgreSQL, MySQL, and H2
-- Note: avatar_url is set to NULL as requested (no hardcoded profile picture)
-- ============================================================================

-- 1. CLEAN EXISTING DATA (Safe reload)
DELETE FROM coding_profiles;
DELETE FROM certifications;
DELETE FROM achievements;
DELETE FROM educations;
DELETE FROM experiences;
DELETE FROM skills;
DELETE FROM projects;
DELETE FROM profiles;

-- ============================================================================
-- 2. PROFILES TABLE (Amit Kumar Personal & Architecture Details)
-- ============================================================================
INSERT INTO profiles (
    full_name,
    title,
    tagline,
    role_badge,
    status_text,
    hero_tech_stack,
    bio,
    short_about,
    full_about,
    email,
    phone,
    location,
    avatar_url,
    resume_url,
    github_url,
    linkedin_url,
    leetcode_url,
    years_of_experience,
    projects_count,
    problems_solved_count,
    technologies_count,
    stat1_label,
    stat1_value,
    stat2_label,
    stat2_value,
    stat3_label,
    stat3_value,
    stat4_label,
    stat4_value,
    default_theme,
    hero_quote,
    triad1_title,
    triad1_spec,
    triad1_desc,
    triad2_title,
    triad2_spec,
    triad2_desc,
    triad3_title,
    triad3_spec,
    triad3_desc,
    in_focus_title,
    in_focus_description,
    in_focus_metric1_value,
    in_focus_metric1_label,
    in_focus_metric2_value,
    in_focus_metric2_label,
    in_focus_metric3_value,
    in_focus_metric3_label,
    dev_corner_capabilities,
    engineering_principles,
    about_location_line,
    footer_heading,
    footer_subheading
) VALUES (
    'Amit Kumar',
    'Software Developer | Core Java, Spring Boot & Full-Stack',
    'Building multi-tier web applications and database-driven solutions with Core Java, Spring Boot, and modern full-stack technologies.',
    'Software Developer',
    'Open to Opportunities',
    'Core Java, Spring Boot, MySQL, React.js, Docker, REST APIs, Hibernate',
    'Aspiring Software Developer with strong foundations in Core Java, Data Structures & Algorithms, SQL, Spring Boot, REST APIs, JDBC, Hibernate (JPA), Servlets, and JSP. Experienced in developing multi-tier web applications and database-driven solutions. Familiar with PL/SQL, Agile/Scrum, Maven, Git, Docker, and CI/CD basics, with strong problem-solving and debugging skills.',
    'Aspiring Software Developer with strong foundations in Core Java, Data Structures & Algorithms, SQL, Spring Boot, REST APIs, JDBC, Hibernate (JPA), Servlets, and JSP.',
    'I am passionate about architecting multi-tier enterprise web applications and database-driven solutions. With strong competence across Core Java, Spring Boot, Hibernate (JPA), and relational database design, I build secure RESTful services and responsive user experiences. Familiar with Agile/Scrum, Docker, CI/CD, and system design fundamentals.',
    'amitkr9523da@gmail.com',
    '+91 9523974130',
    'Mohali, Punjab / Gaya, Bihar, India',
    NULL,
    NULL,
    'https://github.com/AmitKumar9430',
    'https://www.linkedin.com/in/amit-kumar-9t5m2i3a/',
    'https://leetcode.com',
    1,
    3,
    370,
    20,
    'B.E. CGPA',
    '8.48',
    'Problems Solved',
    '370+',
    'Projects Built',
    '3+',
    'AINCAT 2026',
    'AIR 377',
    'dark',
    'Building multi-tier web applications and database-driven solutions with Core Java, Spring Boot, and modern full-stack technologies.',
    'Backend Architecture',
    'Java • Spring Boot • Hibernate (JPA) • JDBC • REST APIs',
    'Developing multi-tier web applications, robust REST APIs, Servlets, JSP, and MVC architectures.',
    'Database & Persistence',
    'SQL • MySQL • PL/SQL • ACID Transactions',
    'Relational schema design, normalization, ACID transactions, and robust data persistence.',
    'Web & DevOps',
    'React.js • JavaScript • Git • Docker • CI/CD',
    'Modern responsive web interfaces, version control with Git/GitHub, containerization, and deployment pipelines.',
    'Smart Civic Management & Full-Stack Platform Engineering',
    'Architected multi-tier platforms with React.js, Spring Boot, and MySQL, implementing role-based workflows, REST APIs, and database operations.',
    'AIR 377',
    'AINCAT 2026 Rank',
    '8.48',
    'B.E. CSE CGPA',
    '370+',
    'DSA Problems Solved',
    '[{"id":"01","title":"Multi-Tier Web Applications & Enterprise MVC","spec":"Core Java • Servlets • JSP • Spring Boot • Architecture Patterns","targetId":"projects"},{"id":"02","title":"Relational Data Modeling & ACID Transactions","spec":"SQL • MySQL • PL/SQL • Hibernate (JPA) • JDBC","targetId":"skills"},{"id":"03","title":"RESTful API Architecture & Secure Service Endpoints","spec":"Spring Boot • REST APIs • JSON • Postman • Stateless Auth","targetId":"projects"},{"id":"04","title":"Data Structures, Algorithms & Problem Solving","spec":"370+ Solved • LeetCode • Code360 • Complexity Analysis","targetId":"skills"},{"id":"05","title":"Modern Frontend Integration & Responsive UX","spec":"React.js • JavaScript • HTML5/CSS3 • Component Architecture","targetId":"projects"},{"id":"06","title":"Containerization, Build Automation & Agile Delivery","spec":"Docker • Maven • Git/GitHub • CI/CD Basics • Agile/Scrum","targetId":"skills"}]',
    '[{"title":"Clean, Maintainable Object-Oriented Design","detail":"Adhering to OOP principles, MVC architecture, and separation of concerns to write readable, testable, and maintainable software."},{"title":"Robust Data Integrity & Transactional Consistency","detail":"Relational database design, normalization, ACID transaction boundaries, and efficient schema modeling with SQL and Hibernate."},{"title":"Strong Algorithmic & Analytical Foundations","detail":"Approaching problem-solving with 370+ data structures and algorithm challenges solved, analyzing time and space complexity."},{"title":"Continuous Learning & Modern Engineering Practices","detail":"Committed to continuous growth across backend microservices, containerization with Docker, and automated CI/CD workflows."}]',
    'Based in Mohali, Punjab & Gaya, Bihar, India',
    'Building multi-tier web applications and database-driven solutions.',
    'Open to Software Developer positions, backend engineering opportunities, and full-stack challenges.'
);

-- ============================================================================
-- 3. PROJECTS TABLE (3 Verified Projects)
-- ============================================================================
INSERT INTO projects (title, slug, short_description, full_description, problem_solved, features, technologies, github_url, live_url, image_url, is_featured, display_order)
VALUES
(
    'Nagar Seva – Smart Civic Management Platform',
    'nagar-seva-smart-civic-management',
    'Built a platform for citizens to report and track civic issues, including waste management complaints.',
    'Architected a smart civic management platform for citizen engagement and municipal accountability. Citizens can report and monitor civic issues with live status tracking. Built robust Spring Boot REST APIs, role-based workflows for municipal authorities, and transactional MySQL data operations.',
    'Eliminated opaque civic grievance tracking by providing a transparent, role-based ticket lifecycle from complaint registration to resolution.',
    'Built a platform for citizens to report and track civic issues, including waste management complaints
Implemented REST APIs, role-based workflows, and complaint tracking using MySQL
Interactive React.js user dashboard with real-time status filtering
Role-based authorization and municipal admin workflow coordination',
    'React.js, Spring Boot, MySQL, REST APIs, Java',
    'https://github.com/AmitKumar9430',
    'https://github.com/AmitKumar9430',
    '/uploads/Screenshot_2026-09-06_141840-763a5e66.png',
    TRUE,
    1
),
(
    'Apnaa Mandi – Farmer-to-Marketplace Platform',
    'apnaa-mandi-farmer-to-marketplace',
    'Built a multi-stakeholder platform connecting farmers, buyers, transport providers, and Mandi Village Mitras.',
    'Architected a decentralized agricultural marketplace bridging agricultural producers directly with buyers and logistics partners. Features role-specific workflows for farmers, buyers, transport vendors, and Mandi Village Mitras, backed by resilient transactional REST APIs and Dockerized container architecture.',
    'Directly connected farmers to buyers and transporters to minimize middlemen overhead and provide transparent pricing.',
    'Built a multi-stakeholder platform connecting farmers, buyers, transport providers, and Mandi Village Mitras
Developed role-based workflows, REST APIs, and database operations for services and transactions
Docker containerized architecture for reliable environment parity
ACID-compliant transaction logging and financial ledger records',
    'React.js, Spring Boot, MySQL, Docker, AI, REST APIs, Java',
    'https://github.com/AmitKumar9430',
    'https://github.com/AmitKumar9430',
    '/projects/project-ecommerce.svg',
    TRUE,
    2
),
(
    'CuSphere – Student Collaboration Platform',
    'cusphere-student-collaboration',
    'Built a student platform for sharing projects, resources, and academic opportunities, adopted by 500+ students.',
    'Developed a comprehensive student collaboration platform facilitating peer-to-peer resource sharing, project matchmaking, and academic opportunity dissemination. Adopted by over 500 students at Chandigarh University.',
    'Centralized fragmented student project groups and academic study resources into a single verified campus ecosystem.',
    'Built a student platform for sharing projects, resources, and academic opportunities, adopted by 500+ students
Developed REST APIs, authentication, and database operations for platform functionality
Search and discovery engine for collaborative academic projects
Interactive resource repository and real-time opportunity board',
    'React.js, Node JS, MySQL, REST APIs, Express',
    'https://github.com/AmitKumar9430',
    'https://github.com/AmitKumar9430',
    '/uploads/feedback-center-51256e44.png',
    TRUE,
    3
);

-- ============================================================================
-- 4. SKILLS TABLE (28 Categorized Technical Proficiencies)
-- ============================================================================
INSERT INTO skills (name, category, proficiency, icon_name, display_order)
VALUES
('Core Java', 'PROGRAMMING', 'ADVANCED', 'Code', 1),
('Data Structures & Algorithms', 'PROGRAMMING', 'ADVANCED', 'Cpu', 2),
('Object-Oriented Programming', 'PROGRAMMING', 'ADVANCED', 'Layers', 3),
('Spring Boot', 'BACKEND', 'ADVANCED', 'Server', 4),
('REST APIs', 'BACKEND', 'ADVANCED', 'Terminal', 5),
('Hibernate (JPA)', 'BACKEND', 'ADVANCED', 'Database', 6),
('JDBC', 'BACKEND', 'PROFICIENT', 'Database', 7),
('Servlets & JSP', 'BACKEND', 'PROFICIENT', 'Server', 8),
('MVC & Multi-Tier Architecture', 'BACKEND', 'PROFICIENT', 'Layers', 9),
('SQL', 'DATABASE', 'ADVANCED', 'Database', 10),
('MySQL', 'DATABASE', 'ADVANCED', 'Database', 11),
('PL/SQL', 'DATABASE', 'PROFICIENT', 'Database', 12),
('ACID Transactions', 'DATABASE', 'ADVANCED', 'Database', 13),
('Database Design', 'DATABASE', 'ADVANCED', 'Database', 14),
('React.js', 'FRONTEND', 'PROFICIENT', 'Layout', 15),
('JavaScript', 'FRONTEND', 'PROFICIENT', 'Code', 16),
('HTML & CSS', 'FRONTEND', 'PROFICIENT', 'Layout', 17),
('Git & GitHub', 'TOOLS', 'ADVANCED', 'GitBranch', 18),
('Maven', 'TOOLS', 'ADVANCED', 'Terminal', 19),
('Apache Tomcat', 'TOOLS', 'PROFICIENT', 'Server', 20),
('Docker (Basic)', 'DEVOPS', 'FAMILIAR', 'Server', 21),
('CI/CD Basics', 'DEVOPS', 'FAMILIAR', 'GitBranch', 22),
('AWS EC2 & S3 (Basic)', 'DEVOPS', 'FAMILIAR', 'Cloud', 23),
('DBMS', 'TOOLS', 'ADVANCED', 'Database', 24),
('Operating Systems', 'TOOLS', 'PROFICIENT', 'Cpu', 25),
('Computer Networks', 'TOOLS', 'PROFICIENT', 'Globe', 26),
('System Design', 'TOOLS', 'PROFICIENT', 'Layers', 27),
('Agile, Scrum & SDLC', 'TOOLS', 'PROFICIENT', 'Layers', 28);

-- ============================================================================
-- 5. EXPERIENCES TABLE (2 Industry Engagements)
-- ============================================================================
INSERT INTO experiences (company, role, location, start_date, end_date, is_current, description, responsibilities, technologies, display_order)
VALUES
(
    'Bharat Space Education Research Centre',
    'Def-Space Winter Intern',
    'Remote / India',
    'Dec 2025',
    'Jan 2026',
    FALSE,
    'Explored advanced drone systems, robotics, rocketry, and space entrepreneurship concepts.',
    'Explored advanced drone systems, robotics, rocketry, and space entrepreneurship concepts.
Gained exposure to aerospace technologies, and real-world applications through hands-on learning.
Collaborated on simulation architectures and autonomous aerial navigation models.',
    'Robotics, Drone Systems, Rocketry, Autonomous Systems, Aerospace Tech',
    1
),
(
    'Intel',
    'Intern – AI for Future Workforce Program',
    'Remote / India',
    'Jun 2025',
    'Jul 2025',
    FALSE,
    'Gained exposure to data-driven problem-solving, and practical machine learning concepts.',
    'Gained exposure to data-driven problem-solving, and practical machine learning concepts.
Learned AI and ML fundamentals, model training workflows, and real-world data handling techniques.
Analyzed datasets, evaluated predictive models, and applied algorithmic principles.',
    'Machine Learning, Python, Model Training, Data Handling, AI Workflows',
    2
);

-- ============================================================================
-- 6. EDUCATIONS TABLE (Academic Qualifications)
-- ============================================================================
INSERT INTO educations (degree, institution, field_of_study, start_year, end_year, grade_or_cgpa, description, display_order)
VALUES
(
    'Bachelor of Engineering in Computer Science & Engineering',
    'Chandigarh University, Mohali, Punjab',
    'Computer Science & Engineering',
    '2023',
    '2027',
    'CGPA: 8.48',
    'Active Class Representative for 100+ students. Coursework in Core Java, DSA, DBMS, Operating Systems, Computer Networks, and System Design.',
    1
),
(
    'Intermediate',
    'Anugrah Memorial College, Gaya, Bihar',
    'Science',
    '2020',
    '2022',
    'Percentage: 83.40%',
    'Higher Secondary Education in Science stream with focus on Mathematics, Physics, and Chemistry.',
    2
),
(
    'Matriculation',
    'Al-Momin International School, Gaya, Bihar',
    'Secondary Education',
    '2019',
    '2020',
    'Percentage: 76.80%',
    'Secondary School Examination with strong foundation in Mathematics and Sciences.',
    3
);

-- ============================================================================
-- 7. ACHIEVEMENTS TABLE
-- ============================================================================
INSERT INTO achievements (title, category, event_or_org, achievement_date, description, display_order)
VALUES
(
    'AIR 377 in AINCAT 2026',
    'COMPETITION',
    'Naukri Campus',
    '2026',
    'AIR 377 in All India Naukri Campus Aptitude Test (AINCAT) 2026, conducted by Naukri Campus.',
    1
),
(
    'Class Representative (100+ Students)',
    'LEADERSHIP',
    'Chandigarh University',
    '2023 - Present',
    'Served as Class Representative for 100+ students at Chandigarh University, coordinating with faculty and students to resolve academic and administrative concerns.',
    2
),
(
    '370+ Coding Problems Solved',
    'TECHNICAL',
    'LeetCode & GeeksforGeeks',
    '2024 - Present',
    'Solved 370+ coding problems across LeetCode and GeeksforGeeks covering Data Structures, Algorithms, and problem-solving.',
    3
);

-- ============================================================================
-- 8. CERTIFICATIONS TABLE (7 Professional Credentials)
-- ============================================================================
INSERT INTO certifications (title, issuer, issue_date, display_order)
VALUES
('Spring Boot', 'Coursera', '2025', 1),
('Introduction to Hibernate', 'Coursera', '2025', 2),
('Advance Hibernate Techniques', 'Coursera', '2025', 3),
('Full Stack Developer', 'Infosys', '2025', 4),
('AWS Certified Solutions', 'Infosys', '2025', 5),
('Data Structures and Algorithms using Java', 'Infosys', '2024', 6),
('Database and SQL', 'Infosys', '2024', 7);

-- ============================================================================
-- 9. CODING_PROFILES TABLE (4 Developer Profiles)
-- ============================================================================
INSERT INTO coding_profiles (platform, username, profile_url, icon_name, display_order)
VALUES
('GitHub', 'AmitKumar9430', 'https://github.com/AmitKumar9430', 'Github', 1),
('LinkedIn', 'amit-kumar-9t5m2i3a', 'https://www.linkedin.com/in/amit-kumar-9t5m2i3a/', 'Linkedin', 2),
('LeetCode', 'amitkr9523da', 'https://leetcode.com', 'Code', 3),
('GeeksforGeeks', 'amitkr9523da', 'https://geeksforgeeks.org', 'Code', 4);
