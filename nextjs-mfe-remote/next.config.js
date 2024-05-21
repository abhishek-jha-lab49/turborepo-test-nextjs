/**
 * @type {import('next').NextConfig}
 */
const NextFederationPlugin = require("@module-federation/nextjs-mf/lib/NextFederationPlugin");
const deps = require("./package.json").dependencies;

const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nextJsRemote",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./nextjs-remote-component":
            "./components/nextjs-remote-component.tsx",
        },
        shared: {
          react: {
            singleton: true,
            strictVersion: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            strictVersion: true,
            requiredVersion: deps["react-dom"],
          },
        },
        extraOptions: {
          skipSharingNextInternals: true,
        },
      })
    );
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  // your original next.config.js export
  reactStrictMode: true
};

module.exports = nextConfig;
