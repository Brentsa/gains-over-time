import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ironOptions } from '../../../utils/iron-session-config'

type Data = {success: string} | {error: string};

export default withIronSessionApiRoute(handler, ironOptions);

function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    //destroy the iron session seal
    req.session.destroy();

    //return a success message indicating the user has logged out
    return res.status(200).json({success: 'Successfully logged out.'})
}
