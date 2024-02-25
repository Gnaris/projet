
# Documentation du projet 📖

### Packages supplémentaires nécessaire pour tourner l'application ❗

 - Prisma (ORM)
`Prisma est un outil ORM (Object-Relational Mapping) qui accélère le développement en    simplifiant l'interaction avec la base de données, permettant aux développeurs de manipuler les données à travers des modèles de données définis en code plutôt qu'en SQL directement.`
 - Json Web Token
`JSON Web Token (JWT) est une norme ouverte (RFC 7519) qui facilite l'authentification et l'autorisation sécurisées dans les applications web et mobiles en permettant l'échange de jetons entre parties de confiance, offrant ainsi une méthode efficace pour gérer les sessions utilisateur et les autorisations d'accès.`
 - Bcrypt
`Bcrypt est une fonction de hachage de mots de passe qui offre un moyen sécurisé de stocker les mots de passe des utilisateurs en les hachant avec un algorithme de hachage lent et irréversible, ce qui renforce la sécurité des systèmes en rendant les attaques par force brute plus difficiles et en protégeant les mots de passe en clair.`


### Les Fonctionnalités 📲

 - Système d'authentifcation sécurisé. 
 - Système de gestion projet CRUD (Create, Read, Update, Delete).
 - Gestion des permissions ou des droits d'utilisateur sur les fonctionnalités.


# Partie Technique 💻
## Architecture du projet

## Racine (./)

| Nom du dossier            | Rôle                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Prisma | Gérer la base donnée entièrement |
| src | Constitue le corps de notre application |
| .env | Configuration de la base de donnée |
| AccountText.txt | Liste des utilisateurs et mot de passe pour faire la demo |

## Src (./src)

| Nom du dossier            | Rôle                                                                |
| ----------------- | ------------------------------------------------------------------ |
| app | Gestion des pages et des api |
| components | Séparer les blocs HTML pour plus de lisibilité et éviter les répétitions |
| database | Permet de se connecter à la base de donnée sans répéter les connections |
| entity | Dossier dédié au objet |
| services | Fournisseur de context et appel d'API |
| styles | CSS |
| types | Liste des types |

## Component (./src/components)

| Nom du dossier            | Rôle                                                                |
| ----------------- | ------------------------------------------------------------------ |
| global | Liste des composants permettant d'éviter les répétitions |
| [nom de la page] | Des composants didés uniquement pour cette page |

## Service (./src/services)

| Nom du dossier            | Rôle                                                                |
| ----------------- | ------------------------------------------------------------------ |
| api | Les fonctions permettant de faire des appels api |
| provider | Fournisseur de context |





## Référence API

#### Se connecter

```http
  POST /api/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Obligatoire**. Identifiant |
| `password` | `string` | **Obligatoire**. Mot de passe |

#### Récupérer les projets et les tâches de l'utilisateur connecté

```http
  POST /api/project
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Obligatoire**. A mettre dans l'en-tête "Authorization" |

#### Modifier le titre ou la description du projet

```http
  PUT /api/project
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Obligatoire**. A mettre dans l'en-tête "Authorization" |
| `id`      | `number` | **Facultatif**. Modifie le titre |
| `name`      | `string` | **Facultatif**. Modifie le titre |
| `description` | `string` | **Facultatif**. Modifie la description |

#### Ajouter une tâche

```http
  POST /api/project/task
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Obligatoire**. A mettre dans l'en-tête "Authorization" |
| `titre`      | `string` | **Obligatoire**. rajoute le titre |
| `description` | `string` | **Obligatoire**. rajoute la description |
| `effort` | `string` | **Obligatoire**. rajoute l'effort |
| `typeId` | `string` | **Obligatoire**. rajoute le type |
| `stateId` | `string` | **Obligatoire**. rajoute l'état |
| `projectId` | `number` | **Obligatoire**. L'attribuer dans quel projet |

#### Modifier une tâche

```http
  PUT /api/project/task
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Obligatoire**. A mettre dans l'en-tête "Authorization" |
| `id`      | `number` | **Obligatoire**. savoir quelle tâche modifier |
| `titre`      | `string` | **Facultatif**. modifie le titre |
| `description` | `string` | **Facultatif**. modifie la description |
| `effort` | `string` | **Facultatif**. modifie l'effort |
| `typeId` | `string` | **Facultatif**. modifie le type |
| `stateId` | `string` | **Facultatif**. modifie l'état |


#### Supprimer une tâche

```http
  DELETE /api/project/task
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Obligatoire**. A mettre dans l'en-tête "Authorization" |
| `id`      | `number` | **Obligatoire**. savoir quelle tâche supprimer |

#### Recuperer tout les types possibles des tâches

```http
  GET /api/project/task/type
```

#### Recuperer tout les états possible des tâches

```http
  GET /api/project/task/state
```


## Variable Environnement

Dans le fichier .env se trouve uniquement la clé `DATABASE_URL` qui permet de configurer et générer automatiquement votre base de donnée y compris les tables

**Exemple :**

`DATABASE_URL="{type de base de donnée}://{identifiant}:{mot de passe}@{adresse base de donnée}:{port}/{nom de la base donnée souhaitée}?schema=public"`


## Installation

Avant de pouvoir faire fonctionner l'application, il faudra d'abord installer les dépédances nécessaires (ne pas oublier de configurer la base de donnée qui se trouve dans le fichier .env avant de lancer l'installation)

```bash
  -npm install
  -npx prisma migrate dev
  -npm run seed (permet de générer des fausses données dans la base de donnée)
```
    
## Démo

lancer le serveur

```bash
  npm run dev
```

