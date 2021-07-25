const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const main = async () => {
  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tutorial for GraphQL',
      url: 'https://howtographql.com'
    }
  })

  const allLinks = await prisma.link.findMany()
  console.log(allLinks)
}

main()
  .catch(error => console.log(error.message))
  .finally(async () => await prisma.$disconnect())