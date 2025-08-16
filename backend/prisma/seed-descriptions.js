import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding sample project with descriptions...');

  // Create sample project with descriptions
  const project = await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      imgPath: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      githubUrl: 'https://github.com/example/ecommerce',
      previewUrl: 'https://example-ecommerce.com',
      featured: true,
      descriptions: {
        create: [
          {
            title: 'Project Overview',
            points: JSON.stringify([
              'Full-stack e-commerce platform built with modern technologies',
              'Responsive design that works seamlessly across all devices',
              'Secure payment processing with multiple payment gateways',
              'Real-time inventory management and order tracking'
            ]),
            order: 0
          },
          {
            title: 'Key Features',
            points: JSON.stringify([
              'User authentication and authorization system',
              'Product catalog with advanced search and filtering',
              'Shopping cart and wishlist functionality',
              'Admin dashboard for managing products and orders',
              'Email notifications for order confirmations'
            ]),
            order: 1
          },
          {
            title: 'Technical Highlights',
            points: JSON.stringify([
              'Built with React.js and Node.js for optimal performance',
              'PostgreSQL database with Prisma ORM for data management',
              'RESTful API design with comprehensive error handling',
              'Implemented JWT authentication for secure user sessions',
              'Deployed on AWS with CI/CD pipeline using GitHub Actions'
            ]),
            order: 2
          }
        ]
      }
    },
    include: {
      descriptions: true
    }
  });

  console.log('Sample project created:', project.title);
  console.log('Descriptions added:', project.descriptions.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });