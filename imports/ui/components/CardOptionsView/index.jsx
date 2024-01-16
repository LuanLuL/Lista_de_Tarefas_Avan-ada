import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./style.css";

export function CardOptionsView(props) {
  function handleSelectOption(event) {
    event.preventDefault();
    switch (props.option) {
      case 1: {
        console.log(props.option);
        break;
      }
      case 2: {
        console.log(props.option);
        break;
      }
      case 3: {
        console.log(props.option);
        break;
      }
      case 4: {
        console.log(props.option);
        break;
      }
      default:
        break;
    }
    return;
  }

  return (
    <Button
      className="cardOptionsView"
      color={props.color}
      variant="contained"
      onClick={(e) => handleSelectOption(e)}
    >
      <Card
        className="textContent"
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
      >
        <CardContent>{props.children}</CardContent>
      </Card>
    </Button>
  );
}
