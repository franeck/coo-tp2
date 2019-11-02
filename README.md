# TP 2 - Principes POO & Design Patterns

> Franciszek Dobrowolski - AP5 2019-2020 

## Question 2

Grâce à TypeScript on peut créer nos propres types, ainsi créez un type pour nos commandes.  

Un principe de conception favorise le découplage et les potentiels futurs “refactoring” du modèle des commandes, nommez ce principe et appliquez le ici.

## Réponses

Le contenu de la commande a été modélisé en tant qu'ensemble de classes dans le dossier **model**.

Dans la deuxième partie on applique le principe **d'inversion des dépendances**. Il s'agit de la partie "I" du SOLID. Selon ce principe, il faut dépendre des abstractions, pas des implémentations. Ainsi notre commande sera une implémentation du type commande. En conséquence, on pourra modifier le modèle de commande sans affecter le contrôleur.

## Commentaires

La classe OrdersController qui est un contrôleur CRUD, ne dépend que du premier niveau de la structure de la commande. Elle n'a pas besoin d'accéder aux sous composants. Ainsi la seule interface qui lui est nécessaire est celle de l'objet principal Order. Ses sous composants, du point de vue du contrôleur, peuvent être du *any*.


