import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

interface ListProps {
  input: string;
  style?: React.CSSProperties;
  handleResetInputText: () => void;
}

function List({ input, style, handleResetInputText }: ListProps): JSX.Element {
  const [productList, setProductList] = useState<CartItemType[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredData: CartItemType[] = productList.filter((el: CartItemType) => {
    if (input === '') {
      return el;
    } else {
      return el.title.toLowerCase().includes(input.toLowerCase());
    }
  });

  return (
    <div className="search_list" id="search_list">
      <ul style={style}>
        {filteredData.map((item: CartItemType) => (
          <li key={item.id}>
            <Link to={`/product/${item.id}`} onClick={() => { handleResetInputText(); }}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
  );
}
  

export default List;