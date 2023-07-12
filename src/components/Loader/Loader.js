import fakeImg from '../../images/Group 64.svg';
import './Loader.scss';

export const Loader = () => {
  return (
      <div>
        <img className="loader" src={fakeImg} width={70} height={70} alt='loader' />
      </div>
  );
};

export default Loader;
