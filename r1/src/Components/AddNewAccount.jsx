import {useState } from "react";

const AddNewAccount = ({ addAccount }) => {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState({
    class: "hidden",
    text: "",
  });


  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const dataFormHandler = (event) => {
    if(name.length === 0 || lastName.length === 0){
      event.preventDefault();
      setMessage({
        class: "visible",
        text: "Missing name or surname",
      });
      setTimeout(() => {
        setMessage({ class: "hidden", text: ""});
      }, 1500);
    }else{
      setMessage({
        class: "visible",
        text: "Successfully added account",
      });
      setTimeout(() => {
        setMessage({ class: "hidden", text: ""});
      }, 1500);
      event.preventDefault();
      addAccount(name, lastName);
      setName("");
      setLastName("");
    }
  };

  return (
    <div className="creation">
      <h2>Account creation</h2>
      <p className="message">{message.text}</p>
      <form onSubmit={dataFormHandler}>
        <div className="name">
          <label htmlFor="name">Name</label>
          <input className="createInput" type="text" id="name" value={name} onChange={nameHandler} />
        </div>
        <div className="lastName">
          <label htmlFor="lastName">Last Name</label>
          <input className="createInput" type="text" id="lastName" value={lastName} onChange={lastNameHandler} />
        </div>
        <button className="creation-button" type="submit">Add Account</button>
      </form>
    </div>
  );
};

export default AddNewAccount;
