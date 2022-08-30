import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$on('query', (e) => {
  console.log('------------------------------');
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
  console.log('------------------------------');
});

export default prisma;
