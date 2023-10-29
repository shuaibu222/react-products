import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../context/MyContext';
import { IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Reviews = ({ handleCommentSubmit, productId, name}) => {
  const { setNewComment, newComment, isAuthenticated} = useContext(MyContext);
  const [eachComment, setEachComment] = useState([]);
  const [deletedComment, setDeletedComment] = useState("");
  const [user, setUser] = useState({})

  const fetchUser = async (userId) => {

    const getUser = {
      "action": 'get_user',
      "users": {
        "id": userId
      }
    };
    try {
      const response = await fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getUser),
      });

      const data = await response.json();
      setUser((prevData) => ({
        ...prevData,
        [userId]: data, // Store user data with the user_id as the key
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComm = async (id) => {
    const delComm = {
      "action": 'delete_review',
      "reviews": {
        "id": id,
      }
    };

    const token = localStorage.getItem("token");

    const delComment = async () => {
      try {
        const response = await fetch('http://localhost:9000/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Cookie": `${token}`,
          },
          body: JSON.stringify(delComm),
          credentials: "include"
        });
  
        const data = await response.json();
        setDeletedComment(data)
      } catch (error) {
        console.error(error);
      }
    };

    delComment()
  };

  useEffect(() => {
    const fetchComm = {
      "action": 'get_product_reviews',
      "reviews": {
        "product_id": productId,
      }
    };

    const token = localStorage.getItem("token"); 

    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:9000/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Cookie": `${token}`,
          },
          body: JSON.stringify(fetchComm),
          credentials: "include"
        });
  
        const data = await response.json();

        // TODO manage null state in sha Allah
          setEachComment(data || []);

          data.forEach((comment) => {
            fetchUser(comment.userId);
          });

      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchReviews()
    }
  }, [productId, newComment, deletedComment, isAuthenticated]);

  
  return (
    <article>
      {isAuthenticated ?
      <div>
        <section className="comment">
          <label
            htmlFor="comment"
            style={{ fontSize: '0.7rem', color: '#999da6', marginBottom: '2rem' }}
          >
            Total reviews on {name} are: {eachComment.length}
          </label>
          <input
            type="text"
            name="comment"
            placeholder={`what do you think of ${name}?...`}
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="comment-btn"
            onClick={handleCommentSubmit}
          >
            comment
          </button>
        </section>
        <section className="comment-result">
          {eachComment.map((eachComm) => {
            const { id, msg, date, userId } = eachComm;

            const u = user[userId] || {};


            return (
              <section key={id}>
                <section className="each-comment">
                  <div className="text-comment">
                    <p className="comment-content">{msg}</p>
                    <p>{date}</p>
                    <p>{u.username}</p>
                  </div>
                  <div className="modify">
                    <IoTrashOutline
                      className="del"
                      onClick={() => deleteComm(id)}
                    />
                  </div>
                </section>
              </section>
            );
          })}
        </section>
      </div>
      :  <Link
      className="comment-btn"
      to="/"
      >
      login to view and write comment
    </Link>}
    </article>
  );
};

export default Reviews;
