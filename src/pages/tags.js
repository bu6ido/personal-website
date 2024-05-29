import React from "react"
import { Link, graphql } from "gatsby"
import slugify from "slugify"
import Container from "../components/container"
import { FaTags } from 'react-icons/fa';

const Tags = ({ data }) => (
    <Container>
       <h2><FaTags className="header-icon" />Tags</h2>
       <div className="main flex-vertical-xs">
         <div className="blog-post-single flex-vertical-xs">
           <div className="blog-all-tags flex-vertical-xs">
            {data.allMarkdownRemark.group.map((tag, index) =>
                <p className="tag" key={index}>
                    <Link to={`/tag/${slugify(tag.fieldValue, {lower: true})}`} className="flex-horizontal-xs">
                        {tag.fieldValue} <span className="tag-badge">{tag.totalCount}</span>
                    </Link>
                </p>
            )}
           </div>
         </div>
       </div>
    </Container>
);

export const query = graphql`
query {

  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/blogs/"}}
  ) {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }

}
`;

export default Tags;

