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
  solution: string[];
}

export const experiences: Experience[] = [
  {
    title: 'Challenge Kaggle en équipe : alignement vision-texte',
    context: 'Advanced Machine Learning, Sapienza Università di Roma - 2025',
    techStack: [
      { name: 'Python', image: 'assets/skill_icons/python.svg', level: 'Avancé' },
      { name: 'PyTorch', image: 'assets/skill_icons/pytorch.svg', level: 'Maîtrise' },
    ],
    problem: `IA multimodale : aligner un encodeur de texte BERT avec VAE image entraînés sur des données différentes, avec des espaces latents de dimension différentes.`,
    solution: [
     `Conception d'un module de projection MLP couplé à une loss contrastive pour aligner les embeddings vision et texte dans un espace sémantique commun.`,
     `Nous nous sommes appuyés sur l'état de l'art de l'alignement multimodal pour guider nos choix d'architecture.
     Nous avons notamment fait le choix d'augmenter la dimension des couches côté texte pour mieux capturer la sémantique, comme suggéré par les travaux récents de la littérature.`,
     `Mise en place d'une pipeline d'exploration d'hyperparamètres sur GPU pour optimiser l'entraînement.`,
     `Insertion de bruit gaussien lors de l'entraînement pour améliorer la robustesse du modèle.`,
     `Résultat : notre modèle a atteint un score de 0.89 sur le leaderboard, se classant ainsi dans le top 10% des participants.`
    ]
    },
  {
    title: 'Ingénieur fullstack',
    context: `Stage de fin d'études - Takima, 2026`,
    techStack: [
      { name: 'Angular', image: 'assets/skill_icons/angular.svg', level: 'Avancé' },
      { name: 'Kafka', image: 'assets/skill_icons/kafka.svg', level: 'Intermédiaire' },
      { name: 'TypeScript', image: 'assets/skill_icons/typescript.svg', level: 'Maîtrise' },
    ],
    problem: `Visualiser en temps réel le flux de milliers de colis sans figer l'interface ni perdre de données lors des pics de trafic.`,
    solution: [
      `Architecture event-driven avec Kafka pour le streaming et Angular Signals pour le rendu réactif.`,
      `Le dashboard diffuse 120 mises à jour/seconde avec moins de 16 ms de latence.`,
    ],
  },
  {
    title: 'Localisation acoustique 3D',
    context: 'Stage de recherche — Inria, 2025',
    techStack: [
      { name: 'C++', image: 'assets/skill_icons/cpp.svg', level: 'Maîtrise' },
      { name: 'Arduino', image: 'assets/skill_icons/arduino.svg', level: 'Intermédiaire' },
    ],
    problem: 'Estimer la direction d\'une source sonore dans une pièce réverbérante à partir d\'un réseau de microphones bas-coût.',
    solution: [
      `Implémentation d\'un algorithme TDoA sur STM32 pour le calcul de différences de temps d\'arrivée.`,
      `Filtre de Kalman pour lisser les estimations angulaires en environnement réverbérant.`,
      `Précision angulaire moyenne de 4.2° dans un rayon de 5 mètres.`,
    ]
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
    solution: [
      `Helm chart paramétrable exposant une API FastAPI avec versioning automatique des modèles.`,
      `Scaling horizontal via HPA et monitoring Prometheus pour une observabilité complète.`,
      `Le temps de mise en production est passé de 2 jours à 20 minutes.`,
    ],
  },
];

export const EXPERIENCES = new InjectionToken<Experience[]>('EXPERIENCES');
