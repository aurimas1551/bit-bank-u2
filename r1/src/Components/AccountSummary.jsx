const AccountSummary = ({ accounts }) => {
  return (
    <div className="summary">
      <h2>Accounts Summary</h2>
      <div>
        <p className="summary-text">Amount of accounts: {accounts.length}</p>
        <p className="summary-text">
          Total amount of money in accounts:
          {" " + +accounts.reduce((sum, counter) => sum + counter.sum, 0)} €
        </p>
        <p className="summary-text">Accounts with 0 balance:
        {" " + +accounts.filter((acc) => acc.sum === 0 ).length}
        </p>
        <p className="summary-text">Accounts with negative balance:
        {" " + +accounts.filter((acc) => acc.sum < 0 ).length}
        </p>
        <p className="summary-text">Accounts with balance: 
        {" " + +accounts.filter((acc) => acc.sum > 0 ).length}
        </p>
      </div>
    </div>
  );
};

export default AccountSummary;
