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
  image?: string;
  link?: { label: string; url: string };
}

export const experiences: Experience[] = [
  {
    title: 'Challenge Kaggle en équipe : alignement vision-texte',
    context: 'Advanced Machine Learning, Sapienza Università di Roma - 2025',
    techStack: [
      { name: 'Python', image: 'assets/skill_icons/python.svg', level: 'Avancé' },
      { name: 'PyTorch', image: 'assets/skill_icons/pytorch.svg', level: 'Maîtrise' },
    ],
    image: 'assets/pictures/kaggle_challenge.png',
    problem: `"Model stitching" pour IA multimodale  : Comment aligner un encodeur de texte (BERT) avec un encodeur image (VAE) entraînés sur des données différentes, avec des représentations différentes dans des espaces latents de dimension différentes ?`,
    solution: [
      `Conception d'un module de projection MLP couplé à une loss contrastive pour aligner les embeddings vision et texte dans un espace sémantique commun.`,
      `Nous nous sommes appuyés sur l'état de l'art de l'alignement multimodal pour guider nos choix d'architecture.
     Nous avons notamment fait le choix d'augmenter la dimension des couches côté texte pour mieux capturer la sémantique, comme suggéré par les travaux récents de la littérature.`,
      `Mise en place d'une pipeline d'exploration d'hyperparamètres sur GPU pour optimiser l'entraînement.`,
      `Insertion de bruit gaussien lors de l'entraînement pour améliorer la robustesse du modèle.`,
      `Résultat : notre modèle a atteint un score de 0.89 sur le leaderboard, se classant ainsi dans le top 10% des participants.`,
    ],
  },
  {
    title: 'Ingénieur fullstack',
    context: `Stage de fin d'études - Takima, 2026`,
    techStack: [
      { name: 'Java 21', image: 'assets/skill_icons/java.svg', level: 'Avancé' },
      { name: 'Spring Boot', image: 'assets/skill_icons/springboot.svg', level: 'Avancé' },
      { name: 'PostgreSQL', image: 'assets/skill_icons/sql.svg', level: 'Maîtrise' },
      { name: 'Docker', image: 'assets/skill_icons/docker.svg', level: 'Maîtrise' },
      { name: 'Angular', image: 'assets/skill_icons/angular.svg', level: 'Avancé' },
      { name: 'TypeScript', image: 'assets/skill_icons/typescript.svg', level: 'Maîtrise' },
      { name: 'Gitlab CI/CD', image: 'assets/skill_icons/gitlab.svg', level: 'Avancé' },
      { name: 'Kubernetes', image: 'assets/skill_icons/k8s.svg', level: 'Avancé' },
      { name: 'Datadog', image: 'assets/skill_icons/datadog.svg', level: 'Intermédiaire' },
      { name: 'Kafka', image: 'assets/skill_icons/kafka.svg', level: 'Intermédiaire' },
      { name: 'OpenCode', image: 'assets/skill_icons/opencode.svg', level: 'Avancé' },
    ],
    problem: `Durant 6 mois, j'ai travaillé en équipe sur Dossier d'Expertise, une application d'édition de CV qui tourne en production et permet aux commerciaux de Takima de répondre aux appels avec des profils de consultants.
    L'objectif était d'optimiser la gestion des profils des consultants pour fluidifier le staffing interne, tout en automatisant les tâches chronophages (reformatage, recherche) à l'aide de traitement par LLM.`,
    solution: [
      `Conception, implémentation et mise en production d’un micro-service d’anonymisation pour traitement de données personnelles par LLM`,
      `Benchmark des modèles de NER français pour l’anonymisation des données (F1-score)`,
      `Implémentation d’un RAG pour enrichir un moteur de recherche interne`,
      `Conception et intégration d'un module IA de reformatage (structured outputs) automatique de CV, réduisant les traitements manuels du pôle commercial en produisant des documents directement exploitables`,
      `Développement et déploiement d'un CronJob Kubernetes pour automatiser les notifications de mise à jour des dossiers aux consultants, facilitant ainsi les processus de staffing interne`,
    ],
  },
  {
    title: 'Ingénieur recherche',
    context: 'Stage de recherche en visualisation de données- Inria, 2025',
    techStack: [
      { name: 'C++', image: 'assets/skill_icons/cpp.svg', level: 'Maîtrise' },
      { name: 'Arduino', image: 'assets/skill_icons/arduino.svg', level: 'Intermédiaire' },
      { name: 'React Vite', image: 'assets/skill_icons/react.svg', level: 'Avancé' },
      { name: 'Blender', image: 'assets/skill_icons/blender.svg', level: 'Maîtrise' },
    ],
    problem: `Récupérer et visualiser le niveau sonore et la direction d'incidence d'une source sonore sur un écran non-planaire.`,
    solution: [
      `Traitement du signal (FFT) pour calculer le niveau sonore à partir de microphones
analogiques à moindre coût.`,
      `Conception d’un algorithme de TDoA pour estimer la direction d’incidence des sons et calcul des incertitudes.`,
      `Développement de visualisations des données transmises en temps réel via WebSocket.`,
      `Simulation 3D des visualisations avec React Three Fiber et Blender sur un écran cylindrique virtuel dans un setting réaliste.`,
      `Communication en équipe exclusivement en anglais dans un setting international`,
    ],
    link: { label: 'Lettre de recommandation', url: 'assets/pdfs/reference_letter_inria.pdf' },
  },
];

export const EXPERIENCES = new InjectionToken<Experience[]>('EXPERIENCES');
