import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      visible={isLoading}
    />
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
