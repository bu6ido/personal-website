import React from "react"
import { Link, graphql } from "gatsby"
import slugify from "slugify"
import Container from "../components/container"
import { FaBlogger } from 'react-icons/fa'

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Container>
      <h2><FaBlogger className="header-icon" />Blog post</h2>
      <div className="main flex-vertical-xs">
        <div className="blog-post-single flex-vertical-xs">
          <span className="blog-title">{post.frontmatter.title}</span>
          <span className="blog-date"><i>Posted on:</i> <strong>{post.frontmatter.date}</strong> </span>
          <p className="blog-tags flex-horizontal-xs"><i>Tags:</i>
        {post.frontmatter.tags.map(t => 
            <span className="tag" key={t}><Link to={`/tag/${slugify(t, {lower: true})}`}>{t}</Link></span>
        )}
          </p>
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Container>
  )
};
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
      }
    }
  }
`;

export default BlogPost;

