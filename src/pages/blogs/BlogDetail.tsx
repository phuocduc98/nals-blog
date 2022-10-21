import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/reducers';
import { BorderGrowSpinner } from '../components/Spinner';

const BlogDetail = () => {
  const { pending, blog } = useSelector((state: RootState) => state.blogs);

  const [blogState, setBlogState] = useState({
    id: undefined,
    title: '',
    content: '',
    created_at: '',
    image: {
      url: '',
    },
    comments_count: 0,
  });

  useEffect(() => {
    if (blog) {
      setBlogState(blog);
    }
  }, [blog]);

  if (pending) {
    return <BorderGrowSpinner />;
  }

  return (
    <div className="blog-detail">
      <h1>{blogState.title}</h1>
      <ul className="list-group list-group-horizontal-md mb-3">
        <li className="mr-3">{blogState.created_at.slice(0, 10)}</li>
        <li className="mr-3">{blogState.comments_count + ' Comments'}</li>
      </ul>
      <img className="mb-5" src={blogState.image.url} width={64} height={64} />
      <p>{blogState.content}</p>
    </div>
  );
};

export default BlogDetail;
