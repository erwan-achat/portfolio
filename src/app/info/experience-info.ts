import { InjectionToken } from '@angular/core';

export type SkillLevel = 'Intermédiaire' | 'Maîtrise' | 'Avancé';

export interface SkillItem {
  name: string;
  image: string;
  level: SkillLevel;
}

export interface Experience {
  title: string;
  context: string;
  techStack: SkillItem[];
  problem: string;
  solution: string;
}

export const experiences: Experience[] = [
  {
    title: 'Assistant vocal intelligent',
    context: 'Projet de recherche — Polytech Paris-Saclay, 2025',
    techStack: [
      { name: 'Python', image: 'assets/skill_icons/python.svg', level: 'Avancé' },
      { name: 'PyTorch', image: 'assets/skill_icons/pytorch.svg', level: 'Maîtrise' },
    ],
    problem: 'Améliorer la robustesse d\'un système de compréhension du langage naturel face aux accents régionaux et au bruit ambiant.',
    solution: 'Fine-tuning d\'un modèle Whisper sur un corpus multi-accent français, associé à un pipeline de débruitage adaptatif. L\'accuracy est passée de 68 % à 91 % sur les échantillons les plus bruités.',
  },
  {
    title: 'Dashboard temps-réel pour la logistique',
    context: 'Stage — Takima, 2026',
    techStack: [
      { name: 'Angular', image: 'assets/skill_icons/angular.svg', level: 'Avancé' },
      { name: 'Kafka', image: 'assets/skill_icons/kafka.svg', level: 'Intermédiaire' },
      { name: 'TypeScript', image: 'assets/skill_icons/typescript.svg', level: 'Maîtrise' },
    ],
    problem: 'Visualiser en temps réel le flux de milliers de colis sans figer l\'interface ni perdre de données lors des pics de trafic.',
    solution: 'Architecture event-driven avec Kafka pour le streaming et Angular Signals pour le rendu réactif. Le dashboard diffuse 120 mises à jour/seconde à < 16 ms de latence.',
  },
  {
    title: 'Localisation acoustique 3D',
    context: 'Stage de recherche — Inria, 2025',
    techStack: [
      { name: 'C++', image: 'assets/skill_icons/cpp.svg', level: 'Maîtrise' },
      { name: 'Arduino', image: 'assets/skill_icons/arduino.svg', level: 'Intermédiaire' },
    ],
    problem: 'Estimer la direction d\'une source sonore dans une pièce réverbérante à partir d\'un réseau de microphones bas-coût.',
    solution: 'Implémentation d\'un algorithme TDoA sur STM32, couplé à un filtre de Kalman pour lisser les estimations. Précision angulaire moyenne de 4.2° dans un rayon de 5 mètres.',
  },
  {
    title: 'Plateforme de déploiement ML',
    context: 'Projet personnel — 2025-2026',
    techStack: [
      { name: 'Kubernetes', image: 'assets/skill_icons/k8s.svg', level: 'Maîtrise' },
      { name: 'PostgreSQL', image: 'assets/skill_icons/sql.svg', level: 'Maîtrise' },
      { name: 'Python', image: 'assets/skill_icons/python.svg', level: 'Avancé' },
    ],
    problem: 'Industrialiser le déploiement de modèles ML sans escalade humaine entre l\'équipe data et l\'équipe infra.',
    solution: 'Helm chart paramétrable exposant une API FastAPI avec versioning automatique des modèles, scaling horizontal via HPA et monitoring Prometheus. Le temps de mise en production est passé de 2 jours à 20 minutes.',
  },
];

export const EXPERIENCES = new InjectionToken<Experience[]>('EXPERIENCES');
