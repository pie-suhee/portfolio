import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Button from '../button';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, removeAllFromCart } from '../../state/actions/cart';

interface CardItemProps {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const CardItemCard: React.FC<CardItemProps> = ({id, title, price, image, quantity,}: CardItemProps) => {
    const cartItem = { id, title, price, image, quantity };
    const product = { id, title, price, image };
    const dispatch = useDispatch();

    const formatTitle = (title: string) => {
        return title
    };

    const sumPrice = () => {
        return (Math.round(cartItem.price) * cartItem.quantity).toString();
    };

    return (
        <li>
            <div className="cart_img">
                <Link to={`/product/${id}`}>
                    <img src={image} alt={title} />
                </Link>
            </div>
            <div className="cart_full_content">
                <Link to={`/product/${id}`} className="cart_full_title">
                    {formatTitle(title)}
                </Link>
                <span className="cart_full_price">${sumPrice()}</span>
                <div className="cart_full_btn">
                    <Button
                        onClick={() => dispatch(removeFromCart(product))}
                        content={<FaMinus />}
                    />
                    <span>{cartItem.quantity}</span>
                    <Button
                        onClick={() => dispatch(addToCart(product))}
                        content={<FaPlus />}
                    />
                </div>
            </div>
        </li>
    );
};

CardItemCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
};

export default CardItemCard;