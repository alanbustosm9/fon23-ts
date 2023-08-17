/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Configuraciones de tiempo de ejecución del servidor
  },
  publicRuntimeConfig: {
    port: parseInt(process.env.PORT, 10) || 3000, // Puerto predeterminado: 3000
  },
};

module.exports = nextConfig;
