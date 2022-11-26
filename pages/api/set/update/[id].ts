import type { NextApiRequest, NextApiResponse } from 'next'
import { Set } from '@prisma/client'
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Set | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method'});

    //destructure the id from the request query
    const {id} = req.query;

    //destructure the exercise ID from the request body
    const {quantity, weight} = req.body;

    try{
        //use prisma to update the queried exercise in the db
        const updatedExercise = await prisma.set.update({
            where: {
                id: parseInt(<string>id)
            },
            data: {
               quantity: typeof quantity === 'string' ? parseInt(quantity) : quantity,
               weight: typeof weight === 'string' ? parseInt(weight) : weight
            }
        })

        //if ther are no errors return the exercise
        return res.status(200).json(updatedExercise);
    }
    catch(e){
        return res.status(400).json({error: 'Set not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)})
    }
}