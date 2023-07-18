import { FC, ReactNode } from 'react';
import * as React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Footer from './footer';
import Search from '../components/search';
import Button from '../components/button';
import ToggleMenu from '../components/toggleMenu';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FaShoppingCart } from 'react-icons/fa';

import './styles.scss';

interface LayoutProps {
  children: ReactNode;
}

interface RootState {
    cart: {
      id: number;
      name: string;
      quantity: number;
    }[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const [isDarkMode, setDarkMode] = React.useState(false);
    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(!checked);
    };

    const cart = useSelector((state: RootState) => state.cart);

    const sumQuantity = () => {
      if (cart.length === 0) {
        return 0;
      } else {
        return cart.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0);
      }
    };
      
    return (
        <div className={`layout-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="main-wrapper">
                <header className="header">
                    <div className="header-content">
                        <div className="header-tln">
                            <ToggleMenu />

                            <h1>
                                <Link to={`/`} className="logo-section">
                                    React Shop
                                </Link>
                            </h1>
                
                            <nav className="nav">
                                <ul>
                                    <li>
                                        <Link to={`/fashion`}>
                                            패션
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/accessory`}>
                                            액세서리
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/digital`}>
                                            디지털
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="header-bsc">
                            <div className="header-btn-toggle">
                                <DarkModeSwitch
                                    checked={!isDarkMode}
                                    onChange={toggleDarkMode}
                                    size={24}
                                    moonColor={"black"}
                                    sunColor={"white"}
                                />
                            </div>
                            <Search />
                            <div className="header-cart">
                                <Link to={`/cart`}>
                                  <Button content={<FaShoppingCart />} />
                                  {sumQuantity() >= 0 ? <span className="header-cart-num">{sumQuantity()}</span> : ''}
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="content-wrapper">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;