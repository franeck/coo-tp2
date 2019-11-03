# TP 2 - Principes POO & Design Patterns

> Franciszek Dobrowolski - AP5 2019-2020 

## Question 5

Nous sommes quasiment en présence d’un pattern d’architecture connu destiné aux UI. Nommez ce principe.
Pour le respecter entièrement nous allons créer une classe Order qui fera office de modèle. Elle prendra en paramètre de constructeur, ce que nous avons créé dans l’énoncé précédent, et contiendra l’interaction avec le stockage Redis.

## Réponses

Il s'agit du modèle MVC. 

La classe Order a déjà été implementée dans les questions précedantes.

## Commentaires

Il n'est pas clair pour moi, pourquoi la classe Order devrait comporter l'interaction avec le stockage. La responsabilité du modèle n'est pas de se persister lui-même. Implémenter cette partie dans cette classe serait contradictoire au principe de responsabilité unique.


