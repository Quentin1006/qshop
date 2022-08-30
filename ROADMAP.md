## FRONTEND

* I18n renseigner tous les wording via un fichier de config json
* gérer un mapping pour les categories remontées depuis la db pour l'i18n
* Gérer la config 
* Créer un cdn pour héberger les images et pouvoir appeler une api pour savoir quels images servir
*  Broadcast Channel API pour mettre à jour automatiquement le state (et le panier ? )

## BACKEND

### USE CASES

#### Bucket related

- Create #B.1
- Add product to bucket #B.2
- Remove product from bucket #B.3
- Archive Bucket #B.4

#### Order Related

- Create order (when click on pay) #O.1
- Attach delivery address to order #O.4
- Attach shipping mode to order #O.5
- Register payment mode #O.6
- Redirect to payment solution #O.7
- Transfer order to Transporter #O.8
- Create SAV Ticket #O.10
- Cancel order #O.15

#### Search related

- Find all products (LIMIT X) #S.1
- Find all products from a category #S.2
- Find all products search from a user #S.3 (same as #S.4)
- Find all products bought by users #S.4
- Find a product along with its rate and comments #S.5a
- Find a product along with its rate and comments separately #S.5b

#### MISC

- Add comment to product #C.1
- Rate product (can be when adding comment) #C.2
- Return product (remove from bought items + cancel order or part of the order) #C.3

## CDN

* A créer, heberge les images