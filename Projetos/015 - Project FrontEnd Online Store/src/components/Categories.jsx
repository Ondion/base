import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { getRadio } = this.props;

    return (
      <aside>
        {
          categories.map((c) => (
            <label key={ c.id } htmlFor={ c.id }>
              <input
                id={ c.id }
                type="radio"
                name="category"
                data-testid="category"
                value={ c.id }
                onChange={ (event) => getRadio(event) }
              />
              { c.name }
            </label>
          ))
        }
      </aside>
    );
  }
}

Categories.propTypes = {
  getRadio: PropTypes.func.isRequired,
};

export default Categories;
