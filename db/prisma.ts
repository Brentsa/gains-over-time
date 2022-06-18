import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

//instantiate a single prisma client and save it on the global object
export const prisma = global.prisma || new PrismaClient({log: ['query']});

if(process.env.NODE_ENV !== 'production') global.prisma = prisma;