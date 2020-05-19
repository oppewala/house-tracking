import React from 'react'
import { BudgetRow, BudgetSubTotal} from './Common'

const Costs = (props) => {

    return (
        <div>
            <h3>Costs</h3>
            <BudgetRow desc="Property Price" val={props.price} format='currency' />
            <BudgetRow desc="Stamp Duty" val={props.stampDuty} format='currency' />
            <BudgetRow desc="Transfer Fee" val={props.transferFee} format='currency' />
            <BudgetRow desc="Mortgage Application Fee" val={props.applicationFee} format='currency' />
            <BudgetSubTotal desc="Total Cost" val={props.total} format='currency' />
        </div>
    )
}

export default Costs;