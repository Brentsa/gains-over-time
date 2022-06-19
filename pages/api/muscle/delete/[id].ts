import type { NextApiRequest, NextApiResponse } from 'next'
import { Muscle, Prisma } from '@prisma/client'
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Muscle | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'})
    
    try {
        //delete the muscle associated with the supplied ID from the request query
        const deletedMuscle = await prisma.muscle.delete({
            where: {
                id: parseInt(<string>req.query.id)
            }
        })

        return res.status(200).json(deletedMuscle);
    } 
    catch (e) {
        return res.status(400).json({error: 'Muscle not deleted. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}