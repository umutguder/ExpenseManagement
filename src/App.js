import React, { useState, useEffect } from "react";

import MainHeader from "./C/components/MainHeader/MainHeader";
import Login from "./C/components/Login/Login";
import Home from "./C/components/Home/Home";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Runs when dependencies chance
  // No dependencies => runs only once after start
  //runs only when we wanted to
  // dont run in every render
  // no deadlock
  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

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

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && (
          <Home
            expenses={expenses}
            addExpenseHandler={addExpenseHandler}
            deleteExpenseHandler={deleteExpenseHandler}
            onLogout={logoutHandler}
          />
        )}
      </main>
    </React.Fragment>
  );

  /* Instead we could use <></>*/
}

export default App;
