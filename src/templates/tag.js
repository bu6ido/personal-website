import React from "react"
import { Link, graphql } from "gatsby"
import slugify from "slugify"
import Container from "../components/container"
import Pager from "../components/pager"
import { FaTag } from 'react-icons/fa'

const Tag = ({ pageContext, data }) => {
    const { tag, num_pages, current_page } = pageContext;
    const tag_slug = slugify(tag, {lower: true});
    return (
        <Container>
            <h2><FaTag className="header-icon" />Posts with tag: <span>{tag}</span></h2>
            <div className="main grid-vertical-xs grid-horizontal-md">
                {data.allMarkdownRemark.edges.map(({ node }, index) => (
                    <div className="blog-post flex-vertical-xs" key={index}>
                        <span className="blog-title one-line-clamp">
                        <Link to={'/blogs' + node.fields.slug}>
                            {node.frontmatter.title}
                        </Link>
                        </span>
                        <span className="blog-date">
                            <i>Posted on:</i> 
                            <strong>{node.frontmatter.date}</strong>
                        </span>
                        <p className="blog-body one-line-clamp">
                            {node.excerpt}
                        </p>
                    </div>
                ))}
            </div>

            <Pager parentUrl={`/tag/${tag_slug}`} page={current_page} pagesCount={num_pages} />
        </Container>
    );
};

export const query = graphql`
query ($tag: String, $skip: Int!, $limit: Int!) {

  allMarkdownRemark(
    limit: $limit,
    skip: $skip,
    sort: {fields: frontmatter___date, order: DESC},
    filter: { 
      fileAbsolutePath: {regex: "\/blogs/"},
      frontmatter: { tags: { in: [$tag] } }
    }
  ) {
    edges {
      node {
        excerpt(pruneLength: 60)
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields {
          slug
        }
      }
    }
  }

}
`;

export default Tag;

