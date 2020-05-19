import React, {Component} from "react";

export class Property extends Component {
    BuildAddress = (property) => {
        const addressParts = [
            property.address.street,
            property.address.suburb,
            property.address.postcode,
            property.address.state
        ]
        return addressParts.join(', ');
    }

    BuildHouseLayout = (house) => {
        const houseLayoutParts = [
            'Bedrooms: ' + house.bedrooms,
            'Bathrooms: ' + house.bathrooms,
            'Parking: ' + house.parking,
        ]
        return houseLayoutParts.join(' | ')
    }

    render() {
        const address = this.BuildAddress(this.props.house)
        const houseLayout = this.BuildHouseLayout(this.props.house)

        return (
            <div>
                <h4>{address}</h4>
                <p>{houseLayout}</p>
                <Score rawscore={this.props.house.rawscore} />
                <Tags tags={this.props.house.tags} />
                <p><a href='https://www.google.com'>Open in Maps</a> <a href={this.props.house.references[0].url}>See Listing</a>
                </p>
            </div>
        )
    }
}

const Score = (props) => {
    return (
        <div>
            <p>Score: {JSON.stringify(props.rawscore)}</p>
        </div>
    )
}

const Tags = (props) => {
    const tags = props.tags.map(t => <li key={t}>{t}</li>);

    return (
        <div>
            <p>Tags</p>
            <ul>
                {tags}
            </ul>
        </div>
    )
}