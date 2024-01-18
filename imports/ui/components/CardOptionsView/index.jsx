import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function CardOptionsView(props) {
  const history = useNavigate();
  return (
    <Button
      className="cardOptionsView"
      color={props.color}
      variant="contained"
      onClick={() => history(`/tasks/${props.option}`)}
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
