import React, {Component} from 'react';

class HouseList extends Component {
    render() {
        return (
            <div>
                <h2>House List</h2>
                <House />
                <House />
                <House />
                <House />
            </div>)
    }
}

const House = (props) => {
    return (
        <div>
            <h4>37 Camera Walk, Coburg North</h4>
            <p>Bedrooms: 3 | Bathrooms: 2 | Cars: 1</p>
            <p>Score: 39</p>
            <div>
                <p>Tags</p>
                <ul>
                    <li>Good Vibes</li>
                    <li>FTTP</li>
                </ul>
            </div>
            <p><a href='https://www.google.com'>Open in Maps</a> <a href='htttps://www.google.com'>See Listing</a></p>
        </div>
    )
}

export default HouseList;