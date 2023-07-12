import { useState } from 'react';
import { Button } from '../Button/Button';
import fakeImg from '../../images/photo-cover.svg';
import './Users.scss';

export const Users = ({ users, page, totalPages, handleShowMore }) => {
  const [tooltipText, setTooltipText] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredClassName, sethoveredClassName] = useState(null);
  const handleMouseEnter = (text, event, cardId) => {
    setTooltipText(text);
    sethoveredClassName(event.target.className)
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setTooltipText('');
    setHoveredCard(null);
  };

  return (
    <div id="users-container">
      <h1 className="tittle">Работа с GET-запросом</h1>
      {users.map((user) => (
        <div
          className={`user-card ${hoveredCard === user.id ? 'hovered' : ''}`}
          key={user.id}
          style={{ position: 'relative' }} // Добавлено свойство position
        >
          <div>
            {user.photo ? (
              <img
                className="user-photo"
                src={user.photo}
                width={300}
                height={450}
                alt={user.name}
              />
            ) : (
              <img className="user-photo" src={fakeImg} alt={user.name} />
            )}
          </div>
          <p
            className="user-name"
            onMouseEnter={(e) => handleMouseEnter(user.name, e, user.id)}
            onMouseLeave={handleMouseLeave}
          >
            {user.name}
          </p>
          <div>
            <p
              className="user-position"
              onMouseEnter={(e) => handleMouseEnter(user.position, e, user.id)}
              onMouseLeave={handleMouseLeave}
            >
              {user.position}
            </p>
             <div className='wrapper'>
            <p
              className="user-email"
              onMouseEnter={(e) => handleMouseEnter(user.email, e, user.id)}
              onMouseLeave={handleMouseLeave}
            >
              {user.email}
              </p>
             </div>
            <p
              className="user-phone"
              onMouseEnter={(e) => handleMouseEnter(user.phone, e, user.id)}
              onMouseLeave={handleMouseLeave}
            >
              {user.phone}
            </p>
          </div>
          {hoveredCard === user.id && hoveredClassName ==="user-name" &&(
            <div
              className="tooltip"
              style={{ top: '64%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <p>{tooltipText}</p>
            </div>
          )}
          {hoveredCard === user.id && hoveredClassName ==="user-position" &&(
            <div
              className="tooltip"
              style={{ top: '79%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <p>{tooltipText}</p>
            </div>
          )}
          {hoveredCard === user.id && hoveredClassName ==="user-email" &&(
            <div
              className="tooltip"
              style={{ top: '91%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <p>{tooltipText}</p>
            </div>
          )}
          {hoveredCard === user.id && hoveredClassName ==="user-phone" &&(
            <div
              className="tooltip"
              style={{ top: '100%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <p>{tooltipText}</p>
            </div>
          )}
        </div>
      ))}
      {page < totalPages && (
        <div className="show-more-button-container">
          <Button width="120px" onClick={handleShowMore}>
            Показать еще
          </Button>
        </div>
      )}
    </div>
  );
};

export default Users;
