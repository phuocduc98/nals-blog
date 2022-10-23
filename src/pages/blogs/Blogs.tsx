import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortSelect } from '../../constants';
import { fetchBlogsRequest } from '../../store/actions/blogAction';
import { RootState } from '../../store/reducers/reducers';
import MediaList from '../components/MediaList';
import Pagination from '../components/Pagination';
import { GrowSpinner } from '../components/Spinner';
import BlogFormModal from './BlogFormModal';

function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('created_at');
  const [modalShow, setModalShow] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { pending, blogs, pagination } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    fetchBlog(searchTerm, sortValue);

    const updateWindowDimensions = () => {
      const { innerWidth } = window;
      setScreenWidth(innerWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions)
  }, [searchTerm, sortValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlog(searchTerm, sortValue);
  };

  const handleSort = (e) => {
    const { value } = e.target;
    setSortValue(value);
    // fetchBlog(searchTerm, value);
  };

  const fetchBlog = (search, sort_by) => {
    let param = {
      page: pagination?.page ? pagination.page : 1,
      search,
      sort_by,
    };
    dispatch(fetchBlogsRequest(param));
  };

  return (
    <div>
      <div className="row col-12">
        <form className="input-group col-md-6 col-12 my-2" style={{ maxHeight: '38px'}} onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search title or content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-outline-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center col-md-4 col-12">
          <span className="text-nowrap mr-2">Sort by: </span>
          <select
            className="form-control"
            value={sortValue}
            onChange={handleSort}
          >
            {Object.entries(SortSelect).map(([key, value], i) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary btn-add my-2"
          type="button"
          onClick={() => setModalShow(true)}
        >
          {screenWidth <= 767 ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          ) : 'Create Blog'}
        </button>
        <BlogFormModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          blogParam={undefined}
        />
      </div>
      <div className="media-list my-3">
        {pending ? <GrowSpinner /> : <MediaList blogs={blogs} />}
      </div>
      {!pending && <Pagination />}
    </div>
  );
}

export default Blogs;
