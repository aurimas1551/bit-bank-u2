import { useContext, useEffect, useState } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import AddNewAccount from "./AddNewAccount";
import { Global } from "./Global";

function Accounts() {

  const {list} = useContext(Global);

  const [account, setAccount] = useState( list || []);
  useEffect(
    () => list !== null ? setAccount(list)
    : console.log(""),
    [list]
);

  const {setCreate} = useContext(Global);

  const accountAddHandler = (name, lastName) => {
    setCreate({
      name: name,
      lastName: lastName,
      id: parseInt(Date.now()),
      sum: 0,
      blockStatus: false
    })
    setAccount((prevStateAccount) => [
      ...prevStateAccount,
      {
        name,
        lastName,
        id: parseInt(Date.now()),
        sum: 0,
        blockStatus: false
      },
    ]);
  };

  return (
    <div>
      <AccountSummary accounts={account} />
      <AddNewAccount addAccount={accountAddHandler} />
      <AccountList accounts={account} setAccount={setAccount} />
    </div>
  );
}

export default Accounts;
