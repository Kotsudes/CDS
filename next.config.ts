import {connectDatabase} from "@/libs/database"

connectDatabase();

const nextConfig = (_phase, { _defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        /* config options here */
    }
    return nextConfig
}

// @ts-check
export default nextConfig;