import React from 'react';

const Resources: React.FC = () => {
  return (
    <div>
      <h1 className="header header-xl">Resources</h1>
      <ul>
        <li>
          <a href="http://house.ksou.cn/" className="link">
            Sold Prices (house.ksou.cn)
          </a>
        </li>
        <li>
          <a href="https://pricedata.properties/" className="link">
            Suburb sold history (pricedata.properties/)
          </a>
        </li>
        <li>
          <a href="http://nbnmtm.australiaeast.cloudapp.azure.com/" className="link">
            Nbn Map (nbnmtm.australiaeast.cloudapp.azure.com/)
          </a>
        </li>
        <li>
          <a href="https://www.loans.com.au/calculators/offset-calculator" className="link">
            Offset Calculator
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Resources;
