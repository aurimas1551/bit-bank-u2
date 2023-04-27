import { useContext, useState } from "react";
import AccountsFilter from "./AccountFilter";
import { Global } from "./Global";

const AccountList = ({ accounts, setAccount }) => {
  //account: name, lastName, id, sum, accountEnteredAmount

  const { setDelete, setEdit, setEditTax } = useContext(Global);

  const [enteredAmount, setEnteredAmount] = useState({
    id: null,
    amount: "",
  });

  const [message, setMessage] = useState({
    class: "hidden",
    text: "",
  });
  const [filter, setFilter] = useState("default");
  const [sort, setSort] = useState("default");
  const [confirmLargeAmount, setConfirmLargeAmount] = useState(false);

  const deleteHandler = (id) => {
    let account = accounts.filter((acc) => acc.id === id);
    if (account[0].sum > 0 || account[0].sum < 0) {
      setMessage({
        class: "visible",
        text: "Cant delete account with money or negative balance",
      });
      setTimeout(() => {
        setMessage({ class: "hidden", text: "" });
      }, 1500);
    } else {
      setMessage({
        class: "visible",
        text: "Account deleted",
      });
      setTimeout(() => {
        setMessage({ class: "hidden", text: "" });
      }, 1500);
      let accountToBeDeleted = accounts.find((acc) => acc.id === id);
      setDelete(accountToBeDeleted);
      setAccount((acc) => acc.filter((acc) => acc.id !== id));
    }
  };

  const amountHandler = (event) => {
    let enteredAmountInt = event.target.value;
    if (typeof +enteredAmountInt === "number" && +enteredAmountInt >= 0) {
      setEnteredAmount({
        id: event.target.id,
        amount: Math.abs(event.target.value),
      });
    }
  };

  const handleAddFunds = (id) => {
    if (enteredAmount.amount > 1000) {
      setConfirmLargeAmount(true);
    } else {
      depositHandler(id);
    }
  };

  const handleConfirmLargeAmount = () => {
    depositHandler(parseInt(enteredAmount.id));
    setConfirmLargeAmount(false);
  };

  const declineLargeAmount = () => {
    setConfirmLargeAmount(false);
    setEnteredAmount({
      id: null,
      amount: "",
    });
  };

  const handleBlock = (acc, status) => {
    acc.blockStatus = status;
    setEdit(acc);
    console.log(acc);
  };

  const depositHandler = (id) => {
    if (parseInt(enteredAmount.id) === id) {
      let isDepositing = true;
      let accountDeposit = accounts.map((acc) =>
        acc.id === id
          ? (enteredAmount.amount > 0
              ? (isDepositing = true)
              : (isDepositing = false),
            {
              ...acc,
              sum: +(acc.sum + +enteredAmount.amount),
            })
          : acc
      );
      if (isDepositing) {
        let updateAccount = accountDeposit.find((acc) => acc.id === id);
        setEdit(updateAccount);
        setAccount(accountDeposit);
        setMessage({
          class: "visible",
          text: "Deposit successful",
        });
        setTimeout(() => {
          setMessage({ class: "hidden", text: "" });
        }, 1500);
      } else {
        setMessage({
          class: "visible",
          text: "Deposit was not made",
        });
        setTimeout(() => {
          setMessage({ class: "hidden", text: "" });
        }, 1500);
      }
      setEnteredAmount({
        id: null,
        amount: "",
      });
    }
  };

  const withdrawHandler = (id) => {
    if (parseInt(enteredAmount.id) === id) {
      let isWithdrawing = true;
      let accountWithdraw = accounts.map((acc) =>
        acc.id === id
          ? +parseInt(enteredAmount.amount) !== 0 &&
            acc.sum >= parseInt(enteredAmount.amount)
            ? ((isWithdrawing = true),
              {
                ...acc,
                sum: +(acc.sum - +enteredAmount.amount),
              })
            : ((isWithdrawing = false), acc)
          : acc
      );
      if (isWithdrawing) {
        let updateAccount = accountWithdraw.find((acc) => acc.id === id);
        setEdit(updateAccount);
        setAccount(accountWithdraw);
        setMessage({
          class: "visible",
          text: "Withdrawal successful",
        });
        setTimeout(() => {
          setMessage({ class: "hidden", text: "" });
        }, 1500);
      } else {
        setMessage({
          class: "visible",
          text: "Cant withdraw 0 or more then the account balance",
        });
        setTimeout(() => {
          setMessage({ class: "hidden", text: "" });
        }, 1500);
      }
    }
    setEnteredAmount({
      id: null,
      amount: "",
    });
  };

  const filterHandler = (event) => {
    setFilter(event.target.value);
  };

  const sortHandler = (event) => {
    setSort(event.target.value);
  };

  const tax = () => {
    setEditTax(Date.now());
  }

  const filteredAccounts = accounts.filter((acc) =>
    filter === "blocked"
      ? acc.blockStatus === 1
      : filter === "notBlocked"
      ? acc.blockStatus === 0
      : filter === "withBalance"
      ? acc.sum > 0
      : filter === "withZeroBalance"
      ? acc.sum === 0
      : filter === "withNegativeBalance"
      ? acc.sum < 0
      : true
  );

  const lastSortedAccounts = filteredAccounts.sort((a, b) =>
    sort === "lastNameAsc"
    ? a.lastName.localeCompare(b.lastName)
    : sort === "lastNameDesc"
    ? b.lastName.localeCompare(a.lastName)
    : sort === "balanceAsc"
    ? a.sum-b.sum
    : sort === "balanceDesc"
    ? b.sum-a.sum
    : true
  );

  return (
    <div className="account-list">
      <h2>Account list</h2>
      <button onClick={() => tax()}>TAX -5Euro</button>
      <p className="message">{message.text}</p>
      <AccountsFilter filterHandler={filterHandler} sortHandler={sortHandler}></AccountsFilter>
      <div className="account-display-list">
        {
        [...lastSortedAccounts]
          .map((acc) => (
            <div className="account-generated-list" key={acc.id}>
              <div className="account-info">
                <p>
                  {acc.name} {acc.lastName} Balance: {acc.sum} €
                </p>
                {acc.blockStatus === 0 ? (
                  <button onClick={() => deleteHandler(acc.id)}>
                    Delete Account
                  </button>
                ) : null}
              </div>
              {acc.blockStatus === 0 ? (
                <div>
                  <input
                    className="balance-input"
                    type="number"
                    id={acc.id}
                    onChange={amountHandler}
                    value={
                      parseInt(acc.id) === parseInt(enteredAmount.id)
                        ? enteredAmount.amount
                        : 0
                    }
                  ></input>
                  <button onClick={() => withdrawHandler(acc.id)}>
                    Withdraw
                  </button>
                  <button onClick={() => handleAddFunds(acc.id)}>
                    Deposit
                  </button>
                  <button onClick={() => handleBlock(acc, 1)}>Block</button>
                  </div>
              ) : (
                <button onClick={() => handleBlock(acc, 0)}>unblock</button>
              )}
            </div>
          ))}
        {confirmLargeAmount && (
          <div className="">
            <p>Are you sure you want to add ${enteredAmount.amount} to the account?</p>
            <button onClick={() => handleConfirmLargeAmount()}>Yes</button>
            <button onClick={() => declineLargeAmount()}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountList;
