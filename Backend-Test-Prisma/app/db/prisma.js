// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../prisma/generated/client/edge')


const prisma = new PrismaClient()

module.exports = prisma