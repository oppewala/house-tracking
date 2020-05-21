import React, {Component} from "react";

export class Property extends Component {
    BuildAddress = (property) => {
        const addressParts = [
            property.Address.Street,
            property.Address.Suburb,
            property.Address.Postcode,
            property.Address.State
        ]
        return addressParts.join(', ');
    }

    BuildHouseLayout = (house) => {
        const houseLayoutParts = [
            'Bedrooms: ' + house.Bedrooms,
            'Bathrooms: ' + house.Bathrooms,
            'Parking: ' + house.Parking,
        ]
        return houseLayoutParts.join(' | ')
    }

    render() {
        const address = this.BuildAddress(this.props.house)
        const houseLayout = this.BuildHouseLayout(this.props.house)
        const listingUrl = this.props.house.References[0].URL;

        return (
            <div>
                <h4>{address}</h4>
                <p>{houseLayout}</p>
                <Score rawscore={this.props.house.RawScore} />
                <Tags tags={this.props.house.Tags} />
                <p><a href='https://www.google.com'>Open in Maps</a> <a href={listingUrl}>See Listing</a>
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