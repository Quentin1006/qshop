import crypto from 'crypto';
import { getProducts } from './helper.mjs';
import prisma from './prisma-client.mjs';

const runSeed = async () => {
  try {
    await prisma.tag.deleteMany({});
    const tags = await prisma.tag.createMany({
      data: [
        {
          name: 'fashion',
        },
        {
          name: 'high-tech',
        },
        {
          name: 'decoration',
        },
        {
          name: 'miscelleanous',
        },
      ],
      skipDuplicates: true,
    });

    const adminRole = await prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
      },
    });

    const userRole = await prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: {
        name: 'USER',
      },
    });

    const quentin = await prisma.user.upsert({
      where: {
        email: 'quentin.sahal@gmail.com',
      },
      update: {},
      create: {
        email: 'quentin.sahal@gmail.com',
        firstname: 'quentin',
        lastname: 'sahal',
        roleId: adminRole.id,
      },
    });

    const gaetan = await prisma.user.upsert({
      where: {
        email: 'gaetan.sahal@gmail.com',
      },
      update: {},
      create: {
        email: 'gaetan.sahal@gmail.com',
        firstname: 'gaetan',
        lastname: 'sahal',
        roleId: adminRole.id,
      },
    });

    await prisma.rate.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.productDetails.deleteMany({});
    await prisma.basketItem.deleteMany({});
    await prisma.basket.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.store.deleteMany({});
    await prisma.returnPolicy.deleteMany({});

    const storeSafeDefense = await prisma.store.create({
      data: {
        name: 'SAFE DEFENSE',
      },
    });

    const product1 = await prisma.product.create({
      data: {
        name: 'REDimpact Spray Anti Agression de Poche Gel 40 ML | Taille Standard - Format : Sac a Main Femme, Manteau Femme, Sacoche Homme, Veste, Sac a Dos',
        price: 24.95,
        discount: 5,
        sku: 3000,
        link: 'http://localhost:5555/images/71twbu4qqrL.jpg',
        rate: {
          create: {
            value: 4.5,
            votes: 2773,
          },
        },
        tags: {
          connect: [
            {
              name: 'miscelleanous',
            },
          ],
        },
      },
    });

    const freeReturnPolicy = await prisma.returnPolicy.create({
      data: {
        fees: 0,
        delayPeriodInDays: 30,
        details:
          "Les retours gratuits sont disponibles pour l'adresse d'expédition que vous avez choisie. Vous pouvez retourner l'article pour n'importe quelle raison dans son état neuf et inutilisé, sans frais de retour.",
        type: 'FREE_30',
      },
    });

    await prisma.productDetails.create({
      data: {
        longDescription:
          "La marque SAFE DEFENSE a développé un spray anti-agression composé d'un gel défensif de nouvelle génération que vous pouvez porter et transporter de manière totalement légale. REDimpact est le spray d'autodéfense 100 % légal ! La consistance de gel adhère à la peau et est extrêmement difficile à enlever, reste pendant plusieurs jours. Le spray a une buse fine et courte pour stimuler le gel sous forme de spray concentré. Il ne se disperse pas et il n'y a aucun risque que le vent souffle le le produit vers vous ou toucher des tiers. Peut être utilisé dans des endroits fermés. Le port effectif est d'environ 4 mètres, ce qui est d'excellentes performances pour un spray.",
        brand: 'SAFE DEFENSE',
        caracteristics: JSON.stringify([
          'Obturation immédiate des yeux',
          "Perturbation de la vision de l'agresseur",
          'Brume visuelle et cognitive',
          "Désorption immédiate de l'agresseur",
          'marque brevetée avec capuchon de sécurité de déclenchement anti-accidentel',
        ]),
        technicalDescription: JSON.stringify({
          poids: '66 Grammes',
          'piles incluses': 'Non',
          marque: 'SAFE DEFENSE',
          fabricant: 'SAFE DEFENSE',
          'référence constructeur': 'partnumber_8476',
          'dimensions du produit (L x l x h)': '4 x 3,8 x 9 cm; 100 grammes',
          ASIN: 'B07NLKZS8K',
        }),
        storeId: storeSafeDefense.id,
        productId: product1.id,
        returnPolicyId: freeReturnPolicy.id,
      },
    });

    const products = await getProducts();
    for (const p of products) {
      const group = crypto.createHash('md5').update(p.name).digest('hex');
      const distImages = p.imagesSrc.map((src) => {
        const imgName = src.split('/').pop();
        return `http://localhost:5555/images/${group}/${imgName}`;
      });
      const createdProduct = await prisma.product.create({
        data: {
          name: p.name,
          price: p.price,
          link: distImages[0],
          altLinks: distImages.slice(1, p.imagesSrc.length - 1),
          sku: p.sku,
          discount: p.discount,
          rate: {
            create: {
              value: p.rate.value,
              votes: p.rate.votes,
            },
          },
          tags: {
            connectOrCreate: p.tags.map((tag) => {
              return {
                where: { name: tag.replace(' ', '-') },
                create: { name: tag.replace(' ', '-') },
              };
            }),
          },
        },
      });

      await prisma.productDetails.create({
        data: {
          longDescription: p.longDescription,
          brand: p.brand,
          caracteristics: JSON.stringify(p.caracteristics),
          technicalDescription: JSON.stringify(p.technicalDescription),
          storeId: storeSafeDefense.id,
          productId: createdProduct.id,
          returnPolicyId: freeReturnPolicy.id,
        },
      });
    }

    await prisma.comment.createMany({
      data: [
        {
          content: 'Super produit',
          rate: 4.5,
          authorId: quentin.id,
          productId: product1.id,
        },
        {
          content: 'Un peu déçu, mais correct',
          rate: 3.5,
          authorId: gaetan.id,
          productId: product1.id,
        },
      ],
    });

    const basket = await prisma.basket.upsert({
      where: { refId: quentin.id },
      update: {},
      create: {
        state: 'ACTIVE',
        refId: quentin.id,
      },
    });

    // #A.2

    const itemAddedToBasket = await prisma.basketItem.create({
      data: {
        quantity: 2,
        basket: {
          connect: {
            refId: quentin.id,
          },
        },
        state: 'ACTIVE',
        product: {
          connect: {
            id: product1.id,
          },
        },
      },
    });

    const updatedBasket = await prisma.basket.findFirst({
      where: {
        refId: quentin.id,
      },
      select: {
        items: {
          select: {
            productId: true,
            state: true,
            dateAdded: true,
          },
        },
      },
    });

    // const updatedBasket = await prisma.basket.update({
    //   where: {
    //     id: basket.id,
    //   },
    //   data: {
    //     items
    //   },
    //   include: {
    //     items: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //   },
    // });

    // #S.2
    const tag = await prisma.tag.findFirst();
    const first100ProductsFor = await prisma.product.findMany({
      take: 100,
      where: {
        tags: { some: { name: tag.name } },
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    // #S.3 - #S.4
    await prisma.user.update({
      where: {
        email: quentin.email,
      },
      data: {
        productsBought: {
          connect: [
            {
              id: product1.id,
            },
          ],
        },
      },
    });

    // #S.4
    const productsBoughtByQuentin = await prisma.product.findMany({
      where: {
        boughtBy: {
          some: {
            email: quentin.email,
          },
        },
      },
    });

    // S.5a
    const productDetailsWithComments = await prisma.product.findUnique({
      where: {
        id: product1.id,
      },
      select: {
        name: true,
        price: true,
        rate: {
          select: {
            id: true,
            value: true,
            votes: true,
          },
        },
        comments: {
          take: 10,
          select: {
            id: true,
            rate: true,
            content: true,
            author: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        },
      },
    });

    // S.5b
    const productDetails = await prisma.product.findUnique({
      where: {
        id: product1.id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        rate: {
          select: {
            value: true,
            votes: true,
          },
        },
      },
    });
    const commentsForProduct = await prisma.comment.findMany({
      where: {
        productId: productDetails.id,
      },
      take: 10,
      select: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    // #C.1
    prisma.comment.create({
      data: {
        rate: 4.0,
        content: 'Some new comment',
        authorId: quentin.id,
        productId: product1.id,
      },
    });

    // #C.2
    const newRate =
      (productDetails.rate.value * productDetails.rate.votes + 1.5) /
      (productDetails.rate.votes + 1);
    const updatedWithNewRate = await prisma.product.update({
      where: {
        id: productDetails.id,
      },
      data: {
        rate: {
          update: {
            value: newRate,
            votes: { increment: 1 },
          },
        },
      },
      include: {
        rate: {
          select: {
            value: true,
            votes: true,
          },
        },
      },
    });

    // Create user after registration
    const newlyAddedUser = await prisma.user.upsert({
      where: { id: 't1234' },
      update: {},
      create: {
        id: 't1234',
        email: 'iam.new@gmail.com',
        createdAt: new Date(),
        lastname: undefined,
        firstname: 'iam.new',
        roleId: userRole.id,
      },
    });

    console.log('end');
  } catch (error) {
    console.error({ error });
  }
};

runSeed();
