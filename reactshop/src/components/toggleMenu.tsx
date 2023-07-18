import { FC, useState } from 'react';
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';

const ToggleMenu: FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="toggle-menu">
      <button className="toggelListBtn" onClick={handleToggleMenu}>
        <FaBars />
      </button>
      {isMenuOpen && (
        <div className={`toggelListOpen ${isMenuOpen ? 'open' : 'close'}`}>
          <div className="toggelListBg" onClick={handleToggleMenu}></div>
          <div className="toggelList">
            <ul>
              <li>
                <Link to={`/fashion`} onClick={handleToggleMenu}>
                    패션
                </Link>
              </li>
              <li>
                <Link to={`/accessory`} onClick={handleToggleMenu}>
                  액세서리
                </Link>
              </li>
              <li>
                <Link to={`/digital`} onClick={handleToggleMenu}>
                  디지털
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleMenu;