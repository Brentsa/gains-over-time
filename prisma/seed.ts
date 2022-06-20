import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const muscleNames: {name: string}[] = [
    {name: 'chest'},
    {name: 'deltoids'},
    {name: 'biceps'},
    {name: 'triceps'},
    {name: 'shoulders'},
    {name: 'glutes'},
    {name: 'quadriceps'},
    {name: 'hamstrings'},
    {name: 'calves'},
    {name: 'lower back'},
    {name: 'upper back'},
    {name: 'lats'},
    {name: 'abs'},
    {name: 'obliques'},
    {name: 'traps'}
]

async function main(){
    console.log('Seeding Started.');

    //create all the muscle groups defined in the muscle names array
    await prisma.muscle.createMany({
        data: muscleNames
    });

    console.log('Muscle groups added.')
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })