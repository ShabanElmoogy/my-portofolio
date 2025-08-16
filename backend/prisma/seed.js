
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: 'Project 1',
        category: 'Web Development',
        imgPath: '/1.jpg',
        technology: 'React,Node.js,Express',
      },
      {
        title: 'Project 2',
        category: 'Web Development',
        imgPath: '/2.jpg',
        technology: 'Angular,TypeScript,Firebase',
      },
      {
        title: 'Project 3',
        category: 'Mobile Development',
        imgPath: '/3.jpg',
        technology: 'React Native,Firebase',
      },
      {
        title: 'Project 4',
        category: 'Mobile Development',
        imgPath: '/4.jpg',
        technology: 'Flutter,Dart,Firebase',
      },
      {
        title: 'Project 5',
        category: 'Web Development',
        imgPath: '/5.jpg',
        technology: 'Vue,Nuxt.js,Firebase',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
