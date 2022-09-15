import { ExerciseTemplate } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma';

type Data = ExerciseTemplate | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the id from the request query
    const {id} = req.query;

    //try finding a unique exercise template with the supplied id and include muscles and account info
    const exerciseTemplate = await prisma.exerciseTemplate.findUnique({
        where: {
            id: parseInt(<string>id)
        },
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
    })

    //if the variable returns undefined return an error
    if(!exerciseTemplate) return res.status(400).json({error: 'Exercise template not found.'});

    return res.status(200).json(exerciseTemplate);
}