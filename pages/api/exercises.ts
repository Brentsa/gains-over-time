import { Exercise } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db/prisma';

type Data = Exercise[] | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //find all exercises and include their related muscles
    const allExercises = await prisma.exercise.findMany({
        include: {
            muscles: true
        }
    });

    return res.status(200).json(allExercises);
}