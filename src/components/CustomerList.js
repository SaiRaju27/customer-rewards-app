import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../styles/styledComponents';
import { CUSTOMER, CUSTOMER_LIST } from '../constants/rewardConstants';

const CustomerList = ({ customers, onSelect }) => {
  const uniqueCustomers = [...new Set(customers.map(txn => txn.customerId))];

  return (
    <div>
      <h3>{CUSTOMER_LIST}</h3>
      {uniqueCustomers.map(id => (
        <Button key={id} onClick={() => onSelect(id)}>
          {CUSTOMER} {id}
        </Button>
      ))}
    </div>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CustomerList;
