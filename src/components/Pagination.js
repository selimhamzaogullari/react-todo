import React from "react";

function Pagination({linksPerPage, totalLinks, currentPage, totalPageNumber, paginate}) {
  const pageNumbers = [];
  for(let i = 1; i <= totalPageNumber; i++) {
    pageNumbers.push(i);
  }
  return (
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center mt-4">
          <li className="page-item">
            <button className="page-link" aria-label="Previous" onClick={() => paginate('prev')}>
              <span aria-hidden="true">&lt;</span>
            </button>
          </li>
          {pageNumbers.map(number => (
              <li className="page-item" key={number}>
                <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                  {number}
                </button>
              </li>
          ))}
          <li className="page-item">
            <button className="page-link" aria-label="Next" onClick={() => paginate('next')}>
              <span aria-hidden="true">&gt;</span>
            </button>
          </li>
        </ul>
      </nav>
  )
}

export default Pagination;
