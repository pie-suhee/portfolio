import React, { useEffect, useState } from 'react';
import products from './products.json';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from './button';
import { addToCart } from '../state/actions/cart';

interface Product {
  id: number;
  category: string;
  image: string;
  title: string;
  price: number;
  description: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

const roundPrice = (price: number) => {
  return Math.round(price);
}

const roundRating = (rating?: number): number => {
    return rating ? (rating % 1 >= 0.5 ? 0.5 : 0) : 0;
}    

const ProductDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const history = useNavigate();
  const dispatch = useDispatch();
  const id = Number(window.location.pathname.split('/').pop());

  useEffect(() => {
    const getProduct = () => {
      const data = products.find((p) => p.id === id);
      setProduct(data || null);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload();
    };
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  let category = '';
  if (product?.category === "men's clothing" || product?.category === "women's clothing") {
    category = '패션';
  } else if (product?.category === "electronics") {
    category = '디지털';
  } else if (product?.category === "jewelery") {
    category = '액세서리';
  }

  let filledStars = 0;
  if (product && product.rating && product.rating.rate) {
    filledStars = Math.floor(product.rating.rate) * 20 + roundRating(product.rating.rate) * 20;
  }
  if (filledStars % 2 !== 0) {
    filledStars -= 1;
  }

  const handleHistoryChange = () => {
    history(`/product/${id}`);
  };

  return (
    <div className="detail" key={product?.id} onPointerUp={handleHistoryChange}>
      {product && (
        <>
            <div className="detail_history">
                <ul>
                    <li>{category}</li>
                    <li>{product.title}</li>
                </ul>
            </div>
            <div className="detail_contents">
                <div className="detail_img">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="detail_trpb">
                    <div className="detail_text">
                        <h2 className="detail_title">
                            {product.title}
                            <span className="detail_tag">NEW</span>
                        </h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="detail_rating">
                        <div className="detail_stars">
                          <div className="detail_stars__empty">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                          <div className="detail_stars__filled" style={{ width: `calc(120px * (${filledStars}*0.01))` }}>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                        </div>
                        <p>{product.rating.rate} / {product.rating.count} 참여</p>
                    </div>
                    <p className="detail_price">
                        {" "}${roundPrice(product.price)}
                    </p>
                    <div className="detail_btn">
                      <Button
                        onClick={() => dispatch(addToCart(product))}
                        content="장바구니에 담기"
                      />
                      <Link to={`/cart`}>
                        장바구니로 이동
                      </Link>
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;