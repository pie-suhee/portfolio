import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SwiperComponent from './swiper';
import productsData from './products.json';

interface Product {
  id: number;
  category: string;
  image: string;
  title: string;
  price: number;
}

const Index: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);

  const roundPrice = (price: number) => {
    return Math.round(price);
  }

  const ProductItem: React.FC<{ item: Product }> = ({ item }) => {
    const handleResetInputText = () => {
      const inputEl = document.getElementById('outlined-basic') as HTMLInputElement;
      
      if (inputEl) {
        inputEl.value = '';
      }
    }

    return (
      <div key={item.id} className="container">
        <Link to={`/product/${item.id}`}  onClick={handleResetInputText}>
          <div className="img_con">
            <img className="w-25" src={item.image} alt={item.title} />
          </div>
          <div className="text_con">
            <div className="text01_con">
              <span>
                {item.title}
              </span>
            </div>
            <div className="text02_con">
              <span className="p-3 bg-success text-white">
                {" "}${roundPrice(item.price)} 
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  useEffect(() => {
    const filteredList = productsData.filter(
      (item) =>
        item.category === "men's clothing" ||
        item.category === "women's clothing" ||
        item.category === "electronics" ||
        item.category === "jewelery"
    );
    setList(filteredList);
  }, []);

  return (
    <div className="main">
      <SwiperComponent />
      <div className="list">
        <div className="main_category">
          <div className="main_title">
            <span>
              패션
            </span>
          </div>
          <div className="main_list">
            {list &&
              list
                .filter((item) => item.category === "men's clothing" || item.category === "women's clothing")
                .slice(0, 4)
                .map((item) => <ProductItem key={item.id} item={item} />)
            }
          </div>
        </div>
        <div className="main_category">
          <div className="main_title">
            <span>
                액세서리
            </span>
          </div>
          <div className="main_list">
            {list &&
              list
                .filter((item) => item.category === "jewelery")
                .slice(0, 4)
                .map((item) => <ProductItem key={item.id} item={item} />)
            }
          </div>
        </div>
        <div className="main_category">
          <div className="main_title">
            <span>
                디지털
            </span>
          </div>
          <div className="main_list">
            {list &&
              list
                .filter((item) => item.category === "electronics")
                .slice(0, 4)
                .map((item) => <ProductItem key={item.id} item={item} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;