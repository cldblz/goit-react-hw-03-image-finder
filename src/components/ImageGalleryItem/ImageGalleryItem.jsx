import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, handleModal }) => {
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <Item onClick={handleModal}>
      <Image src={webformatURL} alt={tags} data-url={largeImageURL} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.exact({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  handleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
