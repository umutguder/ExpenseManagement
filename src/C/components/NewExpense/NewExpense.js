import React, { useState } from "react";
import Button from "../UI/Button";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const startEdittingHandler = () => {
    setIsEditing(true);
  };

  const stopEdittingHandler = () => {
    setIsEditing(false);
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <Button onClick={startEdittingHandler}>Add New Expense</Button>
      )}
      {isEditing && (
        <ExpenseForm
          onCancel={stopEdittingHandler}
          onSaveExpenseData={saveExpenseDataHandler}
        ></ExpenseForm>
      )}
    </div>
  );
}

export default NewExpense;
