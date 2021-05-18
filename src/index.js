import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: "",
            cachedValue: 0,
            displayedValue: 0,
            ignoreDisplayedValue: false,
        };
    }

    clear() {
        this.setState({ displayedValue: 0 });
    }

    writeNumber(number) {
        let newDisplayedValue;
        if (!this.state.ignoreDisplayedValue) {
            newDisplayedValue = this.state.displayedValue !== 0 ? this.state.displayedValue + "" + number : number;
        } else {
            newDisplayedValue = number;
            this.setState({
                ignoreDisplayedValue: false,
            });
        }
        this.setState({ displayedValue: newDisplayedValue });
    }

    decimalPoint(value) {
        if (this.state.displayedValue.toString().includes(value)) return;
        this.setState({ displayedValue: this.state.displayedValue + "" + value });
    }

    negate() {
        this.setState({ displayedValue: -this.state.displayedValue });
    }

    percent() {
        this.setState({ displayedValue: this.state.displayedValue / 100 });
    }

    operation(operation) {
        this.setState({
            operation: operation,
            cachedValue: parseFloat(this.state.displayedValue),
            displayedValue: parseFloat(this.state.displayedValue),
            ignoreDisplayedValue: true,
        });
    }

    result() {
        let result;
        let operation = this.state.operation;
        if (operation === "") return;

        let cachedValue = parseFloat(this.state.cachedValue);
        let currentValue = parseFloat(this.state.displayedValue);
        switch (operation) {
            case "÷":
                result = cachedValue / currentValue;
                break;
            case "x":
                result = cachedValue * currentValue;
                break;
            case "-":
                result = cachedValue - currentValue;
                break;
            case "+":
                result = cachedValue + currentValue;
                break;
            default:
                break;
        }
        this.setState((state, props) => ({
            operation: "",
            cachedValue: 0,
            displayedValue: result,
        }));
    }

    clickedButton(value) {
        switch (value) {
            case "AC":
                this.clear();
                break;
            case ".":
                this.decimalPoint(value);
                break;
            case "+/-":
                this.negate();
                break;
            case "%":
                this.percent();
                break;
            case "÷":
            case "x":
            case "-":
            case "+":
                this.operation(value);
                break;
            case "=":
                this.result();
                break;
            default:
                this.writeNumber(parseInt(value));
        }
    }

    render() {
        return (
            <div className="app">
                <Display value={this.state.displayedValue} />
                <ButtonPannel onClick={val => this.clickedButton(val)} />
            </div>
        );
    }
}

function Display(props) {
    return (
        <div className="display">
            <div>{props.value}</div>
        </div>
    );
}

class ButtonPannel extends React.Component {
    renderButton(value, classes = "") {
        return <Button value={value} className={classes} onClick={() => this.props.onClick(value)} />;
    }

    render() {
        return (
            <div className="button-panel">
                <div>
                    {this.renderButton("AC", "darkgrey")}
                    {this.renderButton("+/-", "darkgrey")}
                    {this.renderButton("%", "darkgrey")}
                    {this.renderButton("÷", "orange")}
                </div>
                <div>
                    {this.renderButton("7")}
                    {this.renderButton("8")}
                    {this.renderButton("9")}
                    {this.renderButton("x", "orange")}
                </div>
                <div>
                    {this.renderButton("4")}
                    {this.renderButton("5")}
                    {this.renderButton("6")}
                    {this.renderButton("-", "orange")}
                </div>
                <div>
                    {this.renderButton("1")}
                    {this.renderButton("2")}
                    {this.renderButton("3")}
                    {this.renderButton("+", "orange")}
                </div>
                <div>
                    {this.renderButton("0", "wide")}
                    {this.renderButton(".")}
                    {this.renderButton("=", "orange")}
                </div>
            </div>
        );
    }
}

function Button(props) {
    return (
        <div className={`button ${props.className}`} onClick={() => props.onClick()}>
            <button>{props.value}</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
