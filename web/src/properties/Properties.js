import React, { Component } from 'react';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';

class Properties extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      houses: [],
    };
  }

  componentDidMount() {
    this.FetchProperties();
  }

  FetchProperties = () => {
    fetch('https://api.house.crackedjar.com')
      .then((res) => res.json())
      .then(
        (result) =>
          this.setState({
            isLoaded: true,
            houses: result,
          }),
        (error) =>
          this.setState({
            isLoaded: true,
            error,
          }),
      );
  };

  render() {
    const { error, isLoaded, houses } = this.state;
    if (error) {
      return <div>Failed to load: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>House List</h2>
        <PropertyDirectory houses={houses} />
        <NewProperty />
      </div>
    );
  }
}

export default Properties;
