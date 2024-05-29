import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import { FaGoogle, FaSkype, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IoNewspaper } from 'react-icons/io5';

const About = ({ data }) => {
  let cvp = data.cvp.edges;
  let cvedu = data.cvedu.edges;
  let cvwork = data.cvwork.edges;
  let cvlang = data.cvlang.edges;
  let cvskills = data.cvskills.edges;

  return (
  <Container>
       <h2><IoNewspaper className="header-icon" />About</h2>
       <div className="main flex-vertical-xs">
         <div className="article flex-vertical-xs">
           <span className="article-title">About me</span>
           <p className="article-body">
             Hello! My name is <strong>Ivailo Valentinov Georgiev</strong> and I work as a software developer.
             Welcome to my personal website! I hope you find interesting stuff here.
           </p>
         </div>
           {cvp.map(({ node }, index) => (
           <div key={index} className="article flex-vertical-xs">
             <span className="article-title">Personal Data:</span>
             <table className="article-table">
               <tbody>
                 <tr>
                   <td>First name:</td>
                   <td>{node.frontmatter.first_name}</td>
                 </tr>
                 <tr>
                   <td>Middle name:</td>
                   <td>{node.frontmatter.middle_name}</td>
                 </tr>
                 <tr>
                   <td>Family name:</td>
                   <td>{node.frontmatter.family_name}</td>
                 </tr>
                 <tr>
                   <td>Gender:</td>
                   <td>{node.frontmatter.gender}</td>
                 </tr>
                 <tr>
                   <td>Birth date:</td>
                   <td>{node.frontmatter.birth_date}</td>
                 </tr>
                 <tr>
                   <td>Lives in:</td>
                   <td>{node.frontmatter.lives_in}</td>
                 </tr>
                 <tr>
                   <td>Email:</td>
                   <td>{node.frontmatter.email}</td>
                 </tr>
               </tbody>
             </table>
           </div>
           ))}

           <div className="article flex-vertical-xs">
             <span className="article-title">Education:</span>
             {cvedu.map(({ node }, index) => (
               <table key={index} className="article-table">
                 <thead>
                   <tr>
                     <th colSpan={2}>#{index + 1}</th>
                   </tr>
                 </thead>
                 <tbody>
                    <tr>
                      <td>Period:</td>
                      <td>{node.frontmatter.start_date || 'Past'} - {node.frontmatter.end_date || 'Present'}</td>
                    </tr>
                    <tr>
                      <td>School:</td>
                      <td>{node.frontmatter.school}</td>
                    </tr>
                    <tr>
                      <td>Location:</td>
                      <td>{node.frontmatter.location}</td>
                    </tr>
                    <tr>
                      <td>Level:</td>
                      <td>{node.frontmatter.level}</td>
                   </tr>
                   <tr>
                     <td>Major:</td>
                     <td>{node.frontmatter.major}</td>
                   </tr>
                   <tr>                     
                     <td>Description</td>
                     <td><div dangerouslySetInnerHTML={{ __html: node.html }} /></td>
                   </tr>
                 </tbody>
               </table>
             ))}
           </div>

           <div className="article flex-vertical-xs">
             <span className="article-title">Work Experience:</span>
             {cvwork.map(({ node }, index) => (
               <table key={index} className="article-table">
                 <thead>
                   <tr>
                     <th colSpan={2}>#{index + 1}</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Period:</td>
                     <td>{node.frontmatter.start_date || 'Past'} - {node.frontmatter.end_date || 'Present'}</td>
                   </tr>
                   <tr>
                     <td>Job title:</td>
                     <td>{node.frontmatter.job_title}</td>
                   </tr>
                   <tr>
                     <td>Company/Organization:</td>
                     <td>{node.frontmatter.company}</td>
                   </tr>
                   <tr>
                     <td>Business sector:</td>
                     <td>{node.frontmatter.category}</td>
                   </tr>
                   <tr>
                     <td>Location:</td>
                     <td>{node.frontmatter.location}</td>
                   </tr>
                   <tr>
                     <td>Company size:</td>
                     <td>{node.frontmatter.company_size} people</td>
                   </tr>
                   <tr>
                     <td>Description</td>
                     <td><div dangerouslySetInnerHTML={{ __html: node.html }} /></td>
                   </tr>
                 </tbody>
               </table>
             ))}
           </div>

           <div className="article flex-vertical-xs">
             <span className="article-title">Languages:</span>
             {cvlang.map(({ node }, index) => (
               <table key={index} className="article-table">
                 <thead>
                   <tr>
                     <th colSpan={2}>#{index + 1}</th>
                   </tr>
                 </thead>
                 <tbody>
                   {node.frontmatter.is_mother? 
                   <tr>
                     <td>Mother tongue:</td>
                     <td>{node.frontmatter.lang}</td>
                   </tr> :

                   <>
                   <tr>
                     <td>Language:</td>
                     <td>{node.frontmatter.lang}</td>
                   </tr>
                   <tr>
                     <td>Comprehension:</td>
                     <td>{node.frontmatter.comp}</td>
                   </tr>
                   <tr>
                     <td>Read:</td>
                     <td>{node.frontmatter.read}</td>
                   </tr>
                   <tr>
                     <td>Write:</td>
                     <td>{node.frontmatter.write}</td>
                   </tr>
                   </>
                   }
                 </tbody>
               </table>
             ))}
           </div>

           <div className="article flex-vertical-xs">
             <span className="article-title">Skills:</span>
             <table className="article-table">
               <tbody>
               {cvskills.map(({ node }, index) => (
                 <tr key={index}>
                   <td>{node.frontmatter.skills_type}</td>
                   <td><div dangerouslySetInnerHTML={{ __html: node.html }} /></td>
                 </tr>
               ))}
               </tbody>
             </table>
           </div>

           <div className="article flex-vertical-xs">
             <span className="article-title">Contacts:</span>
             <p className="article-body">You can find me here:</p>
             <table className="article-table">
               <tbody>
                 <tr>
                   <td className="td-social-icon"><FaGoogle className="social-icon-google" title="Google" /></td>
                   <td><a href="mailto:bu6ido@gmail.com">bu6ido@gmail.com</a></td>
                 </tr>
                 <tr>
                   <td className="td-social-icon"><FaSkype className="social-icon-skype" title="Skype" /></td>
                   <td>bu6ido1</td>
                 </tr>
                 <tr>
                   <td className="td-social-icon"><FaFacebook className="social-icon-facebook" title="Facebook" /></td>
                   <td><a href="https://www.facebook.com/bu6ido1" target="_blank" rel="noopener noreferrer">https://www.facebook.com/bu6ido1</a></td>
                 </tr>
                 <tr>
                   <td className="td-social-icon"><FaLinkedin className="social-icon-linkedin" title="Linkedin" /></td>
                   <td><a href="https://www.linkedin.com/in/bu6ido" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/bu6ido</a></td>
                 </tr>
               </tbody>
             </table>
           </div>
       </div>
  </Container>
  );
}

export const query = graphql`
query {

  cvp: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/cv_personal/"}}
    sort: {fields: fields___slug, order: ASC}
  ) {
    edges {
      node {
        frontmatter {
          first_name
          middle_name
          family_name
          gender
          birth_date(formatString: "DD MMMM YYYY")
          lives_in
          email
        }
      }
    }
  }

  cvedu: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/cv_education/"}}
    sort: {fields: fields___slug, order: ASC}
  ) {
    edges {
      node {
        frontmatter {
          start_date(formatString: "MMMM YYYY")
          end_date(formatString: "MMMM YYYY")
          school
          location
          level
          major
        }
        html
      }
    }
  }

  cvwork: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/cv_work/"}}
    sort: {fields: fields___slug, order: ASC}
  ) {
    edges {
      node {
        frontmatter {
          start_date(formatString: "MMMM YYYY")
          end_date(formatString: "MMMM YYYY")
          job_title
          company
          category
          location
          company_size
        }
        html
      }
    }
  }

  cvlang: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/cv_lang/"}}
    sort: {fields: fields___slug, order: ASC}
  ) {
    edges {
      node {
        frontmatter {
          is_mother
          lang
          comp
          read
          write
        }
        html
      }
    }
  }

  cvskills: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "\/cv_skills/"}}
    sort: {fields: fields___slug, order: ASC}
  ) {
    edges {
      node {
        frontmatter {
          skills_type
        }
        html
      }
    }
  }

}
`;

export default About;

