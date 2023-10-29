import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../context/MyContext';
import Reviews from './Reviews';
import { useParams, Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const EachProduct = ({ users }) => {
  const [eachProduct, setEachProduct] = useState({});
  const { newComment, setNewComment } = useContext(MyContext);

  function getRandomUserId(users) {
    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * users.length);
    // Return the random element from the array
    return users[randomIndex];
  }

  const { productId } = useParams();

  // const token = localStorage.getItem("token"); 

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // const decodedToken = jwtDecode(token);
    // console.log(decodedToken);

      if (newComment) {
        // Extract user ID from the decoded token
      // const userId = decodedToken.user_id;

      const newComm = {
        "action": 'create_review',
        "reviews": {
          "message": newComment,
          "user_id": getRandomUserId(users).id,
          "product_id": productId
        },
      };

      const token = localStorage.getItem("token"); 

      try {
      const response = await fetch('http://localhost:9000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": `${token}`,
      },
      body: JSON.stringify(newComm),
      credentials: "include"
    });
        const data = await response.json();
        setNewComment('');
        return data
      } catch (error) {
        console.error('Create failed: ', error.message);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = {
      "action": 'get_product',
      "products": {
        "id": productId,
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fetchProduct),
        });
  
        const data = await response.json();
        setEachProduct(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);

  

  const { id, name, description, imageLink, motto, category, link } =
    eachProduct;

  return (
    <article className="parent-each">
      <Link to="/products">
        <BsArrowLeft className="back-icon" />
      </Link>

      <section to={`/products/${id}`} className="product" key={id}>
        <div className="first">
          <img src={imageLink} alt={name} />
          <div className="p-desc">
            <div className="top">
              <h2>{name}</h2>
              <p>{motto}</p>
            </div>
            <div className="categ">
              <p>{category}</p>
            </div>
          </div>
        </div>
        <div className="like">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </div>
      </section>

      <section className="details">
        <div className="overview">
          <h3>Description</h3>
          <p>{description}</p>
        </div>
        <div className="review">
          <h3>Reviews</h3>
          <Reviews
            handleCommentSubmit={handleCommentSubmit}
            productId={productId}
            name={name}
          />
        </div>
      </section>
    </article>
  );
};

export default EachProduct;
