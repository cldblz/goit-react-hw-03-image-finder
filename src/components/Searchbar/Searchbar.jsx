import { Component } from 'react';
import {
  SearchField,
  SearchForm,
  Button,
  Label,
  Input,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    input: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.setState({
      input: '',
    });
  };

  render() {
    return (
      <SearchField>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchField>
    );
  }
}

export default Searchbar;
