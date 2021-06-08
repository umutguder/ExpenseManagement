import React from "react";

import Card from "../UI/Card";
import classes from "./Home.module.css";
import Expenses from "../Expenses/Expenses";
import NewExpense from "../NewExpense/NewExpense";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <NewExpense onAddExpense={props.addExpenseHandler}></NewExpense>
      <Expenses
        expenses={props.expenses}
        onDelete={props.deleteExpenseHandler}
      ></Expenses>
    </Card>
  );
};

export default Home;
