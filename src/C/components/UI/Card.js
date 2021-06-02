import React from "react";
import "./Card.css";

function Card(props) {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;

/* alternative function definition
const Card = (probs) => {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;

};
*/
