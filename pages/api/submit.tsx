import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

// type ResponseData = {
//     message: string,
//     error: string
// }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed'})
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // $1 required a parametrised query (to prevent injeciton attacks)
        const result = await query(
            'INSERT INTO form_submissions (message) VALUES ($1) RETURNING *',
            [message]
        );

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database Error' });
    }
    
}