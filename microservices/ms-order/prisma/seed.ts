const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const statusOrders = [
    { libelle: 'Pending' },
    { libelle: 'Processing' },
    { libelle: 'Completed' },
    { libelle: 'Cancelled' },
    // Add more status entries as needed
  ];

  for (const status of statusOrders) {
    await prisma.statusOrder.create({ data: status });
  }

  console.log('StatusOrder seed data created.');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });