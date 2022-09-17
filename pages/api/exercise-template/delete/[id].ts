import { ExerciseTemplate } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = ExerciseTemplate | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the id from the request query param
    const {id} = req.query; 

    try{
        //try deleting the exercise template from the database using the supplied id
        const deletedExerciseTemplate = await prisma.exerciseTemplate.delete({
            where: {
                id: parseInt(<string>id)
            }
        })

        return res.status(200).json(deletedExerciseTemplate);
    }
    catch(e){
        return res.status(400).json({error: 'Exercise template not deleted. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}