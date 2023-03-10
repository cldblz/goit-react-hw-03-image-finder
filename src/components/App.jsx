import { Component } from 'react';
import { Container, Wrapper } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from 'components/services/imagesAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    isModalOpen: false,
    modalUrl: '',
    nextPage: 1,
    query: '',
  };

  handleSearch = async input => {
    this.setState({
      isLoading: true,
      nextPage: 1,
      query: input,
    });

    const data = await fetchImages(input, 1);
    const images = data.map(({ id, webformatURL, largeImageURL, tags }) => {
      return { id, webformatURL, largeImageURL, tags };
    });

    this.setState(prevState => {
      return {
        images: [...images],
        isLoading: false,
        nextPage: prevState.nextPage + 1,
      };
    });
  };

  handleModal = e => {
    this.setState({
      isModalOpen: true,
      modalUrl: e.target.dataset.url,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      modalUrl: '',
    });
  };

  handleLoadMore = async () => {
    const { query, nextPage } = this.state;

    this.setState({ isLoading: true });

    const data = await fetchImages(query, nextPage);
    const images = data.map(({ id, webformatURL, largeImageURL, tags }) => {
      return { id, webformatURL, largeImageURL, tags };
    });

    this.setState(prevState => {
      return {
        images: [...prevState.images, ...images],
        isLoading: false,
        nextPage: prevState.nextPage + 1,
      };
    });
  };

  render() {
    const { images, isLoading, isModalOpen, modalUrl } = this.state;
    const { handleSearch, handleModal, handleLoadMore, closeModal } = this;
    const hideButton = !images[0] || isLoading;
    return (
      <Container>
        <Searchbar onSubmit={handleSearch} />
        <ImageGallery images={images} handleModal={handleModal} />
        <Wrapper>
          {!hideButton && <Button handleLoadMore={handleLoadMore} />}
          <Loader isLoading={isLoading} />
        </Wrapper>
        {isModalOpen && <Modal url={modalUrl} closeModal={closeModal} />}
      </Container>
    );
  }
}

export default App;
