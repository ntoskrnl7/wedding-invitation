
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import fetch from 'node-fetch';

export const config: PageConfig = {
    api: {
        responseLimit: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // URL 경로에서 모든 파라미터를 배열로 받기
    const params = req.query.params as string[];

    // 받은 파라미터를 "/"로 조합하여 새로운 경로 생성
    const path = params.join('/');

    // 외부 API URL 설정
    const apiUrl = `http://ntoskrnl7.dothome.co.kr/${path}`;

    try {
        // 외부 API 요청
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 응답의 Content-Type을 체크하여 적절한 형식으로 응답 처리
        const contentType = response.headers.get('Content-Type');
        if (contentType?.includes('application/json')) {
            const data = await response.json();
            res.status(200).json(data);
        } else if (contentType?.includes('text')) {
            const text = await response.text();
            res.status(200).send(text);
        } else {
            // 기타 컨텐츠 타입 처리, 예: binary data
            const buffer = Buffer.from(await response.arrayBuffer());
            res.setHeader('Content-Type', contentType || 'application/octet-stream');
            res.status(200).send(buffer);
        }
    } catch (error: any) {
        // 에러 처리
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
}