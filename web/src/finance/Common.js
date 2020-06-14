import React from 'react';

const formatter = (value, opt) => {
  let val = value;
  if (opt === 'currency') {
    const currencyFormatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });
    val = currencyFormatter.format(val);
  }

  if (opt === 'percent') {
    const perc = +Math.round(val * 10000) / 100;
    val = `${perc}%`;
  }

  return val;
};

export function BudgetRow(props) {
  const { desc, format } = props;
  let { val } = props;

  if (val === null) return null;
  val = formatter(val, format);

  return (
    <div className="max-w-md my-2">
      <div className="flex">
        <div className="w-2/3">{desc}</div>
        <div className="w-32 text-right">{val}</div>
      </div>
    </div>
  );
}

export function BudgetSubTotal(props) {
  const { desc, format } = props;

  let { val } = props;
  val = formatter(val, format);

  return (
    <div className="max-w-md border-t-2 my-2">
      <div className="flex">
        <div className="w-2/3">{desc}</div>
        <div className="w-32 text-right">{val}</div>
      </div>
    </div>
  );
}
