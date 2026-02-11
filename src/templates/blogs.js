import React from "react"
import { Link, graphql } from "gatsby"
import Container from "../components/container"
import Pager from "../components/pager"
import { FaBlogger } from 'react-icons/fa'

const Blogs = ({ pageContext, data }) => {
    const { num_pages, current_page } = pageContext;
    return (
        <Container>
            <h2><FaBlogger className="header-icon" />Posts</h2>
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

            <Pager parentUrl="" page={current_page} pagesCount={num_pages} />
        </Container>
    );
};

export const query = graphql`
query ($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/blogs/"}}
    sort: {fields: frontmatter___date, order: DESC}
    limit: $limit
    skip: $skip
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

export default Blogs;

