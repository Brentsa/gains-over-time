import { ExerciseTemplate } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db/prisma';

type Data = ExerciseTemplate[] | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //find all exercises and include their related muscles and account holder
    const allExerciseTemplates = await prisma.exerciseTemplate.findMany({
        include: {
            account: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true
                }
            },
            muscles: {
                select: {
                    id: true, 
                    name: true
                }
            }
        }
    });

    return res.status(200).json(allExerciseTemplates);
}