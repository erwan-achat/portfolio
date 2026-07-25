import { InjectionToken } from '@angular/core';

export interface TimelineSection {
  year: string;
  title: string;
  summary: string;
  logo?: string;
  logoAlt?: string;
  logoClass?: string;
}

export const timelineSections: TimelineSection[] = [
  {
    year: '2026',
    title: "Diplôme d'Ingénieur en Informatique\net Ingénierie Mathématique",
    summary: 'Polytech Paris-Saclay',
    logo: 'assets/organizations/polytech_white.svg',
    logoAlt: `Polytech Paris-Saclay`,
    logoClass: 'w-1/2',
  },
  {
    year: '2026',
    title: 'Ingénieur fullstack',
    summary: `Takima - Stage en développement logiciel et conseil (6 mois)

    Dans le cadre de mon stage de fin d'études, j'ai rejoint une équipe de développement en interne chez Takima (ESN) pour intégrer des outils d'IA à une application web qui tourne en production, avec une posture de consultant.

    J'ai travaillé en méthode agile, en collaboration avec la Direction des Opérations de Takima et l'équipe commerciale, pour concevoir des solutions qui répondent à leur besoin et augmentent l'efficacité de leurs processus internes.

    `,
    logo: 'assets/organizations/takima_white.svg',
    logoAlt: 'Takima',
    logoClass: 'w-1/3 p-5',
  },
  {
    year: '2025',
    title: "Semestre d'échange Erasmus",
    summary: `Sapienza Università di Roma - Computer Science Master

    Comme tous les chemins mènent à Rome... J'ai eu l'opportunité d'étudier l'informatique durant un semestre à la Sapienza, avec un focus approfondi sur les techniques modernes d'IA. Cette expérience m'a permis de découvrir un environnement académique international mais aussi une culture riche et propre à l'Italie.
    
    J'ai suivi et validé les enseignements suivants : Advanced Machine Learning, Quantum Computing, Biometric Systems, Automatic Verification of Intelligent Systems (Reinforcement Learning), Statistics`,
    logo: 'assets/organizations/sapienza_white.svg',
    logoAlt: 'Sapienza Università di Roma',
    logoClass: 'w-1/2 p-5',
  },
  {
    year: '2025',
    title: 'Ingénieur de recherche',
    summary: `Inria - Stage de recherche en visualisation de données (5 mois)

    J'ai intégré l'équipe Aviz de l'Inria, spécialisée dans la visualisation des données, pour participer à un projet de recherche visant à explorer de nouvelles méthodes de visualisation pour les écrans non-plats (incurvés, sphériques, cylindriques).
    `,
    logo: 'assets/organizations/inria_white.svg',
    logoAlt: 'Inria',
    logoClass: 'w-1/3 p-5',
  }
];

export const TIMELINE_SECTIONS = new InjectionToken<TimelineSection[]>('TIMELINE_SECTIONS');
