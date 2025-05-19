import React, { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/rewardUtils";
import { Table, Th, Td, Button } from "../styles/styledComponents";
import {
  AMOUNT,
  DATE,
  DOLLAR,
  FILTERED_TRANSACTIONS,
  MONTH,
  MONTHS,
  NO_TRANSACTION,
  POINTS,
  TRANSACTIONS_HEADDER,
} from "../constants/rewardConstants";
import logger from "../loggers";

const TransactionList = ({
  transactions,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  setViewMonth,
  viewMonth,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const txnsPerPage = 5;

  const handleMonthChange = useCallback(
    (e) => {
      const newMonth = e.target.value;
      const updatedViewMonth = `${newMonth}-${selectedYear}`;
      setViewMonth(updatedViewMonth);
      onMonthChange(newMonth);
      setCurrentPage(1);
    },
    [onMonthChange, selectedYear,setViewMonth]
  );

  const handleYearChange = useCallback(
    (e) => {
      const newYear = parseInt(e.target.value);
      const updatedViewMonth = `${selectedMonth}-${newYear}`;
      setViewMonth(updatedViewMonth);
      onYearChange(newYear);
      setCurrentPage(1);
    },
    [onYearChange, selectedMonth,setViewMonth]
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const txnMonth = MONTHS[txnDate.getMonth()];
      const txnYear = txnDate.getFullYear();
      return txnMonth === selectedMonth && txnYear === selectedYear;
    });
  }, [transactions, selectedMonth, selectedYear]);

  logger.info({
    msg: FILTERED_TRANSACTIONS,
    count: filteredTransactions.length,
    sample: filteredTransactions.slice(0, 2),
  });

  const indexOfLastTxn = currentPage * txnsPerPage;
  const indexOfFirstTxn = indexOfLastTxn - txnsPerPage;
  const currentTxns = useMemo(() => {
    return filteredTransactions.slice(indexOfFirstTxn, indexOfLastTxn);
  }, [filteredTransactions, indexOfFirstTxn, indexOfLastTxn]);

  const totalPages = Math.ceil(filteredTransactions.length / txnsPerPage);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i); // 2025 to 2021

  return (
    <div>
      <h3>{TRANSACTIONS_HEADDER}</h3>

      {/* Filters */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          {MONTH}{" "}
          <select value={selectedMonth} onChange={handleMonthChange}>
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "1rem" }}>
          Year:{" "}
          <select value={selectedYear} onChange={handleYearChange}>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredTransactions.length === 0 ? (
        <p>{NO_TRANSACTION}</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>{DATE}</Th>
                <Th>{AMOUNT}</Th>
                <Th>{POINTS}</Th>
              </tr>
            </thead>
            <tbody>
              {currentTxns.map((txn) => (
                <tr key={txn.transactionId}>
                  <Td>{txn.date}</Td>
                  <Td>
                    {DOLLAR}
                    {txn.amount.toFixed(2)}
                  </Td>
                  <Td>{calculatePoints(txn.amount)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div style={{ marginTop: "1rem" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i + 1} onClick={() => paginate(i + 1)}>
                {i + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default TransactionList;
