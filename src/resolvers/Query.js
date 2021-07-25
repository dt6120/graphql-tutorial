const feed = async (parent, args, context, info) => {
  const where = args.filter ? {
    OR: [
      { description: { contains: args.filter } },
      { url: { contains: args.filter } }
    ]
  } : {}

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  })

  const count = await context.prisma.link.count({ where, skip: args.skip, take: args.take })

  return {
    links,
    count
  }
}

const link = async (parent, args, context, info) => {
  return await context.prisma.link.findUnique({ where: { id: Number(args.id) } })
}

module.exports = {
  feed,
  link
}