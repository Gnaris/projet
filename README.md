# Documentation du projet 📖

### Packages supplémentaires nécessaire pour tourner l'application ❗

- TailwindCSS
  `Tailwind CSS est une bibliothèque CSS utilitaire qui simplifie le processus de création d'interfaces web en permettant une construction rapide et flexible grâce à des classes pré-définies.`
- Prisma (ORM)
  `Prisma est un outil ORM (Object-Relational Mapping) qui accélère le développement en    simplifiant l'interaction avec la base de données, permettant aux développeurs de manipuler les données à travers des modèles de données définis en code plutôt qu'en SQL directement.`
- Json Web Token
  `JSON Web Token (JWT) est une norme ouverte (RFC 7519) qui facilite l'authentification et l'autorisation sécurisées dans les applications web et mobiles en permettant l'échange de jetons entre parties de confiance, offrant ainsi une méthode efficace pour gérer les sessions utilisateur et les autorisations d'accès.`
- Bcrypt
  `Bcrypt est une fonction de hachage de mots de passe qui offre un moyen sécurisé de stocker les mots de passe des utilisateurs en les hachant avec un algorithme de hachage lent et irréversible, ce qui renforce la sécurité des systèmes en rendant les attaques par force brute plus difficiles et en protégeant les mots de passe en clair.`

### Les Fonctionnalités 📲

- Système d'authentifcation (inscription et connexion) sécurisé.
- Système de gestion projet CRUD (Create, Read, Update, Delete).
- Gestion des permissions ou des droits d'utilisateur sur les fonctionnalités.

# Partie Technique 💻

## Architecture du projet

## Racine (./)

| Nom du dossier  | Rôle                                                      |
| --------------- | --------------------------------------------------------- |
| Prisma          | Gérer la base donnée entièrement                          |
| src             | Constitue le corps de notre application                   |
| .env            | Configuration de la base de donnée                        |
| AccountText.txt | Liste des utilisateurs et mot de passe pour faire la demo |

## Src (./src)

| Nom du dossier | Rôle                                                                     |
| -------------- | ------------------------------------------------------------------------ |
| app            | Gestion des pages et des api                                             |
| components     | Séparer les blocs HTML pour plus de lisibilité et éviter les répétitions |
| database       | Permet de se connecter à la base de donnée sans répéter les connections  |
| entity         | Dossier dédié au objet                                                   |
| services       | Fournisseur de context et appel d'API                                    |
| styles         | CSS                                                                      |
| types          | Liste des types                                                          |

## Component (./src/components)

| Nom du dossier   | Rôle                                                     |
| ---------------- | -------------------------------------------------------- |
| global           | Liste des composants permettant d'éviter les répétitions |
| [nom de la page] | Des composants dédiés uniquement pour cette page         |

## Server (./src/server)

| Nom du dossier   | Rôle                                         |
| ---------------- | -------------------------------------------- |
| [nom de la page] | Server Action pour intéragir avec le serveur |

## Variable Environnement

Dans le fichier .env se trouve uniquement la clé `DATABASE_URL` qui permet de configurer et générer automatiquement votre base de donnée y compris les tables
BCRYPT_SALT : Permet de saler les mot de passe. Plus le nombre est haut plus le traitement de cryptable sera long
JWT_SIGN : Permet de mettre une signature pour chaque token lors de l'authentification

**Exemple :**

`DATABASE_URL="{type de base de donnée}://{identifiant}:{mot de passe}@{adresse base de donnée}:{port}/{nom de la base donnée souhaitée}?schema=public"`

## Installation

Avant de pouvoir faire fonctionner l'application, il faudra d'abord installer les dépédances nécessaires (ne pas oublier de configurer la base de donnée qui se trouve dans le fichier .env avant de lancer l'installation)

```bash
  -Installer un éditeur de text (Visual Studio Code)
  -Installer NodeJs, version utilisé par defaut 20.10.0
  -Ouvrir le projet avec l'éditeur de text
  -Ouvrez le terminal
  -npm install (permet d'installer les dépendance nécessaire)
  -Configurer votre fichier .env (lire la documentation ci-dessus)
  -npx prisma migrate dev
  -npm run seed (permet de générer des fausses données dans la base de donnée)
  -npm run dev
```

## COMMANDE UTILE

```bash
-npm run resetdata (Permet de supprimer les données et regénérer les mêmes fausses données dans la base de donnée)
```
