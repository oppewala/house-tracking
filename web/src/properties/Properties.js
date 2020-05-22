import React, {Component} from 'react';
import {PropertyDirectory} from "./property-directory/PropertyDirectory";
import NewProperty from "./new-property/NewProperty";

class Properties extends Component {
    state = {
        isLoaded: false,
        houses: []
    }

    FetchProperties = () => {
        fetch('https://api.house.crackedjar.com')
            .then(res => res.json())
            .then(result => this.setState({
                    isLoaded: true,
                    houses: result
                }),
                error => this.setState({
                    isLoaded: true,
                    error
                }));
    }

    componentDidMount() {
        this.FetchProperties();
    }

    render() {
        const { error, isLoaded, houses } = this.state;
        if (error) {
            return <div>Failed to load: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h2>House List</h2>
                <PropertyDirectory houses={houses} />
                <NewProperty />
            </div>)
    }
}

export default Properties;