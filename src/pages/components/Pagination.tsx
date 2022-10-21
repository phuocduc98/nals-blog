import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsRequest } from '../../store/actions/blogAction';
import { RootState } from '../../store/reducers/reducers';

const Pagination = () => {
  const dispatch = useDispatch();
  const { pagination, search, sort_by } = useSelector(
    (state: RootState) => state.blogs
  );
  const { next = null, page = 1, prev = null, total = 0 } = pagination;

  const [pages, setPages] = useState([1]);

  useEffect(() => {
    if (total && total > 0) {
      let pageArr = new Array<number>();
      for (let i = 1; i <= total; i++) {
        pageArr.push(i);
      }
      setPages(pageArr);
    }
  }, [total]);

  const handlePageOnClick = (value) => {
    let param = {
      page: 1,
      search,
      sort_by,
    };
    if (value === 'next') {
      param.page = next;
    } else if (value === 'prev') {
      param.page = prev;
    } else {
      param.page = value;
    }
    dispatch(fetchBlogsRequest(param));
  };

  const renderPagination = () => {
    return pages.map((value, index) => (
      <li
        key={index.toString()}
        className={`page-item${page === value ? ' active' : ''}`}
      >
        <a className="page-link" onClick={() => handlePageOnClick(value)}>
          {value}
        </a>
      </li>
    ));
  };

  return (
    <div>
      <nav className="mt-3" aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${prev && prev !== null ? '' : 'disabled'}`}
          >
            <a
              className="page-link"
              tabIndex={prev && prev !== null ? 0 : -1}
              aria-disabled={prev && prev !== null ? 'false' : 'true'}
              onClick={() => handlePageOnClick('prev')}
            >
              Previous
            </a>
          </li>
          {renderPagination()}
          <li
            className={`page-item ${next && next !== null ? '' : 'disabled'}`}
          >
            <a className="page-link" onClick={() => handlePageOnClick('next')}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
