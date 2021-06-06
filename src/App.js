import React, { useState } from "react";
import Expenses from "./C/components/Expenses/Expenses";
import NewExpense from "./C/components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id: 1,
    title: "Car 2019",
    amount: 20,
    date: new Date(2019, 5, 4),
  },
  {
    id: 2,
    title: "Paper 2020",
    amount: 21,
    date: new Date(2020, 2, 4),
  },
  {
    id: 3,
    title: "Book 2021",
    amount: 22,
    date: new Date(2021, 8, 30),
  },
  {
    id: 4,
    title: "Clock 2022",
    amount: 23,
    date: new Date(2022, 7, 6),
  },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (enteredExpenseData) => {
    setExpenses((prevExpenses) => {
      enteredExpenseData.id = Math.random().toString();
      return [enteredExpenseData, ...prevExpenses];
    });
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.id !== id
      );
      return updatedExpenses;
    });
  };

  return (
    <React.Fragment>
      <NewExpense onAddExpense={addExpenseHandler}></NewExpense>
      <Expenses expenses={expenses} onDelete={deleteExpenseHandler}></Expenses>
    </React.Fragment>
  );

  /* Instead we could use <></>*/
}

export default App;
