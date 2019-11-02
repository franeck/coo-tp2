# TP 2 - Principes POO & Design Patterns

> Franciszek Dobrowolski - AP5 2019-2020 

## Question 3

Dans une API, on sépare généralement la couche HTTP, recevant les requêtes et traitant les erreurs, de la couche “service” qui elle s’occupe de la logique “métier” et renvoie des erreurs “métier”.
En nommant le principe ainsi respecté, réécrivez le contrôleur des commandes afin qu’il ne s’occupe que de la partie HTTP. Côté métier, un Design Pattern particulier sera appliqué pour faciliter l’utilisation du storage, nommez le.

## Réponses

Le contrôleur précédent a été séparé en deux classes, une dans *controller* et une dans *service*.

Le principe ainsi respecté est celui de la **responsabilité unique**. Le "S" du SOLID. Selon ce principe une classe, une fonction ou une méthode doit avoir une et une seule responsabilité.

Pour l'utilisation du storage on applique le Design appelé "**Repository Pattern**". Il consiste à ajouter une autre couche d'abstraction à l'accès aux donées. Le service utilisera une interface pour accèder aux données, sans se soucier du méchanisme de stockage qui l'implémante.

## Commentaires

En construisant le nouveau service on applique à nouveau le principe de l'inversion des dépendances. Le contrôleur ne dépendra pas de l'implémentation du service, mais d'une abstraction définissante ses fonctionnalités. 

Une instance du service est fournie au contrôleur au moment de sa création dans *server.ts*. 

Le service expose lui-même des méthodes asynchrones dû à la nature asynchrone du stockage. Les méthodes retournent donc des promesses sur lesquelles le contrôleur se base pour déterminer le résultat de la requête.

Le nouveau repository respecte également le Pattern "**Singleton**". Il consiste à mettre à disposition une seule instance du service, pour mieux contrôler l'accès aux resources partagés (une seule connexion à la fois).

Cette instance est forunie au service au moment de sa création dans *server.ts*.

En passant, on applique également le principe **DRY**, car le repository se charge de parser le contenu du stockage en objet Order. Cette opération est ainsi définie une seule fois pour toutes les méthodes du service.
