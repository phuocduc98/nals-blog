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
  const dispatch = useDispatch();
  const { pending, blogs, pagination } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    fetchBlog(searchTerm, sortValue);
  }, [searchTerm, sortValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlog(searchTerm, sortValue);
  };

  const handleSort = (e) => {
    const { value } = e.target;
    setSortValue(value);
    fetchBlog(searchTerm, value);
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
      <div className="d-flex justify-content-between">
        <form className="input-group w-50" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search title or content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="d-flex align-items-center col-4 mr-2">
          <span>Sort by: </span>
          <select
            className="form-control col-6 ml-2"
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
          className="btn btn-primary flex-end"
          type="button"
          onClick={() => setModalShow(true)}
        >
          Create Blog
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
