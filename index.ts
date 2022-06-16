import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//call this file for any manual queries
//call 'npx ts-node index.ts'

async function main() {
    // write your Prisma Client queries here

    // await prisma.account.create({
    //     data: {
    //         firstName: 'Test',
    //         lastName: 'Account',
    //         username: 'TestAccount',
    //         email: 'test@gmail.com',
    //         password: 'password'
    //     }
    // })

    const allAccounts = await prisma.account.findMany()
    console.log(allAccounts);
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })