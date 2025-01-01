/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDatabase } from "@/libs/database"

connectDatabase();

const nextConfig = (_phase: any, { _defaultConfig }: any) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        experimental: {
            turbo: {

            }
        },
    }
    return nextConfig
}

// @ts-check
export default nextConfig;