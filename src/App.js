import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shared from './pages/Shared';
import Stats from './pages/Stats';
import Post from './pages/Post';
import ProductPage from './pages/ProductPage';
import Error from './pages/Error';
import EachProduct from './pages/EachProduct';
import Signup from './pages/Signup';
import { MyContext } from './context/MyContext';

function App() {
  const [name, setName] = useState('');
  const [motto, setMotto] = useState('');
  const [productLink, setProductLink] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState("")

  // values holder
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState("")
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState("");
  const [eachComment, setEachComment] = useState([]);

  // bools
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  

  async function handleSubmit(e) {
    e.preventDefault();

    if (name) {

      const newComm = {
        "action": 'create_product',
        "products": {
          "name": name,
          "motto": motto,
          "link": productLink,
          "category": category,
          "description": description,
          "image_link": imageLink
        },
      };

      try {
      fetch('http://localhost:9000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComm)
    })
        setSuccessMessage('Product created successfully!');
      } catch (error) {
        console.error('Create failed: ', error.message);
        setErrorMessage('Error! not created.');
      }

      setName('');
      setDescription('');
      setProductLink('');
      setMotto('');
      setImageLink("")
    }
  }

  useEffect(() => {
    const getProducts = {
      "action": 'get_all_products',
    };

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getProducts),
        });
  
        const data = await response.json();
        setProduct(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name, successMessage]);

  useEffect(() => {
    const getUsers = {
      "action": 'get_all_users',
    };

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getUsers),
        });
  
        const data = await response.json();
        setUsers(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [newComment, eachComment]);


  return (
    <MyContext.Provider
      value={{
        newComment,
        setNewComment,
        eachComment,
        setEachComment,
        product,
        userId,
        setUserId,
        users,
        isAuthenticated,
        setIsAuthenticated,
        setSuccessMessage,
        setErrorMessage,
        errorMessage,
        successMessage
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shared />}>
          <Route
              index
              element={<Stats product={product} comment={eachComment} />}
            />
            <Route
              path="post"
              element={
                <Post
                  name={name}
                  setName={setName}
                  productLink={productLink}
                  setProductLink={setProductLink}
                  overview={description}
                  setOverview={setDescription}
                  motto={motto}
                  setMotto={setMotto}
                  imageLink={imageLink}
                  setImageLink={setImageLink}
                  handleSubmit={handleSubmit}
                  category={category}
                  setCategory={setCategory}
                  errorMessage={errorMessage}
                  successMessage={successMessage}
                />
              }
            />

            <Route
              path="products"
              element={
                <ProductPage
                  product={product}
                />
              }
            />

            <Route path="products/:productId" element={<EachProduct users={users} />} />
            <Route path="signup" element={<Signup  />} />

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
