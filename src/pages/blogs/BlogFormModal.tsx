import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createBlog, updateBlog } from '../../store/actions/blogAction';

let initialForm = {
  title: '',
  content: '',
};

const BlogFormModal = (props: Props) => {
  const [blogForm, setBlogForm] = useState({ ...initialForm, image: '' });
  const [isError, setIsError] = useState(initialForm);
  const [imageSelected, setImageSelected] = useState('');

  const { show, onHide, blogParam } = props;
  const isEdit = blogParam && blogParam?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && blogParam) {
      const { title, content, image } = blogParam;
      setBlogForm({
        title,
        content,
        image: image?.url || '',
      });
      setImageSelected(image?.url || '');
    }
  }, [blogParam, isEdit]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file?.name) {
      const image = window.URL.createObjectURL(file);
      setBlogForm((prev) => ({ ...prev, image: file }));
      setImageSelected(image);
    } else {
      setImageSelected('');
      setBlogForm((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleSaveChanges = (e) => {
    if (formValid()) {
      if (isEdit && blogParam?.id) {
        dispatch(updateBlog(blogParam.id, blogForm));
      } else {
        dispatch(createBlog(blogForm));
      }
      onCloseModal();
    } else {
      setIsError({
        title: blogForm.title.length < 1 ? 'Title is required' : '',
        content: blogForm.content.length < 1 ? 'Content is required' : '',
      });
      console.log('Form is invalid!');
    }
  };

  const formValid = (): boolean => {
    let isValid = false;
    Object.values(isError).forEach((val: any) => {
      if (val.length > 0) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    let clone = Object.assign(
      {},
      { title: blogForm.title, content: blogForm.content }
    );
    isValid = Object.values(clone).every((val: any) => val.length > 0);

    return isValid;
  };

  const formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setIsError((prev) => ({
          ...prev,
          title: value.length < 1 ? 'Title is required' : '',
        }));
        break;
      case 'content':
        setIsError((prev) => ({
          ...prev,
          content: value.length < 1 ? 'Content is required' : '',
        }));
        break;
      default:
        break;
    }
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  const onCloseModal = () => {
    setBlogForm({ ...initialForm, image: '' });
    setIsError(initialForm);
    setImageSelected('');
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {(isEdit ? 'Edit' : 'Create') + ' Blog'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="container" noValidate>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className={
                isError.title.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="title"
              value={blogForm.title}
              onChange={formValChange}
            />
            {isError.title.length > 0 && (
              <span className="invalid-feedback">{isError.title}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Content"
              className={
                isError.content.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="content"
              value={blogForm.content}
              onChange={formValChange}
            ></textarea>
            {isError.content.length > 0 && (
              <span className="invalid-feedback">{isError.content}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <div>
              {imageSelected && imageSelected.length > 0 ? (
                <img
                  className="img-thumbnail mb-2"
                  height="64"
                  width="64"
                  style={{ objectFit: 'cover' }}
                  src={imageSelected}
                  alt={blogForm.image['name']}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-image"
                  viewBox="0 0 16 16"
                  style={{ height: '64px', width: '64px' }}
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>
              )}
              <br />
              <input type="file" onChange={handleFileInput} />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

type Props = {
  show?: boolean;
  onHide?: any;
  blogParam?: any;
};

BlogFormModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  blogParam: PropTypes.object,
};

export default BlogFormModal;
