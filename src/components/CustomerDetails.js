import React from 'react';
import PropTypes from 'prop-types';
import { calculatePoints, groupTransactionsByMonth } from '../utils/rewardUtils';
import { Table, Th, Td } from '../styles/styledComponents';
import { HEADING, TABLE_HEADER_ONE, TABLE_HEADER_THREE, TABLE_HEADER_TWO, TOTAL_POINTS, VIEW_ACTION_BUTTON } from '../constants/rewardConstants';

const CustomerDetails = ({ transactions, selectedMonth, selectedYear, onMonthSelect }) => {
  const customerTxns = groupTransactionsByMonth(transactions);
  const monthKeys = Object.keys(customerTxns);

  const monthSummary = monthKeys.map(monthKey => {
    const txns = customerTxns[monthKey];
    const total = txns.reduce((sum, t) => sum + calculatePoints(t.amount), 0);
    return { month: monthKey, points: total };
  });

  const totalPoints = monthSummary.reduce((sum, m) => sum + m.points, 0);

  return (
    <div>
      <h3>{HEADING}</h3>
      <Table>
        <thead>
          <tr>
            <Th>{TABLE_HEADER_ONE}</Th>
            <Th>{TABLE_HEADER_TWO}</Th>
            <Th>{TABLE_HEADER_THREE}</Th>
          </tr>
        </thead>
        <tbody>
          {monthSummary.map(row => (
            <tr key={row.month}>
              <Td>{row.month}</Td>
              <Td>{row.points}</Td>
              <Td>
                <button onClick={() => onMonthSelect(row.month)}>{VIEW_ACTION_BUTTON}</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p><strong>{TOTAL_POINTS}</strong> {totalPoints}</p>
    </div>
  );
};

CustomerDetails.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.number,
  onMonthSelect: PropTypes.func.isRequired,
};

export default CustomerDetails;
