import React from "react"
import { Link } from "gatsby"

const Pager = ({ parentUrl, page, pagesCount }) => {
  const ipage = parseInt(page, 10);
  const parentLink = (parentUrl && !!parentUrl.length)? parentUrl : '/';
  const prevLink = (ipage < 2)? '/' : (ipage === 2)? `${parentLink}` : `${parentUrl}/page/${ipage - 1}`;
  const nextLink = (ipage >= pagesCount)? '/' : `${parentUrl}/page/${ipage + 1}`;

  return (
    <div className="pagination">
      <Link to={prevLink} className={`prev-page ${(ipage < 2)? 'disabled' : '' }`}>&lt; PREV</Link>
      <span className="page-number">{ ipage }</span> 
      <Link to={nextLink} className={`next-page ${(ipage >= pagesCount)? 'disabled' : ''}`}>NEXT &gt;</Link>
    </div>
  );
};

export default Pager;

