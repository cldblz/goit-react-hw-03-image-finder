import { List } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, handleModal }) => {
  return (
    <List>
      {images.map(image => {
        return (
          <ImageGalleryItem
            image={image}
            key={image.id}
            handleModal={handleModal}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  handleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
