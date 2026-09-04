package com.portfolio.service;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataInitializerService implements ApplicationRunner {

    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final AchievementRepository achievementRepository;
    private final CodingProfileRepository codingProfileRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default-username:admin}")
    private String defaultAdminUsername;

    @Value("${admin.default-password:Admin@12345}")
    private String defaultAdminPassword;

    @Value("${admin.default-email:admin@example.com}")
    private String defaultAdminEmail;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        initAdminUser();
        initProfile();
        initSkills();
        initExperience();
        initProjects();
        initEducation();
        initCertifications();
        initAchievements();
        initCodingProfiles();
        log.info("Database initialization and verification completed successfully.");
    }

    private void initAdminUser() {
        if (adminUserRepository.count() == 0) {
            AdminUser admin = AdminUser.builder()
                    .username(defaultAdminUsername)
                    .email(defaultAdminEmail)
                    .passwordHash(passwordEncoder.encode(defaultAdminPassword))
                    .role("ROLE_ADMIN")
                    .build();
            adminUserRepository.save(admin);
            log.info("Initialized default admin account: {}", defaultAdminUsername);
        } else {
            adminUserRepository.findByUsername(defaultAdminUsername).ifPresent(admin -> {
                if (defaultAdminEmail != null && !defaultAdminEmail.equalsIgnoreCase(admin.getEmail())) {
                    admin.setEmail(defaultAdminEmail);
                    adminUserRepository.save(admin);
                    log.info("Updated default admin email to: {}", defaultAdminEmail);
                }
            });
        }
    }

    private void initProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = Profile.builder()
                    .fullName("Neha")
                    .title("AI Engineer — Conversational AI & LLM Systems")
                    .tagline("Conversational AI Engineer (ex-EXL Service) • Open to Work • Building multi-agent systems & RAG architectures")
                    .roleBadge("AI Engineer • Open to Work")
                    .statusText("Open to Work")
                    .heroTechStack("Python 3.11, LangChain, LlamaIndex, OpenAI / Claude, Pinecone, FastAPI, Docker, RAG")
                    .bio("I am a Conversational AI Engineer at EXL Service specializing in architecting domain-tuned virtual assistants, multi-agent workflows, and hallucination-guarded RAG pipelines for enterprise clients. I was at EXL Service, and now I am actively open to work.")
                    .shortAbout("I specialize in building intelligent conversational systems that understand context, preserve multi-turn dialogue history, and accurately execute enterprise business logic with sub-second response profiles. Having engineered enterprise conversational AI solutions at EXL Service, I am currently open to work and seeking high-impact AI engineering roles.")
                    .fullAbout("During my tenure at EXL Service, I built and scaled end-to-end Conversational AI systems that automated mission-critical customer workflows across insurance and financial domains. My daily engineering focused on LangChain/LangGraph agent architectures, hybrid dense-sparse vector retrieval with LlamaIndex, prompt defense pipelines, and production inference serving using FastAPI and Docker.\n\nI believe the true differentiator in enterprise AI is reliability: eliminating factual hallucinations with strict cited context, optimizing token streaming latencies, and implementing deterministic guardrails for unshakeable compliance. I am now actively open to work and looking to bring this production experience to forward-thinking AI teams.")
                    .email("neha.ai.engineer@gmail.com")
                    .phone("+91 98765 43210")
                    .location("Noida / Gurugram, India")
                    .avatarUrl("/uploads/Neh-7de322f8.jpeg")
                    .resumeUrl("/uploads/Amit__23BCS12621__3_-6e4cfaa1.pdf")
                    .githubUrl("https://github.com")
                    .linkedinUrl("https://linkedin.com")
                    .leetcodeUrl("https://leetcode.com")
                    .yearsOfExperience(2)
                    .projectsCount(4)
                    .problemsSolvedCount(380)
                    .technologiesCount(21)
                    .stat1Label("Years in AI Engineering")
                    .stat1Value("2+")
                    .stat2Label("AI Agents Deployed")
                    .stat2Value("6+")
                    .stat3Label("Conversations Handled")
                    .stat3Value("1.5M+")
                    .stat4Label("Intent Recognition Accuracy")
                    .stat4Value("97.4%")
                    .defaultTheme("light")
                    .heroQuote("Architecting resilient, contextual conversational AI agents with sub-500ms first-token latency and zero-hallucination guardrails.")
                    .triad1Title("Conversational NLU & Agents")
                    .triad1Spec("LangChain • LangGraph • Multi-Agent")
                    .triad1Desc("Designing multi-turn dialogue state tracking, slot-filling pipelines, intent recognition models, and autonomous tool-calling agents.")
                    .triad2Title("RAG & Semantic Retrieval")
                    .triad2Spec("LlamaIndex • Pinecone • Hybrid Search")
                    .triad2Desc("Engineering hallucination-resistant RAG engines with semantic chunking, cross-encoder reranking, and sub-second vector search across enterprise knowledge bases.")
                    .triad3Title("LLMOps & High-Scale Serving")
                    .triad3Spec("FastAPI • Docker • NeMo Guardrails")
                    .triad3Desc("Serving high-concurrency streaming inference endpoints, prompt injection defenses, continuous evaluation benchmarks (Ragas), and token caching.")
                    .inFocusTitle("In-Focus Architecture: Multi-Agent Enterprise Conversational Orchestrator")
                    .inFocusDescription("Comprehensive architectural deep-dive into multi-turn dialogue state management, hybrid BM25 + dense vector retrieval, deterministic tool routing, and streaming token delivery with strict PII guardrails.")
                    .inFocusMetric1Label("Time To First Token")
                    .inFocusMetric1Value("< 420ms")
                    .inFocusMetric2Label("Factual Accuracy Rate")
                    .inFocusMetric2Value("98.2%")
                    .inFocusMetric3Label("Dialogue Context Retention")
                    .inFocusMetric3Value("15+ Turns")
                    .devCornerCapabilities("Multi-Turn Dialogue Orchestration | LangChain • LangGraph • State Machines | #projects\nEnterprise RAG Pipelines | LlamaIndex • Chroma • Pinecone • Hybrid Search | #skills\nIntent Classification & Slot Filling | BERT • spaCy • Transformers • NLU | #skills\nPrompt Defense & Guardrails | NeMo Guardrails • Few-Shot • PII Masking | #projects\nLLM Evaluation & Observability | Ragas • TruLens • LangSmith • Tracing | #skills\nStreaming Model Serving | FastAPI • Python • Docker • WebSockets | #experience")
                    .engineeringPrinciples("Grounded in Truth, Zero Hallucinations | Every generative output must be grounded with cited context from trusted vector stores and validated by strict hallucination guards.\nSpeed to First Token Matters | Great conversational experiences require sub-500ms time-to-first-token (TTFT) via streaming WebSocket architectures and token pruning.\nDefensive Guardrails & PII Protection | Never let raw user prompts touch downstream models without sanitization, prompt injection defenses, and strict PII redaction.\nDeterministic Fallbacks for Ambiguity | When confidence drops below threshold, conversational agents must fail gracefully to deterministic menus or human escalation.")
                    .aboutLocationLine("Based in NCR (Noida / Gurugram), India — ex-EXL Service, actively open to work for AI Engineer & Conversational AI roles.")
                    .footerHeading("Let's Build Contextual Conversational Systems")
                    .footerSubheading("Actively Open to Work: Available immediately for Conversational AI engineering roles, agentic LLM development, and enterprise GenAI systems.")
                    .build();
            profileRepository.save(profile);
            log.info("Initialized default Profile data for Neha");
        }
    }

    private void initSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = Arrays.asList(
                    // NLP & LLMS
                    Skill.builder().name("Large Language Models (LLMs)").category("NLP & LLMS").proficiency("ADVANCED").iconName("cpu").displayOrder(1).build(),
                    Skill.builder().name("LangChain & LangGraph").category("NLP & LLMS").proficiency("ADVANCED").iconName("layers").displayOrder(2).build(),
                    Skill.builder().name("LlamaIndex").category("NLP & LLMS").proficiency("ADVANCED").iconName("database").displayOrder(3).build(),
                    Skill.builder().name("Retrieval-Augmented Gen (RAG)").category("NLP & LLMS").proficiency("ADVANCED").iconName("server").displayOrder(4).build(),
                    Skill.builder().name("Prompt Engineering & Few-Shot").category("NLP & LLMS").proficiency("ADVANCED").iconName("terminal").displayOrder(5).build(),
                    Skill.builder().name("Intent Classification (spaCy/BERT)").category("NLP & LLMS").proficiency("ADVANCED").iconName("code").displayOrder(6).build(),
                    Skill.builder().name("Hugging Face Transformers").category("NLP & LLMS").proficiency("PROFICIENT").iconName("cpu").displayOrder(7).build(),

                    // VECTOR STORES
                    Skill.builder().name("Pinecone Vector DB").category("VECTOR STORES").proficiency("ADVANCED").iconName("database").displayOrder(8).build(),
                    Skill.builder().name("ChromaDB").category("VECTOR STORES").proficiency("ADVANCED").iconName("database").displayOrder(9).build(),
                    Skill.builder().name("PostgreSQL & pgvector").category("VECTOR STORES").proficiency("ADVANCED").iconName("database").displayOrder(10).build(),
                    Skill.builder().name("Redis Semantic Caching").category("VECTOR STORES").proficiency("PROFICIENT").iconName("database").displayOrder(11).build(),

                    // ENGINEERING
                    Skill.builder().name("Python 3.11+").category("ENGINEERING").proficiency("ADVANCED").iconName("code").displayOrder(12).build(),
                    Skill.builder().name("FastAPI & AsyncIO").category("ENGINEERING").proficiency("ADVANCED").iconName("server").displayOrder(13).build(),
                    Skill.builder().name("Streaming WebSockets").category("ENGINEERING").proficiency("ADVANCED").iconName("server").displayOrder(14).build(),
                    Skill.builder().name("RESTful APIs").category("ENGINEERING").proficiency("ADVANCED").iconName("server").displayOrder(15).build(),

                    // LLMOPS
                    Skill.builder().name("NeMo Guardrails & Safety").category("LLMOPS").proficiency("ADVANCED").iconName("shield").displayOrder(16).build(),
                    Skill.builder().name("LLM Evaluation (Ragas / TruLens)").category("LLMOPS").proficiency("ADVANCED").iconName("award").displayOrder(17).build(),
                    Skill.builder().name("LangSmith Observability").category("LLMOPS").proficiency("ADVANCED").iconName("terminal").displayOrder(18).build(),
                    Skill.builder().name("Docker & Containerization").category("LLMOPS").proficiency("ADVANCED").iconName("terminal").displayOrder(19).build(),
                    Skill.builder().name("Fine-Tuning (PEFT / LoRA)").category("LLMOPS").proficiency("PROFICIENT").iconName("cpu").displayOrder(20).build(),
                    Skill.builder().name("Git & CI/CD Pipelines").category("LLMOPS").proficiency("ADVANCED").iconName("git-branch").displayOrder(21).build()
            );
            skillRepository.saveAll(skills);
            log.info("Initialized default AI Skills data");
        }
    }

    private void initExperience() {
        if (experienceRepository.count() == 0) {
            // STRICTLY ONE EXPERIENCE: At EXL Service as AI Engineer — Conversational AI
            List<Experience> experiences = List.of(
                    Experience.builder()
                            .company("EXL Service")
                            .role("AI Engineer — Conversational AI")
                            .location("Noida, India")
                            .startDate("Jul 2023")
                            .endDate("2024")
                            .isCurrent(false)
                            .description("Spearheading the design, deployment, and optimization of enterprise Conversational AI virtual assistants, RAG pipelines, and LLM-powered customer engagement workflows.")
                            .responsibilities("Architected and deployed multi-turn Conversational AI virtual assistants for Fortune 500 insurance and banking clients using LangChain, LangGraph, and Python.\n" +
                                    "Built production RAG pipelines indexing 100,000+ policy documents using LlamaIndex and Pinecone vector databases, increasing query accuracy to 97.4%.\n" +
                                    "Fine-tuned domain-specific intent classification and slot-filling models using Transformers and spaCy, reducing fallback escalation rates by 38%.\n" +
                                    "Engineered streaming FastAPI WebSocket services, cutting Time-To-First-Token (TTFT) response latency from 1.4s to under 420ms.\n" +
                                    "Implemented enterprise guardrails with NeMo Guardrails and LangSmith for prompt injection mitigation, toxic content filtering, and factuality evaluation.")
                            .technologies("Python, LangChain, LangGraph, LlamaIndex, OpenAI, Pinecone, FastAPI, Docker, Transformers, NLP, RAG")
                            .displayOrder(1)
                            .build()
            );
            experienceRepository.saveAll(experiences);
            log.info("Initialized default single Experience at EXL Service");
        }
    }

    private void initProjects() {
        if (projectRepository.count() == 0) {
            List<Project> projects = Arrays.asList(
                    Project.builder()
                            .title("Enterprise Multi-Agent Conversational Assistant")
                            .slug("enterprise-multi-agent-assistant")
                            .shortDescription("Autonomous multi-agent dialogue system using LangGraph and GPT-4o with deterministic tool-calling, conversational memory, and human-in-the-loop escalation.")
                            .fullDescription("Designed and deployed an enterprise multi-agent conversational system using LangGraph, Python, and FastAPI. Enables complex multi-turn problem resolution for insurance policyholders, seamlessly routing queries between underwriting, claim-status, and billing agents.")
                            .problemSolved("Replaced rigid decision-tree bots with adaptive LLM agents, cutting call escalations by 35% while upholding strict financial compliance.")
                            .features("Multi-turn dialogue state tracking\nDeterministic tool calling & API integration\nPII redaction and NeMo guardrails\nStreaming WebSocket token delivery")
                            .technologies("Python, LangGraph, GPT-4o, FastAPI, Redis, Docker")
                            .githubUrl("https://github.com")
                            .liveUrl("https://github.com")
                            .imageUrl("/uploads/photo-1551288049-bebda4e38f71.jpg")
                            .isFeatured(true)
                            .displayOrder(1)
                            .build(),

                    Project.builder()
                            .title("Contextual Enterprise RAG Knowledge Engine")
                            .slug("contextual-enterprise-rag-knowledge-engine")
                            .shortDescription("Hallucination-resilient document Q&A engine indexing 50,000+ policy PDFs with semantic chunking, Cohere reranking, and Pinecone hybrid search.")
                            .fullDescription("Engineered an end-to-end RAG architecture with LlamaIndex and Pinecone. Implemented sentence-window retrieval, cross-encoder reranking, and automated verification loops that cite exact document source sections.")
                            .problemSolved("Eliminated hallucinated answers in policy interpretations, delivering verifiable answers with 97.4% factual accuracy.")
                            .features("Hybrid BM25 + dense vector semantic search\nCross-encoder reranking with Cohere\nAutomated citation generation\nMetadata filtering by product line & jurisdiction")
                            .technologies("Python, LlamaIndex, Pinecone, Cohere Rerank, FastAPI")
                            .githubUrl("https://github.com")
                            .liveUrl("https://github.com")
                            .imageUrl("/uploads/photo-1555066931-4365d14bab8c.jpg")
                            .isFeatured(true)
                            .displayOrder(2)
                            .build(),

                    Project.builder()
                            .title("Real-Time Voice-to-Voice AI Customer Agent")
                            .slug("real-time-voice-to-voice-agent")
                            .shortDescription("Ultra-low-latency voice conversational agent integrating Whisper speech-to-text, streaming LLM inference, and ElevenLabs voice synthesis with sub-600ms latency.")
                            .fullDescription("Built an asynchronous voice agent capable of natural bi-directional conversation over WebSockets. Employs Voice Activity Detection (VAD) and interruption handling for fluid human-like customer service dialogues.")
                            .problemSolved("Achieved human-parity conversation flow without awkward turn delays via concurrent audio chunk processing.")
                            .features("Streaming speech-to-text with Whisper\nInterruption handling and barge-in detection\nLow-latency audio streaming over WebSockets\nContext preservation across voice turns")
                            .technologies("Python, WebSockets, Whisper, OpenAI, ElevenLabs, asyncio")
                            .githubUrl("https://github.com")
                            .liveUrl("https://github.com")
                            .imageUrl("/uploads/photo-1518770660439-4636190af475.jpg")
                            .isFeatured(true)
                            .displayOrder(3)
                            .build(),

                    Project.builder()
                            .title("LLM Evaluation & Guardrails Benchmark Harness")
                            .slug("llm-evaluation-guardrails-harness")
                            .shortDescription("Automated test harness for monitoring conversational drift, prompt injection vulnerabilities, factual correctness, and token latency metrics.")
                            .fullDescription("Developed an observability and evaluation framework for LLM agents using Ragas, TruLens, and LangSmith. Automatically grades agent responses against ground truth test sets across faithfulness, answer relevance, and context recall.")
                            .problemSolved("Prevents regression in conversational accuracy during prompt revisions and model updates before deploying to production.")
                            .features("Continuous CI/CD prompt evaluation\nAutomated red-teaming for prompt injection\nLatency & token cost telemetry\nInteractive performance dashboard")
                            .technologies("Python, Ragas, TruLens, Docker, PostgreSQL")
                            .githubUrl("https://github.com")
                            .liveUrl("https://github.com")
                            .imageUrl("/uploads/photo-1460925895917-afdab827c52f.jpg")
                            .isFeatured(true)
                            .displayOrder(4)
                            .build()
            );
            projectRepository.saveAll(projects);
            log.info("Initialized default Conversational AI Projects");
        }
    }

    private void initEducation() {
        if (educationRepository.count() == 0) {
            List<Education> educations = List.of(
                    Education.builder()
                            .degree("Bachelor of Technology (B.Tech)")
                            .institution("National Institute of Technology")
                            .fieldOfStudy("Computer Science & Artificial Intelligence")
                            .startYear("2019")
                            .endYear("2023")
                            .gradeOrCgpa("8.8 / 10.0 CGPA")
                            .description("Specialized in Artificial Intelligence, Natural Language Processing, Deep Learning, and Distributed Computing Systems. Capstone project: Multi-Agent Conversational Recommendation System.")
                            .displayOrder(1)
                            .build()
            );
            educationRepository.saveAll(educations);
            log.info("Initialized default Education data");
        }
    }

    private void initCertifications() {
        if (certificationRepository.count() == 0) {
            List<Certification> certifications = Arrays.asList(
                    Certification.builder()
                            .title("DeepLearning.AI: LangChain for LLM Application Development")
                            .issuer("DeepLearning.AI")
                            .issueDate("Jan 2024")
                            .credentialId("DL-LANGCHAIN-8824")
                            .credentialUrl("https://deeplearning.ai")
                            .imageUrl("")
                            .displayOrder(1)
                            .build(),

                    Certification.builder()
                            .title("Microsoft Certified: Azure AI Engineer Associate")
                            .issuer("Microsoft")
                            .issueDate("Nov 2023")
                            .credentialId("MSFT-AZ-AI-9021")
                            .credentialUrl("https://learn.microsoft.com")
                            .imageUrl("")
                            .displayOrder(2)
                            .build(),

                    Certification.builder()
                            .title("Databricks Generative AI Fundamentals")
                            .issuer("Databricks")
                            .issueDate("Aug 2023")
                            .credentialId("DB-GENAI-4412")
                            .credentialUrl("https://credentials.databricks.com")
                            .imageUrl("")
                            .displayOrder(3)
                            .build()
            );
            certificationRepository.saveAll(certifications);
            log.info("Initialized default Certifications data");
        }
    }

    private void initAchievements() {
        if (achievementRepository.count() == 0) {
            List<Achievement> achievements = Arrays.asList(
                    Achievement.builder()
                            .title("EXL Outstanding Innovation Award — Conversational AI")
                            .category("RECOGNITION")
                            .eventOrOrg("EXL Service")
                            .achievementDate("2024")
                            .description("Recognized for architecting an intelligent virtual assistant that reduced call center agent handling time by 35% across 200,000+ enterprise customer inquiries.")
                            .displayOrder(1)
                            .build(),

                    Achievement.builder()
                            .title("Kaggle NLP Challenge — Top 5% Global Rank")
                            .category("COMPETITION")
                            .eventOrOrg("Kaggle Community")
                            .achievementDate("2023")
                            .description("Engineered transformer ensembles for conversational semantic similarity, zero-shot classification, and multi-class intent prediction.")
                            .displayOrder(2)
                            .build(),

                    Achievement.builder()
                            .title("Open-Source LLM Benchmark Contributor")
                            .category("OPEN_SOURCE")
                            .eventOrOrg("Open-Source Community")
                            .achievementDate("2024")
                            .description("Authored evaluation datasets and prompt templates for open-source dialogue safety, prompt injection defenses, and RAG factuality benchmarks.")
                            .displayOrder(3)
                            .build()
            );
            achievementRepository.saveAll(achievements);
            log.info("Initialized default Achievements data");
        }
    }

    private void initCodingProfiles() {
        if (codingProfileRepository.count() == 0) {
            List<CodingProfile> profiles = Arrays.asList(
                    CodingProfile.builder().platform("GitHub").username("neha-ai-dev").profileUrl("https://github.com").iconName("Github").displayOrder(1).build(),
                    CodingProfile.builder().platform("LinkedIn").username("neha-conversational-ai").profileUrl("https://linkedin.com").iconName("Linkedin").displayOrder(2).build(),
                    CodingProfile.builder().platform("LeetCode").username("neha_ai").profileUrl("https://leetcode.com").iconName("Code").displayOrder(3).build(),
                    CodingProfile.builder().platform("HuggingFace").username("neha_nlp").profileUrl("https://huggingface.co").iconName("Cpu").displayOrder(4).build()
            );
            codingProfileRepository.saveAll(profiles);
            log.info("Initialized default Coding Profiles data");
        }
    }
}
