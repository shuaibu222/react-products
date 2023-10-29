
import { Link } from 'react-router-dom';

const ProductPage = ({ product }) => {


  return (
    <article className="products">
      <section className="p-first-row">
      
        <div className="product-filter">
          <h1>Featured products of all time</h1>
        </div>
      </section>
      <section className="products-grid">
        {product.map((productList) => {
          const { id, name, imageLink, category, description } = productList;
          // 
          return (
            <div key={id} className="product-card">
              <img src={imageLink} alt={name} />
              <div className="card-desc">
                <div className="top">
                  <p className="product-click">{name}</p>
                  <p>{category}</p>
                  <p>{description.slice(0, 100) || []}</p>
                </div>
                <Link to={`/products/${id}`}>
                  <button className="more">Learn More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
};

export default ProductPage;
