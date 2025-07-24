import React, { useState } from "react";
import "./Calculator.css";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";

export default function Calculator() {
  const [num, setNum] = useState("0");
  const [oldNum, setOldNum] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewNum, setWaitingForNewNum] = useState(false); // controla se está esperando novo número após operador

  function inputNum(e) {
    const input = e.target.value;

    // Se está esperando o próximo número, substitui o num
    if (waitingForNewNum) {
      setNum(input === "." ? "0." : input);
      setWaitingForNewNum(false);
      return;
    }

    // Evita múltiplos pontos
    if (input === "." && num.includes(".")) return;

    if (num === "0" && input !== ".") {
      setNum(input);
    } else {
      setNum(num + input);
    }
  }

  function clear() {
    setNum("0");
    setOldNum(null);
    setOperator(null);
    setWaitingForNewNum(false);
  }

  function percentage() {
    setNum((parseFloat(num) / 100).toString());
  }

  function changeSign() {
    if (num.startsWith("-")) {
      setNum(num.slice(1));
    } else if (num !== "0") {
      setNum("-" + num);
    }
  }

  function operatorHandler(e) {
    const op = e.target.value;

    // Se já tem um operador e está esperando um número novo, muda só o operador
    if (operator && waitingForNewNum) {
      setOperator(op);
      return;
    }

    if (oldNum === null) {
      setOldNum(num);
    } else if (!waitingForNewNum) {
      // Calcula antes de mudar o operador
      const resultado = calcular(parseFloat(oldNum), parseFloat(num), operator);
      setOldNum(resultado.toString());
      setNum(resultado.toString());
    }

    setOperator(op);
    setWaitingForNewNum(true);
  }

  function calcular(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "X":
        return a * b;
      case "/":
        return b === 0 ? "Erro" : a / b;
      default:
        return b;
    }
  }

  function calculate() {
    if (operator === null || waitingForNewNum) return;

    const resultado = calcular(parseFloat(oldNum), parseFloat(num), operator);
    setNum(resultado.toString());
    setOldNum(null);
    setOperator(null);
    setWaitingForNewNum(false);
  }

  return (
    <div>
      <Box m={5} />
      <Container maxWidth="xs">
        <div className="wrapper">
          <Box m={12} />
          <h1 className="result">{num}</h1>
          <button onClick={clear}>AC</button>
          <button onClick={changeSign}>+/-</button>
          <button onClick={percentage}>%</button>
          <button className="orange" onClick={operatorHandler} value="/">
            /
          </button>
          <button className="gray" onClick={inputNum} value="7">
            7
          </button>
          <button className="gray" onClick={inputNum} value="8">
            8
          </button>
          <button className="gray" onClick={inputNum} value="9">
            9
          </button>
          <button className="orange" onClick={operatorHandler} value="X">
            X
          </button>
          <button className="gray" onClick={inputNum} value="4">
            4
          </button>
          <button className="gray" onClick={inputNum} value="5">
            5
          </button>
          <button className="gray" onClick={inputNum} value="6">
            6
          </button>
          <button className="orange" onClick={operatorHandler} value="-">
            -
          </button>
          <button className="gray" onClick={inputNum} value="1">
            1
          </button>
          <button className="gray" onClick={inputNum} value="2">
            2
          </button>
          <button className="gray" onClick={inputNum} value="3">
            3
          </button>
          <button className="orange" onClick={operatorHandler} value="+">
            +
          </button>
          <button className="gray" onClick={inputNum} value="0">
            0
          </button>
          <button className="gray" onClick={inputNum} value=".">
            .
          </button>
          <button className="orange" onClick={calculate}>
            =
          </button>
        </div>
      </Container>
    </div>
  );
}
