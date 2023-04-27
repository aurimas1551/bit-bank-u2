function AccountsFilter({filterHandler,sortHandler}) {
  return (
    <div>
    <div className="filter">
      <label htmlFor="filter">Choose accounts to display: </label>
      <select id="filter" onChange={filterHandler}>
        <option value="default">All accounts</option>
        <option value="blocked">Blocked accounts</option>
        <option value="notBlocked">Not blocked accounts</option>
        <option value="withBalance">Accounts with money</option>
        <option value="withZeroBalance">Accounts with 0 balance</option>
        <option value="withNegativeBalance">Accounts with negative balance</option>
      </select>
    </div>
    <div className="filter">
      <label htmlFor="sort">Choose sorting: </label>
      <select id="sort" onChange={sortHandler}>
        <option value="default">No order</option>
        <option value="lastNameAsc">By last name asc</option>
        <option value="lastNameDesc">By last name desc</option>
        <option value="balanceAsc">By balance asc</option>
        <option value="balanceDesc">By balance desc</option>
      </select>
    </div>
    </div>
  );
}

export default AccountsFilter;
