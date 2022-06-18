import type { NextApiRequest, NextApiResponse } from 'next'
import { Muscle, Prisma } from '@prisma/client'
import { prisma } from '../../../db/prisma';

type Data = Muscle | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    try{
        //try creating a new muscle group with the supplied name
        const newMuscle = await prisma.muscle.create({
            data: {
                name: req.body.name
            }
        })
    
        return res.status(200).json(newMuscle);
    }
    catch(e){
        let error = 'Muscle not created.';

        if(e instanceof Prisma.PrismaClientKnownRequestError){
            switch(e.code){
                case 'P2002':
                    console.log(e.message);
                    error = 'Muscle not created. Unique constraint violation.'
                    break;
            }
        }

        return res.status(400).json({error});
    }
    
}