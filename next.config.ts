import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    reactCompiler: true,
    serverComponentsExternalPackages: ['sequelize', 'pino', 'pino-pretty']
  }
};

export default nextConfig;
