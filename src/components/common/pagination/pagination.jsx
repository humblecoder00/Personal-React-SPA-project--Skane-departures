import React from "react";
import _ from "lodash";
import "./pagination.css";

const Pagination = props => {
  // plan is to get the page numbers as an array then map it.
  // to do that, we need 2 basic numbers:
  // itemsCount: total number of items
  // pageSize: how many of them will be shown
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  // count the page number by dividing total number with page size.
  // [1 ... pagesCount].map()
  const pagesCount = Math.ceil(itemsCount / pageSize); // this will convert the floating nr to integer.
  if (pagesCount === 1) return null; // don't render if there is only one page

  // get the number of pages using range() method from lodash
  // we add one to include the end page
  const pages = _.range(1, pagesCount + 1);

  return (
    <React.Fragment>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item--active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            <span
              className={
                page === currentPage ? "page-link--active" : "page-link"
              }
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Pagination;
