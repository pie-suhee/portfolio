import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
  onClick?: () => void;
  content: ReactNode;
}

const Button = ({ onClick, content }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      {content}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.node,
};

export default Button;
