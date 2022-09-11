const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Gatsby',
    description: 'gatsby docz login',
  },

  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        host: '0.0.0.0',
        port: 3000,
        p: 3000,
        title: 'Gatsby',
        description: 'gatsby docz login',
      },
    },
  ],
};

module.exports = config;
