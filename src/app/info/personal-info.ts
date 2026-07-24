import { InjectionToken } from '@angular/core';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  location: string;
  bio: string;
  title: string;
  linkedIn: string;
  github: string;
  toeicLink: string;
  toeicScore: string;
}

export const personalInfo: PersonalInfo = {
  firstName: 'Erwan',
  lastName: 'Achat',
  bio: `Ingénieur en informatique formé à l’Université Paris-Saclay, passionné
par la recherche en apprentissage automatique et en traitement du langage
naturel. Rigoureux et animé par la démarche scientifique, j’aime explorer les
problématiques NLP en profondeur tout en gardant un ancrage solide en
développement logiciel pour concrétiser mes idées.
  `,
  title: 'AI Engineer',
  linkedIn: 'https://www.linkedin.com/in/erwan-achat-069311233/',
  github: 'https://github.com/erwan-achat/portfolio',
  location: 'Paris, France',
  toeicLink: 'https://www.etsglobal.org/global/en/digital-score-report/89BEC18A1168FCC1AB9A8F5E1D08770ECEEC5A70420BDF6BD2153EAAAAEF1BD7ckZhRzJpei9RWitCbEtwbzJ4V243a282UkpOV2ZuYTRDWXFkU2lnUXl1enlyakM4?utm_source=dsr&utm_medium=qr-code-click&utm_campaign=sharing_dsr',
  toeicScore: '955/990 (niveau C1)',
};

export const PERSONAL_INFO = new InjectionToken<PersonalInfo>('PERSONAL_INFO');