import type { NextApiRequest, NextApiResponse } from "next";
import { Set, Rep } from "@prisma/client";
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Set| {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the id from the request query parameter
    const {id} = req.query;

    try{
        //delete the set in the database with the queried ID
        const deletedSet = await prisma.set.delete({
            where:{
                id: parseInt(<string>id)
            }
        })

        //return the deleted set and 200 status code
        return res.status(200).json(deletedSet);
    }
    catch(e){
        return res.status(400).json({error: 'Set not deleted. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}