import React, { useState /*, useEffect*/ ,useRef } from "react"
import { /*Link,*/ graphql } from "gatsby"
//import slugify from "slugify"
import Container from "../components/container"
import { IoDocuments } from 'react-icons/io5';

const Tags = ({ data }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [img, setImg] = useState(null);
  const imageRef = useRef(null);
  
  const showModal = (e, imag) => {
    e.preventDefault();
    setImg(imag);
    setModalOpen(true);
  };
    
  const hideModal = (e) => {
    if (e.target && imageRef && imageRef.current && (e.target === imageRef.current)) {
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    setModalOpen(false);
  };
  
return (
    <Container>
    <h2><IoDocuments className="header-icon" />Portfolio</h2>
    <div className="main flex-vertical-xs">  
    { data.allMarkdownRemark.nodes.map(n => (
      <div className="project flex-vertical-xs" key={n.id}>
        <span className="project-title"><a href={n.frontmatter.url} target="_blank" rel="noreferrer">{n.frontmatter.title}</a></span>
        <i>Technologies:</i>
        <p className="project-tags flex-horizontal-xs"> 
          { n.frontmatter.tech.map(t => (
          <span className="tag" key={t}>{t}</span>
          ) )} 
        </p>        
        <div className="project-shots flex-vertical-xs flex-horizontal-md">
          { n.frontmatter.images.map(i => (
            <img src={i.publicURL} alt={i.base} onClick={e => { showModal(e, i); }} onKeyDown={e => { showModal(e, i); }} key={i.id} />
          ) )}
        </div>
        <div className="project-body" dangerouslySetInnerHTML={{ __html: n.html }} />
      </div> 
      ) )}
    </div>
      
  <div className={`project-shot-modal ${modalOpen? 'open' : ''}`} onClick={hideModal} onKeyDown={hideModal} aria-hidden="true">
    <div className="project-shot-modal-content">
      <span className="close" onClick={hideModal} onKeyDown={hideModal} aria-hidden="true" />
      <img src={img? img.publicURL : '#'} alt={img? img.base : '#'} ref={imageRef} />
    </div>
  </div>
    
    </Container>
);
}

export const query = graphql`
query {

  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/portfolio/"}}
    sort: {order: ASC, fields: fields___slug}
  ) {
    nodes {
      id
      frontmatter {
        title
        url
        tech
        images {
          id
          publicURL
          base
        }
      }
      html
    }
  }

}
`;

export default Tags;

