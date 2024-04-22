
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import fetch from 'node-fetch';
import { LRUCache } from 'lru-cache';

// 페이지 구성
export const config: PageConfig = {
    api: {
        responseLimit: false,
    },
}

type CacheValue = { contentType: string, body: any; };

// 캐시 설정
const cache = new LRUCache<string, CacheValue>({
    max: 1000,
    fetchMethod: async (key: string): Promise<CacheValue> => {
        const response = await fetch(`https://wedding-invitation-data.vercel.app/${key}`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        if (response.redirected) {
            throw new Error(`API call failed with status: redirected ${response.url}`);
        }
        const contentType = response.headers.get('Content-Type') || 'application/x-www-form-urlencoded';
        if (contentType.includes('application/json')) {
            return { contentType, body: await response.json() };
        } else if (contentType?.includes('text')) {
            return { contentType, body: await response.text() };
        } else {
            return { contentType, body: Buffer.from(await response.arrayBuffer()) };
        }
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const params = req.query.params as string[];
    try {
        // 캐시에서 데이터를 가져오거나 fetchMethod를 통해 새로 가져오기
        const value = await cache.fetch(params.join('/'));
        if (!value) {
            res.status(500).json({ message: 'invalid data' });
            return;
        }

        // 콘텐츠 타입 설정
        res.setHeader('Content-Type', value.contentType);

        // 응답 반환
        res.status(200).send(value.body);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
}