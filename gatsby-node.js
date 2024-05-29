const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const slugify = require('slugify');
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blogs` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      site {
        siteMetadata {
          per_page
        }
      }

      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex: "\/blogs/"} }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      tags: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex: "\/blogs/"} }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }

    }
  `);

  const per_page = result.data.site.siteMetadata.per_page;
  const total = result.data.posts.edges.length;
  const num_pages = Math.ceil(total / per_page);

  Array.from({ length: num_pages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}/`,
      component: path.resolve("./src/templates/blogs.js"),
      context: {
        limit: per_page,
        skip: i * per_page,
        num_pages: num_pages,
        current_page: i + 1,
      },
    })
  });

  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: ('/blogs' + node.fields.slug),
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  });

  result.data.tags.group.forEach(tag => {
    const tags_per_page = result.data.site.siteMetadata.per_page;
    const tags_total = tag.totalCount;
    const tags_num_pages = Math.ceil(tags_total / tags_per_page);
    const tag_slug = slugify(tag.fieldValue, {lower: true});
    
    Array.from({ length: tags_num_pages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? ('/tag/' + tag_slug + '/') : ('/tag/' + tag_slug + `/page/${i + 1}/`),
        component: path.resolve(`./src/templates/tag.js`),
        context: {
          tag: tag.fieldValue,
          limit: tags_per_page,
          skip: i * tags_per_page,
          num_pages: tags_num_pages,
          current_page: i + 1,
        },
      })
    });
  });
}

