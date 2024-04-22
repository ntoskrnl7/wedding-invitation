
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import fetch from 'node-fetch';
import { Readable } from 'node:stream';

// 페이지 구성
export const config: PageConfig = {
    api: {
        responseLimit: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const params = req.query.params as string[];
    try {
        const response = await fetch(`https://raw.githubusercontent.com/ntoskrnl7/wedding-invitation-data/main/${params.join('/')}`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        if (response.redirected) {
            throw new Error(`API call failed with status: redirected ${response.url}`);
        }

        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Content-Type', response.headers.get('Content-Type') || 'application/x-www-form-urlencoded');

        const stream = response.body as Readable;
        stream.pipe(res);
        stream.on('end', () => res.end());

    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
        res.end();
    }
}