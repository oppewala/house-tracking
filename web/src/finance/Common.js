import React from 'react';

const formatter = (value, opt) => {
    let val = value;
    if (opt === 'currency') {
        let currencyFormatter = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD'})
        val = currencyFormatter.format(val);
    }

    if (opt === 'percent') {
        let perc = +Math.round(val * 10000) / 100;
        val = perc + '%';
    }

    return val;
}

export function BudgetRow (props) {
    let val = formatter(props.val, props.format)

    return (
        <div className="row">
            {props.desc} | {val}
        </div>
    )
}

export function BudgetSubTotal(props) {
    let val = formatter(props.val, props.format)

    return (
        <div className="row sub-total">
            <b>{props.desc} | {val}</b>
        </div>
    )
}

export default { BudgetRow, BudgetSubTotal }