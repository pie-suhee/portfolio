import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CardItemCard from './cartItemCard';
import { Link } from 'react-router-dom';
import { removeAllFromCart } from '../../state/actions/cart';
import { RootState } from '../../state/reducers';

const Cart = (): JSX.Element => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  interface RootState {
    cart: CartItem[];
  }

  interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }

  const sumTotal = (): string => {
    return cart
      .reduce(
        (total: number, cartItem: CartItem) =>
          total + Math.round(cartItem.price) * cartItem.quantity,
        0
      )
      .toString();
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleBuyClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = (confirmed: boolean) => {
    if (confirmed) {
      cart.splice(0, cart.length);
      dispatch(removeAllFromCart());
      setShowPopup(false);
    } else {
      setShowPopup(false);
    }
  };

  const cartItems = cart.map((cartItem: CartItem) => (
    <CardItemCard
      key={uuidv4()}
      id={cartItem.id}
      title={cartItem.title}
      price={cartItem.price}
      image={cartItem.image}
      quantity={cartItem.quantity}
    />
  ));

  const renderCart = () => {
    if (cartItems.length === 0) {
      return (
        <div className="cart_empty">
          <h1>장바구니에 물품이 없습니다.</h1>
          <Link to={`/`}>담으러가기</Link>
        </div>
      );
    }
    return (
      <div className="cart_full">
        <ul>{cartItems}</ul>
      </div>
    );
  };

  return (
    <div className="cart">
      <div className="cart_history">
        <ul>
          <li>홈</li>
          <li>장바구니</li>
        </ul>
      </div>
      <div className="cart_contents">
        {renderCart()}
        <div className="cart_total">
          <span>총 : ${sumTotal()}</span>
          <button onClick={handleBuyClick}>구매하기</button>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup_content">
              <h2>정말로 구매하시겠습니까?</h2>
              <p>장바구니의 모든 상품들이 삭제됩니다.</p>
              <div className="popup_btn">
                <button className="popup_yes_btn" onClick={() => handlePopupClose(true)}>네</button>
                <button className="popup_no_btn" onClick={() => handlePopupClose(false)}>아니오</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;