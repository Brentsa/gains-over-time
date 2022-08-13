import type { NextApiRequest, NextApiResponse } from "next";
import { Rep } from "@prisma/client";
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Rep | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method.'})

    //destructure the id from the request query
    const {id} = req.query;

    try{
        //try updating the rep in the database with the infomation supplied in the request body
        const updatedRep = await prisma.rep.update({
            where: {
                id: parseInt(<string>id)
            },
            data: {
                ...req.body
            }
        });

        return res.status(200).json(updatedRep);
    }
    catch(e){
        //return the prisma error if the update fails
        return res.status(400).json({error: 'Rep not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}