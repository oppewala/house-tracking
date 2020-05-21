import {Property} from "./Property";
import React from "react";

export const PropertyDirectory = (props) => {
    const houses = props.houses.map(h =><Property key={h.ID} house={h}/>);

    return (
        <div>
            {houses}
        </div>
    )
}