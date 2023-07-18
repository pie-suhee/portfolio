import { FC } from 'react';
import { Link } from "react-router-dom";

const NotFound: FC = () => {
    return (
        <div className="notFound">
            <h1>404</h1>
            <p >페이지를 찾을 수 없습니다.</p>
            <div className="notFound_button">
                <Link to={`/`}>
                    메인으로
                </Link>
            </div>
        </div>
    );
};
    
export default NotFound;