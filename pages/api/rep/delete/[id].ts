import type { NextApiRequest, NextApiResponse } from "next";
import { Rep } from "@prisma/client";
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Rep | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'});

    //instantiate a copy of the id from the request query
    const id: number = parseInt(<string>req.query.id);

    try{
        //delete the rep using the queried rep ID
        const deletedRep = await prisma.rep.delete({
            where: {
                id
            }
        })

        //return the deleted set and 200 status code
        return res.status(200).json(deletedRep);
    }
    catch(e){
        return res.status(400).json({error: 'Set not deleted. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}