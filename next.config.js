/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      use: [
        options.defaultLoaders.babel,
        'raw-loader',
        {
          loader: 'glslify-loader',
          options: {
            transform: []
          }
        },
      ]
    })


    return config
  },
}

module.exports = nextConfig
