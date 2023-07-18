import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import productsData from './products.json';

interface Product {
  id: number;
  category: string;
  image: string;
  title: string;
  price: number;
}

const Category: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);
  const location = useLocation();

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
        <Link to={`/product/${item.id}`} onClick={handleResetInputText}>
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
    let filteredList: Product[] = [];

    switch (location.pathname) {
      case "/fashion":
        filteredList = productsData.filter(
          (item) =>
            item.category === "men's clothing" ||
            item.category === "women's clothing"
        );
        break;

      case "/accessory":
        filteredList = productsData.filter(
          (item) => item.category === "jewelery"
        );
        break;

      case "/digital":
        filteredList = productsData.filter(
          (item) => item.category === "electronics"
        );
        break;

      default:
        break;
    }

    setList(filteredList);
  }, [location.pathname]);

  let title = "";

  switch (location.pathname) {
    case "/fashion":
      title = "패션";
      break;

    case "/accessory":
      title = "악세서리";
      break;

    case "/digital":
      title = "디지털";
      break;

    default:
      break;
  }

  return (
    <div className="category">
      <div className="category_history">
        <ul>
          <li>홈</li>
          <li>{title}</li>
        </ul>
      </div>
      <div className="category_category">
        <div className="category_title">
          <span>
            {title}
          </span>
        </div>
        <div className="category_list">
          {list &&
            list.map((item) => <ProductItem key={item.id} item={item} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Category;