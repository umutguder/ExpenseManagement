import React, { useState } from "react";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
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

    if (enteredTitle.trim().length === 0) {
      setIsValidTitle(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid Title",
      });
    }

    if (enteredAmount.trim().length === 0) {
      setIsValidAmount(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid amount",
      });
    }

    if (enteredDate.trim().length === 0) {
      setIsValidDate(false);
    }

    if (
      enteredTitle.trim().length === 0 ||
      enteredAmount.trim().length === 0 ||
      enteredDate.trim().length === 0
    ) {
      return;
    }

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
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
    <div>
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
    </div>
  );
};

export default ExpenseForm;
