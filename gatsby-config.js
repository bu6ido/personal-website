const autoprefixer = require("autoprefixer");
//const browserslist = require('browserslist');
const cssvariables = require('postcss-css-variables');
const flexbugsfixes = require('postcss-flexbugs-fixes');
const calc = require('postcss-calc');

module.exports = {
    siteMetadata: {
      title: `Personal website of Ivailo Georgiev`,
      siteUrl: `https://igeorgiev.netlify.app`,
      description: `This is the personal website of Ivailo Valentinov Georgiev - software developer. It consists of Blog, Portfolio and CV.`,
      per_page: 5,        
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sitemap`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-image`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `markdowns`,
          path: `${__dirname}/src/markdowns`,
        },
      },      
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 600,
                linkImagesToOriginal: false,
                showCaptions: true,
              },
            },          
          ],        
        },
      },  
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
           postCssPlugins: [
             autoprefixer(), 
             cssvariables(),
             flexbugsfixes(),
             calc()
           ], 
        },
      },
    ]
}
