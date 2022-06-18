import type { NextApiRequest, NextApiResponse } from 'next'
import { Muscle } from '@prisma/client'
import { prisma } from '../../db/prisma';

type Data = Muscle[] | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //find all the muscles in the database
    const allMuscles = await prisma.muscle.findMany();

    return res.status(200).json(allMuscles);
}