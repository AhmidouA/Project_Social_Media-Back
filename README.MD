# Projet SOCIAL-MEDIA

Projet de réseau social développé avec Prisma, PostgreSQL, Node.js, Express.js et TypeScript.

## Table des matières

- [Présentation](#présentation)
- [Technologies](#technologies)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Exemples](#exemples)
- [Contributions](#contributions)
- [Auteurs](#auteurs)
- [Licence](#licence)

## Présentation

Le projet SOCIAL-MEDIA est un réseau social permettant aux utilisateurs de partager des publications, de se connecter avec des amis, et d'interagir avec du contenu.

## Technologies

- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://TypeScript.com/)


## Structure du Projet

- `src/`: Contient le code source de l'application.
  - `config/`: Contient les migrations et les modèles de base de données.
  - `data/` : Contient les donnée distiné a la base de données.
  - `midllewares/`: Contient des scripts utiles pour le projet.
  - `models/`: Modèles de données.
  - `controllers/`: Contrôleurs de l'application.
  - `public/`: fichier public(image).
  - `routes/`: Routes de l'API.
  - `services/`: Service de authentification.
  - `shared/`: typage des données.
  - `util/`: Service de gestion d'image.
 

## Installation

Assurez-vous d'avoir Node.js installé. Exécutez ensuite les commandes suivantes pour installer les dépendances et configurer le projet.

```bash
# Installation des dépendances
npm install

# Exécution des migrations de base de données
npx prisma migrate dev

# Lancer le serveur
npm run dev 

# Lancer le serveur
npm start 
