import axios from 'axios';

const baseApiUri = 'https://api-placeholder.herokuapp.com/api/v2';

const instance = axios.create({
  baseURL: baseApiUri,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getBlogs = async (param) => {
  const { page = 1, search = '', sort_by = 'created_at'} = param;
  try {
    const res = await instance.get(`/blogs?page=${page}&search=${search}&sort_by=${sort_by}`);

    const result = {
      status: res.status + '-' + res.statusText,
      headers: res.headers,
      data: {
        ...res.data,
        search,
        sort_by,
      },
    };
    return result
  } catch (err) {
    console.error(err)
  }
}

export const getBlogById = async (id) => {
  if (id) {
    try {
      const res = await instance.get(`/blogs/${id}`);

      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      return result
    } catch (err) {
      console.error(err)
    }
  }
}

export const postBlog = async (blog) => {
  const { title, content, image } = blog;
  const formData = new FormData();
  formData.append('blog[title]', title);
  formData.append('blog[content]', content);

  if (image && image?.name) {
    formData.append('blog[image]', image);
  }
  console.log(blog);

  try {
    const res = await instance.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const result = {
      status: res.status + '-' + res.statusText,
      headers: res.headers,
      data: res.data,
    };

    return result
  } catch (err) {
    console.error(err)
  }
}

export const putBlog = async (id, blog) => {
  const { title, content, image } = blog;
  const formData = new FormData();
  formData.append('blog[title]', title);
  formData.append('blog[content]', content);

  if (image && image?.name) {
    formData.append('blog[image]', image);
  }

  try {
    const res = await instance.put(`/blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const result = {
      status: res.status + '-' + res.statusText,
      headers: res.headers,
      data: res.data,
    };

    return result
  } catch (err) {
    console.error(err)
  }
}