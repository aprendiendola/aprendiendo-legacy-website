const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
const withPurgeCss = require("next-purgecss");
const withPlugins = require("next-compose-plugins");
require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpack: (config, options) => {
    config.node = {
      fs: "empty"
    };
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    );

    return config;
  }
};

const plugins = [
  [withImages],
  [
    withPurgeCss,
    {
      // purgecss config
    }
  ],
  [withSass]
];

module.exports = withPlugins(plugins, nextConfig);
