import { InjectionToken } from '@angular/core';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  location: string;
  bio: string;
  title: string;
  linkedIn: string;
  github: string;
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
  github: 'https://github.com/r1ha/portfolio',
  location: 'Paris, France'
};

export const PERSONAL_INFO = new InjectionToken<PersonalInfo>('PERSONAL_INFO');