import './Button.scss';

export const Button = ({ onClick, children, targetId, width = "100px" }) => {
  const buttonStyle = {
    width: width,
  };

  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type="submit" className="btn" onClick={handleClick} style={buttonStyle}>
      {children}
    </button>
  );
};

