import { Injectable, computed, inject, signal } from '@angular/core';
import { EXPERIENCES, Experience, experiences } from './experience-info';
import { NAV_SECTIONS, NavSection, navSections } from './section-info';
import { PERSONAL_INFO, PersonalInfo, personalInfo } from './personal-info';
import { TIMELINE_SECTIONS, TimelineSection, timelineSections } from './timeline-info';

export type LanguageCode = 'fr' | 'en';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export interface UiTranslations {
  languageButton: string;
  languageMenuLabel: string;
  problem: string;
  solution: string;
  previous: string;
  next: string;
  certificate: string;
  welcome: string;
  journey: string;
  projects: string;
  contactTitle: string;
  contactDescription: string;
  name: string;
  namePlaceholder: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  missingFields: (fields: string[]) => string;
  footerSections: string;
  portfolioBuiltWith: string;
  focusPoints: string[];
  skillLevels: Record<string, string>;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

const UI_TRANSLATIONS: Record<LanguageCode, UiTranslations> = {
  fr: {
    languageButton: 'Langues',
    languageMenuLabel: 'Choisir une langue',
    problem: 'Problématique',
    solution: 'Solution',
    previous: 'Précédent',
    next: 'Suivant',
    certificate: 'Voir le certificat',
    welcome: 'Bienvenue sur mon portfolio.',
    journey: 'Un aperçu de mon parcours',
    projects: "Découvrez les projets auxquels j'ai contribué",
    contactTitle: 'Prenons contact',
    contactDescription: 'Vous avez une question, un projet ou autre chose ? Envoyez-moi un message.',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    message: 'Message',
    messagePlaceholder: 'Dîtes-moi tout...',
    send: 'Envoyer le message',
    missingFields: (fields) => `Il me faut encore : ${fields.join(', ')}.`,
    footerSections: 'Sections',
    portfolioBuiltWith: 'Portfolio façonné avec Angular 22',
    focusPoints: ['Navigation simple et directe', 'Contenus clairs et hiérarchisés', 'Base Angular facile à faire évoluer'],
    skillLevels: { intermediate: 'Intermédiaire', mastery: 'Maîtrise', advanced: 'Avancé' },
  },
  en: {
    languageButton: 'Languages',
    languageMenuLabel: 'Choose a language',
    problem: 'Challenge',
    solution: 'Solution',
    previous: 'Previous',
    next: 'Next',
    certificate: 'View certificate',
    welcome: 'Welcome to my portfolio.',
    journey: 'An overview of my journey',
    projects: 'Discover the projects I have contributed to',
    contactTitle: 'Get in touch',
    contactDescription: 'Do you have a question, a project or anything else? Send me a message.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    message: 'Message',
    messagePlaceholder: 'Tell me everything...',
    send: 'Send message',
    missingFields: (fields) => `I still need: ${fields.join(', ')}.`,
    footerSections: 'Sections',
    portfolioBuiltWith: 'Portfolio built with Angular 22',
    focusPoints: ['Simple and direct navigation', 'Clear and structured content', 'An Angular foundation that is easy to evolve'],
    skillLevels: { intermediate: 'Intermediate', mastery: 'Mastery', advanced: 'Advanced' },
  },
};

const ENGLISH_PERSONAL_INFO: Partial<PersonalInfo> = {
  bio: `Computer engineer trained at Université Paris-Saclay, I am above all passionate about AI and software development. Rigorous, creative and curious, I enjoy taking on technical challenges and bringing innovative ideas to life, both in my daily work and in professional projects.`,
  location: 'Paris, France',
  toeicScore: '955/990 (C1 level)',
};

const ENGLISH_TIMELINE: Record<number, Pick<TimelineSection, 'title' | 'summary'>> = {
  0: { title: 'Computer Engineering and Mathematical Engineering Degree', summary: 'Polytech Paris-Saclay' },
  1: { title: 'Fullstack Engineer', summary: 'Takima - Software development and consulting internship (6 months)' },
  2: { title: 'Erasmus exchange semester', summary: 'Sapienza Università di Roma - Computer Science Master' },
  3: { title: 'Research Engineer', summary: 'Inria - Data visualization research internship (5 months)' },
};

const ENGLISH_EXPERIENCES: Record<number, Pick<Experience, 'title' | 'context' | 'problem' | 'solution'>> = {
  0: {
    title: 'Fullstack Engineer (AI integration)', context: 'Final-year internship - Takima, 2026',
    problem: `For six months, I worked as part of a team on Dossier d'Expertise, a production resume-editing application that helps Takima sales teams answer calls for consultants. The goal was to improve consultant profile management while automating time-consuming tasks such as formatting and searching with LLM processing.`,
    solution: ['Designed, implemented and deployed an anonymization microservice for processing personal data with LLMs', 'Benchmarked French NER models for data anonymization using F1-score', 'Implemented a RAG system to enrich an internal search engine', 'Designed and integrated an AI resume-reformatting module using structured outputs', 'Developed and deployed a Kubernetes CronJob to automate file update notifications'],
  },
  1: {
    title: 'Team Kaggle challenge: vision-language alignment', context: 'Advanced Machine Learning, Sapienza Università di Roma - 2025',
    problem: 'How can a text encoder (BERT) and an image encoder (VAE), trained on different data with different representations, be aligned in latent spaces of different dimensions?',
    solution: ['Designed an MLP projection module coupled with a contrastive loss to align vision and text embeddings in a shared semantic space.', 'Used state-of-the-art multimodal alignment research to guide our architecture choices.', 'Set up a GPU hyperparameter exploration pipeline to optimize training.', 'Added Gaussian noise during training to improve model robustness.', 'Our model reached a score of 0.89 on the leaderboard, placing in the top 10% of participants.'],
  },
  2: {
    title: 'FaceGuard: a facial recognition biometric system', context: 'Biometric Systems, Sapienza Università di Roma - 2025',
    problem: 'Design a secure facial recognition biometric system for enrolling and authenticating users from a single photograph, while resisting presentation attacks and exposing a secure API for application integration.',
    solution: ['Implemented a one-shot facial recognition system storing enrollment embeddings in a biometric database.', 'Developed liveness detection mechanisms combining algorithms and machine learning models.', 'Evaluated the system with FAR, FRR and EER metrics to select a secure and usable decision threshold.', 'Designed a JWT-secured API with role-based authentication and authorization.'],
  },
  3: {
    title: 'Research Engineer', context: 'Data visualization research internship - Inria, 2025',
    problem: 'Retrieve and visualize the sound level and direction of incidence of a sound source on a non-planar screen.',
    solution: ['Processed signals with FFT to calculate sound levels from low-cost analog microphones.', 'Designed a TDoA algorithm to estimate sound direction and calculate uncertainties.', 'Developed real-time data visualizations transmitted through WebSocket.', 'Simulated the visualizations in 3D with React Three Fiber and Blender on a virtual cylindrical screen.', 'Worked exclusively in English in an international setting'],
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey = 'portfolio-language';
  private readonly basePersonalInfo = inject(PERSONAL_INFO, { optional: true }) ?? personalInfo;
  private readonly baseNavSections = inject(NAV_SECTIONS, { optional: true }) ?? navSections;
  private readonly baseTimelineSections = inject(TIMELINE_SECTIONS, { optional: true }) ?? timelineSections;
  private readonly baseExperiences = inject(EXPERIENCES, { optional: true }) ?? experiences;
  private readonly currentLanguage = signal<LanguageCode>(this.initialLanguage());
  readonly language = this.currentLanguage.asReadonly();
  readonly languages = SUPPORTED_LANGUAGES;
  readonly ui = computed(() => UI_TRANSLATIONS[this.language()]);
  readonly personalInfo = computed(() => ({ ...this.basePersonalInfo, ...(this.language() === 'en' ? ENGLISH_PERSONAL_INFO : {}) }));
  readonly navSections = computed<NavSection[]>(() => this.language() === 'en'
    ? [{ label: 'Profile', path: '/home' }, { label: 'Experience', path: '/experiences' }, { label: 'Contact', path: '/contact' }]
    : this.baseNavSections);
  readonly timelineSections = computed(() => this.baseTimelineSections.map((section, index) => ({
    ...section,
    ...(this.language() === 'en' ? ENGLISH_TIMELINE[index] : {}),
  })));
  readonly experiences = computed(() => this.baseExperiences.map((experience, index) => ({
    ...experience,
    ...(this.language() === 'en' ? ENGLISH_EXPERIENCES[index] : {}),
  })));

  constructor() {
    document.documentElement.lang = this.language();
  }

  setLanguage(language: LanguageCode): void {
    this.currentLanguage.set(language);
    localStorage.setItem(this.storageKey, language);
    document.documentElement.lang = language;
  }

  private initialLanguage(): LanguageCode {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'fr' || stored === 'en') return stored;
    return navigator.languages.some((language) => language.toLowerCase().startsWith('en')) ? 'en' : 'fr';
  }
}
