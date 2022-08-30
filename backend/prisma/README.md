# Prisma

Toutes les commandes prisma doivent etre executées dans le repo prisma ou se trouve le schema

## Update prisma client

Pour synchroniser le schema prisma avec le prismaClient il faut lancer la commande suivante
on récupère par exemple le typage actualisé ou la bonne url de connection vers prisma 

`npx prisma generate`

## Migrations

### Si aucune database n'existe

2 façons de faire: 

Soit on prend le modèle comme source de référence le schema prisma

1. Ecriture du model 
2. `npx prisma migrate dev`
    --> création de la migration au format sql dans le dossier `migrations`


Soit on prend le schema actuelle de la db via un `db pull`, cela générer le `schema.prisma`, mais si de la data existe elle sera supprimée

Tant qu'on reste en prototyping, on peut `db push` cela push le sql généré par le schema sans créer de migration (limite le nombre de migrations au départ)


### Si une base de données existe déja 

Si on ne veut pas reset la data, on doit faire un `npx prisma migrate diff`
ex : 

`npx prisma migrate diff --from-empty --to-url postgresql://postgres:postgres@localhost:5432/db --script > migrations/0_init/migration.sql`

--from-empty            on considère que l'existant est 0
--to-url                on créé la migration pour arriver a la db actuelle (spécifier l'url de la db actuelle)
--script                print au format sql pour etre utilisé comme migration

On déclare à prisma que la migration tout juste créée a été deja été appliqué car elle correspond à l'état de la db actuelle via la commande suivante

`npx prisma migrate resolve --applied 0_init`

Enfin on peut appliquer le nouveau schema en créant une nouvelle migration via

`npx prisma migrate dev`

Ainsi on a pu conserver la data deja présente dans la db, et prisma est à jour pour les futurs changements

## Seed

In package.json specify 

```json
"prisma": {
    "seed": "<script for seeding>"
}
```

To seed the db run `npx prisma db seed`


## CRUD

### Create

exemple : 

```js
await prisma.content.create({
  // data to create
  data: {
    text: "hello",
    authorId: "ddb4dcfc-7a6a-49ce-8156-da9ebd79953a",
    // Many to many relationship with keywords
    keywords: {
      // connection with other table
      connectOrCreate: [{
        // If name keyA doesnt exist create it
        where: {
          name: "keyA"
        },
        create: {
          name: "keyA"
        }
      }, {
        // same for keyB
        where: {
          name: "keyB"
        },
        create: {
          name: "keyB"
        }
      }]
      
    }
  },
  // include will query the relation of the table
  // for exemple `keywords` is a many-to-many relationship
  include: {
    keywords: {
      // select will pick the field from the table to return
      select: {
        name: true
      }
    },
    author: {
      select: {
        email: true,
        last_name: true,
        first_name: true
      }
    }
  }
})
```