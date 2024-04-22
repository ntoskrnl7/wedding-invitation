/** @type {import('next').NextConfig} */
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    optimizeFonts: false,
    sassOptions: {
        includePaths: [join(__dirname, 'styles')],
    },
};

export default nextConfig;
