import React, { useContext } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { VscError } from 'react-icons/vsc';
import { MyContext } from '../context/MyContext';
import { Link } from 'react-router-dom';

const AddPage = ({
  name,
  setName,
  productLink,
  setProductLink,
  category,
  setCategory,
  overview,
  setOverview,
  imageLink,
  setImageLink,
  motto,
  setMotto,
  handleSubmit,
  errorMessage,
  successMessage,
}) => {
  const { isAuthenticated } = useContext(MyContext);


  return (
    <section className="post-parent">
      {isAuthenticated ? <section className="post">
        <div className="add-style">
          <h1>Post a product</h1>
        </div>

        <form className="form">
          <fieldset>
            <label htmlFor="title">Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="title">Motto: </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Link: </label>
            <input
              type="url"
              name="url"
              id="link"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Category: </label>
            <select
              name="category"
              id="category"
              className="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default">select category</option>
              <option value="productivity">productivity</option>
              <option value="technology">technology</option>
              <option value="AI">AI</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="textarea">Description: </label>
            <textarea
              name="textarea"
              id="textarea"
              cols="30"
              rows="5"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            ></textarea>
          </fieldset>
          <fieldset>
            <label htmlFor="img-url">Image-link: </label>
            <input
              type="url"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              name="url"
              id="img-url"
              placeholder='Copy image link from browser images tab...'
            />
          </fieldset>
        </form>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Post Product
        </button>
        <section className="message">
          {successMessage && (
            <div className="success">
              <p>{successMessage}</p>
              <span>
                <IoIosCheckmarkCircleOutline />
              </span>
            </div>
          )}
          {errorMessage && (
            <div className="error">
              <p>{errorMessage}</p>
              <span>
                <VscError />
              </span>
            </div>
          )}
        </section>
      </section> : <Link
      className="comment-btn"
      to="/"
      >
      login to post
    </Link>}
    </section>
  );
};

export default AddPage;
