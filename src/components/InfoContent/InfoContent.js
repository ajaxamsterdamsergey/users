import { Button } from '../Button/Button';
import './InfoContent.scss';

export const InfoContent = ({ onClick }) => {
  return (
    <div className="container">
          <div className="infoWrapper">
      <div className="content">
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        </div>
        <Button onClick={onClick} targetId="form-container">Sign Up</Button>
        </div>
    </div>
  );
};

export default InfoContent;
