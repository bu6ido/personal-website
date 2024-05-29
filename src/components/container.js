import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql, Link } from "gatsby"
//import * as containerStyles from "../styles/container.module.css"

const Container = ({ children }) => {
    const data = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `
    );

    return (
      <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{data.site.siteMetadata.title}</title>
            <meta name="description" content={data.site.siteMetadata.description} />
            <meta name="google-site-verification" content="zc5B6tkUPygeZUaeM2EUnUUk2JQsdkWaVs7hhh370AM" />
        </Helmet>

    <div className="container flex-vertical-xs">
        <div className="header flex-horiz-start-xs">
          <img src="/user32x32.png" className="logo-small hidden-md" alt="user32x32.png" />
          <img src="/user48x48.png" className="logo-large hidden-xs block-md" alt="user48x48.png" />
          <p className="header-title flex-horiz-start-xs"><span>{data.site.siteMetadata.title}</span></p>
        </div>
        <div className="navigation">
          <ul className="flex-horiz-around-xs">
            <li><Link to={'/'}>HOME</Link></li>
            <li><Link to={'/tags'}>All tags</Link></li>
            <li><Link to={'/portfolio'}>Portfolio</Link></li>
            <li><Link to={'/about'}>About</Link></li>
          </ul>
        </div>

        {children}

        <div className="footer">
            &copy; {new Date().getFullYear()} by Ivailo Valentinov Georgiev. All rights reserved.
        </div>
    </div>
      </>
    );
};

export default Container;

