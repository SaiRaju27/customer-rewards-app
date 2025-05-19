import React, { useEffect, useState } from "react";
import { fetchTransactions } from "./api/fetchTransactions";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import TransactionList from "./components/TransactionList";
import { Container } from "./styles/styledComponents";
import { MONTHS } from "./constants/rewardConstants";
import logger from "./loggers";
logger.info("test log! pinotest stream from reactjs application.");

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    MONTHS[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMonth, setViewMonth] = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch transactions");
        setLoading(false);
      });
  }, []);

  const handleCustomerSelect = (id) => {
    setSelectedCustomer(id);
    setViewMonth(null);
  };

  const customerAllTxns = transactions.filter(
    (txn) => txn.customerId === selectedCustomer
  );

  return (
    <Container>
      <h2>Customer Rewards Points Tracker</h2>

      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomerList
            customers={transactions}
            onSelect={handleCustomerSelect}
          />

          {selectedCustomer && (
            <>
              <CustomerDetails
                transactions={customerAllTxns}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthSelect={(month) => setViewMonth(month)}
              />
              {viewMonth && (
                // <TransactionList
                //   transactions={customerAllTxns}
                //   selectedMonth={selectedMonth}
                //   selectedYear={selectedYear}
                //   onMonthChange={setSelectedMonth}
                //   onYearChange={setSelectedYear}
                // />
                <TransactionList
                  transactions={customerAllTxns.filter(
                    (txn) =>
                      MONTHS[new Date(txn.date).getMonth()] +
                        "-" +
                        new Date(txn.date).getFullYear() ===
                      viewMonth
                  )}
                  selectedMonth={viewMonth && viewMonth.split("-")[0]}
                  selectedYear={
                    viewMonth && parseInt(viewMonth.split("-")[1], 10)
                  }
                  onMonthChange={setSelectedMonth}
                  onYearChange={setSelectedYear}
                  setViewMonth={setViewMonth}
                  viewMonth={viewMonth}
                />
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
