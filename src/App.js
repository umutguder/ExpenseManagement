import React, { useState, useContext } from "react";

import MainHeader from "./C/components/MainHeader/MainHeader";
import Login from "./C/components/Login/Login";
import Home from "./C/components/Home/Home";
import AuthContext from "./store/auth-context";

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

  const ctx = useContext(AuthContext);
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
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && (
          <Home
            expenses={expenses}
            addExpenseHandler={addExpenseHandler}
            deleteExpenseHandler={deleteExpenseHandler}
            onLogout={ctx.onLogout}
          />
        )}
      </main>
    </>
  );

  /* Instead we could use <></>*/
}

export default App;
