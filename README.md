# Portfolio web

Portfolio personnel développé avec Angular 22 en standalone, Typescript 6, Tailwind 4 et DaisyUI 5.

Structuré en sections navigables avec animations avec des composants réutilisables et personnalisables avec vos informations personnelles.

Libre à vous de réutiliser ce projet comme un template !

```
src/
└── app/
    ├── app.ts                      # Root component, route animations
    ├── app.config.ts               # Injection tokens (personalInfo, experiences, …)
    ├── app.routes.ts               # Routes lazy-loadées par section
    ├── components/                 # Composants réutilisables
    │   ├── carousel/               # Carousel horizontal auto-slide
    │   ├── carousel-item/          # Carte d'expérience (stack, problème, solution)
    │   ├── contact-form/           # Formulaire validation + localStorage
    │   ├── footer/                 # Footer avec navigation + lien GitHub
    │   ├── icon-set/               # Grille de liens (LinkedIn, GitHub, …)
    │   ├── navbar/                 # Navbar glassmorphism avec squash au scroll
    │   ├── personal-card/          # Carte de présentation
    │   ├── skill-icon/             # Icône de technologie (logo + tooltip)
    │   └── timeline/               # Timeline chronologique
    ├── info/                        # Données + tokens d'injection
    │   ├── experience-info.ts       # Expériences du carousel
    │   ├── personal-info.ts         # Infos personnelles
    │   ├── route-animations.ts      # Configuration animations de route
    │   ├── section-info.ts          # Sections de navigation
    │   └── timeline-info.ts         # Entrées de la timeline
    └── sections/                    # Pages (lazy-loadées par route)
        ├── about-section/           # Accueil : carte, bio, icon-set, timeline
        ├── contact-section/         # Formulaire de contact
        └── experiences-section/     # Carousel d'expériences
```

## Démarrer le projet en local

```bash
npm install
npm start
```

## Personnaliser les données

Modifie les fichiers dans `src/app/info/` :

- `personal-info.ts` — nom, bio, liens, etc.
- `timeline-info.ts` — entrées de la timeline
- `experience-info.ts` — galerie avec projets persos