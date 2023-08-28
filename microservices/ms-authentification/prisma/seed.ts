const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.role.upsert({
    where: {name: 'User'},
    update: {},
    create: {
      name: 'User',
      description: 'User Role',
    },
  });

  const admin = await prisma.role.upsert({
    where: {name: 'Admin'},
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator Role',
    },
  });

  const read = await prisma.permission.upsert({
    where: {name: 'Read'},
    update: {},
    create: {
      name: 'Read',
      description: 'Read Permission',
    }
  });

  const write = await prisma.permission.upsert({
    where: {name: 'Write'},
    update: {},
    create: {
      name: 'Write',
      description: 'Write Permission',
    }
  });

  const delete_ = await prisma.permission.upsert({
    where: {name: 'Delete'},
    update: {},
    create: {
      name: 'Delete',
      description: 'Delete Permission',
    }
  });

  await prisma.rolePermission.createMany({
    data: [
      {id_role: admin.id, id_permission: read.id},
      {id_role: admin.id, id_permission: write.id},
      {id_role: admin.id, id_permission: delete_.id},
      {id_role: user.id, id_permission: read.id},
    ],
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
