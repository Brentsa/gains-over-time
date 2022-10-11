import { Exercise } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma';

type Data = Exercise[] | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the account ID from the request query
    const {accountId} = req.query;

    //find all exercises and include their related sets and account holder
    const allExercises = await prisma.exercise.findMany({
        where: {
            accountId: parseInt(<string>accountId)
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
            sets: {
                select: {
                    id: true
                }
            }
        }
    });

    return res.status(200).json(allExercises);
}