import React, { useState } from 'react';

type ButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  const [coins, setCoins] = useState(0);

  const handleClick = () => {
    if (!disabled) {
      setCoins((prev) => prev + 1); // Increment coins by 1 for each click
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="absolute rounded-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/clickimg.png')",
        width: 'calc(100% - 40px)',
        maxWidth: '400px',
        height: 'calc(100% - 200px)',
        maxHeight: '400px',
        top: 'calc(50% - 200px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label && <span className="sr-only">{label}</span>}
      <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-white font-bold">
        Coins: {coins}
      </div>
    </button>
  );
};

export default Button;
