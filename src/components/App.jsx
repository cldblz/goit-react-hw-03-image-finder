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

  async componentDidUpdate(prevProps, prevState) {
    const { query, nextPage } = this.state;
    if (prevState.query !== query || nextPage !== prevState.nextPage) {
      this.setState({
        isLoading: true,
      });

      const data = await fetchImages(query, nextPage);
      const images = data.map(({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      });

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          isLoading: false,
        };
      });
    }
  }

  handleSearch = input => {
    this.setState({
      images: [],
      nextPage: 1,
      query: input,
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

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
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
