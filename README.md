# CDS
Il s'agit d'un projet rataché à la matière Cloud Data Structure. Pour ce projet, nous avons fait le choix d'utiliser les données de l'application "DansMaRue", une application de la ville de Paris permettant de déclarer des incidants dans les rues parisiennes. Nous exploitons également certaines données de l'API de la ville de Paris notammenet des GeoJson des arrondissements, rues, ... Le but de ce projet est d'apporter une visualisation des données propres à notre projet et différente de celle de l'application "DansMaRue". 

# Organisation


# Développement

Pour pouvoir développer et tester la plateforme chez vous, vous devez avoir Node.js (version >=20). Il vous faudra aussi MongoDB. Dans le cas où MongoDB est déjà installer vous aurez besoins de MongoDB Compass pour accéder à la BDD en local.

Pour installer pnpm : `npm install -g pnpm`

* Pour le projet
  * copier le `.env.example` -> `.env`
  * Instalelr les dépendances avec `pnpm install`
  * Lancer le serveur de test avec `pnpm run dev` pour avoir le hot-reload

> pour avoir accès à l'interface en local : http://localhost

# Contribution
Pour pouvoir contribuer au développement, vous devez faire partie de l'équipe technique associée à ce projet.

Voici les étapes pour développer une feature ou régler un bug :
* Créer une issue décrivant le problème/la fonctionnalité de façon précise mais concise
* Crérer une branch nommée `dev-[numéro de l'issue]` et faites vos commit dessus
* Créer une pull request en mettant au début de la description `resolv #[numéro de l'issue]`
* Une fois la review effectuée, merger votre branche en faisant un "Squash and merge"
