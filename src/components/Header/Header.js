import React from 'react';
import { Button } from '../Button/Button';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import './Header.scss';

export const Header = ({ onClick }) => {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <Logo className="logo" alt="logo" />
      </div>
      <div className="buttons-wrapper">
        <Button onClick={onClick} targetId="users-container">Users</Button>
        <Button onClick={onClick} targetId="form-container">Sign Up</Button>
      </div>
    </header>
  );
};

export default Header;
