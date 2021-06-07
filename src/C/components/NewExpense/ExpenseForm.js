import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Wrapper from "../Helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const titleInputRef = useRef();
  /* ref keeps real dom element*/
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  const [error, setError] = useState();

  const titleChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValidTitle(true);
    }
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    if (event.target.value.trim().length > 0) {
      setIsValidAmount(true);
    }
  };

  const dateChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValidDate(true);
    }
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    /* Refs are better to use if only read is required 
    read/write => use hooks with useState
    Setting value for refs are not react way 
    it uses html dom manipulation thus not recommended
    Controlled component: the internal state is controlled by react 
    if u add ref to an input and set its value then it is controlled*/
    const enteredTitleRef = titleInputRef.current.value;
    const enteredAmountRef = amountInputRef.current.value;
    const enteredDateRef = dateInputRef.current.value;

    if (enteredTitleRef.trim().length === 0) {
      setIsValidTitle(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid Title",
      });
    }

    if (enteredAmountRef.trim().length === 0) {
      setIsValidAmount(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid amount",
      });
    }

    if (enteredDateRef.trim().length === 0) {
      setIsValidDate(false);
    }

    if (
      enteredTitleRef.trim().length === 0 ||
      enteredAmountRef.trim().length === 0 ||
      enteredDateRef.trim().length === 0
    ) {
      return;
    }

    const expenseData = {
      title: enteredTitleRef,
      amount: +enteredAmountRef,
      date: new Date(enteredDateRef),
    };

    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      <form onSubmit={submitHandler}>
        <div className={styles["new-expense__controls"]}>
          <div
            className={`${styles["new-expense__control"]} ${
              !isValidTitle && styles.invalid
            }`}
          >
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              ref={titleInputRef}
            />
          </div>
          <div
            className={`${styles["new-expense__control"]} ${
              !isValidAmount && styles.invalid
            }`}
          >
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
              ref={amountInputRef}
            />
          </div>
          <div
            className={`${styles["new-expense__control"]} ${
              !isValidDate && styles.invalid
            }`}
          >
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              max="2022-12-31"
              value={enteredDate} // Two way binding
              onChange={dateChangeHandler}
              ref={dateInputRef}
            />
          </div>
        </div>
        <div className={styles["new-expense__actions"]}>
          <Button type="button" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Expense</Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ExpenseForm;
