import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      startGame: false,
      isGameOver: false
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.isOver = this.isOver.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    setInterval(() => {
      if (this.state.isGameOver) {
        return;
      }
      this.setState({ time: this.state.startGame ? this.state.time + 1 : 0 });
    }, 1000);
  }
  isOver() {
    if (this.state.x === 250 && this.state.y === 250) {
      this.setState({ isGameOver: true });
      return true;
    }
    return false;
  }
  handleKeyPress(event) {
    // 37: left, 38: up, 39: right, 40: down
    if (this.isOver()) {
      return;
    }
    let { x, y } = this.state;
    if (event.keyCode === 37) {
      if (this.state.startGame) {
        this.setState({ x: this.state.x - 5, y: this.state.y });
        x -= 5;
      }
    } else if (event.keyCode === 38) {
      if (this.state.startGame) {
        this.setState({ x: this.state.x, y: this.state.y - 5 });
        y -= 5;
      }
    } else if (event.keyCode === 39) {
      if (this.state.startGame) {
        this.setState({ x: this.state.x + 5, y: this.state.y });
        x += 5;
      }
    } else if (event.keyCode === 40) {
      if (this.state.startGame) {
        this.setState({ x: this.state.x, y: this.state.y + 5 });
        y += 5;
      }
    }
  }
  componentWillUnmount() {
    if(this.state.isGameOver) {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
  }

  render() {
    return (
      <>
        {!this.state.startGame && (
          <button
            className="start"
            onClick={() => {
              this.setState({ startGame: true });
            }}
          >
            Start
          </button>
        )}
        {
          <div
            className="ball"
            style={{ left: this.state.x, top: this.state.y }}
          ></div>
        }
        {<div className="hole"></div>}
        {<div className="heading-timer">{this.state.time}</div>}
      </>
    );
  }
}

export default Timer;
