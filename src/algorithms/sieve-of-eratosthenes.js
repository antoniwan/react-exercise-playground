import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import axios from "axios";
import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";
import AlgorithmLayout from "../components/AlgorithmLayout";

const algorithmName = `Sieve of Eratosthenes`;
const algorithmDescription = `Simple, ancient algorithm for finding all prime numbers up to any given limit.`;
const algorithmInstructions = `In this coding exercise I will find all the prime numbers less than or equal to a given integer using Eratosthenes' method.`;
const algorithmURL = `https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes`;
const sourceFileURL = `https://raw.githubusercontent.com/antoniwan/react-exercise-playground/master/src/algorithms/sieve-of-eratosthenes.js`;

const StyledAlgorithm = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  .number-green {
    color: var(--color-pretty-green);
    font-weight: bold;
  }

  .prime-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline;

    li {
      display: inline;

      &:after {
        content: ", ";
      }
    }
  }

  .number-list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .number {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 1px solid var(--color-black);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.95rem;
    opacity: 0.9;

    &.striked-out {
      background: var(--color-pretty-pink);
      opacity: 0.4;
    }

    &.prime {
      background: var(--color-pretty-green);
    }
  }
`;

const Number = ({ number, isStrikedOut, isPrime }) => {
  return (
    <div>
      <li
        className={`
          number
          ${isStrikedOut ? "striked-out" : ""}
          ${isPrime ? "prime" : ""}
        `}
        key={`number-${number}`}
      >
        {number}
      </li>
    </div>
  );
};

class Sieve_of_Eratosthenes extends Component {
  constructor() {
    super();
    this.state = {
      numberAmount: 50,
      numberArray: [],
      primeNumberArray: [],
      crossedOutNumberArray: [],
      activityLogArray: [],
      sourceCode: null
    };
    this.addLogItem = this.addLogItem.bind(this);
    this.generateNumberArray = this.generateNumberArray.bind(this);
    this.algorithm = this.algorithm.bind(this);
    this.pushPrime = this.pushPrime.bind(this);
    this.getNumberMultiples = this.getNumberMultiples.bind(this);
    this.handleNumberAmountChange = this.handleNumberAmountChange.bind(this);
    this.getSourceCode = this.getSourceCode.bind(this);
    this.resetAlgorithm = this.resetAlgorithm.bind(this);
  }

  componentDidMount() {
    this.generateNumberArray();
    this.getSourceCode();
  }

  getSourceCode() {
    axios.get(sourceFileURL).then(response => {
      console.log(response.data);
      this.setState(
        {
          sourceCode: response.data
        },
        () => {
          Prism.highlightAll();
        }
      );
    });
  }

  generateNumberArray() {
    const { numberAmount } = this.state;
    let startingFrom = 2;
    let numberArray = [];

    // const numberArray = new Array(numberAmount).fill().map(() => {
    //   return index++;
    // });
    // This iteration only works on 1st run for some reason!
    // Dunno why! WTF!!!!!

    for (let index = 0; index < numberAmount; index++) {
      numberArray[index] = startingFrom;
      startingFrom += 1;
    }

    this.setState({ numberArray }, () => {
      this.addLogItem(`Generating ${numberAmount} numbers as an array`);
      this.addLogItem(`Starting the algorithm!`);
      this.algorithm();
    });
  }

  addLogItem(message) {
    console.log(message);
    const { activityLogArray } = this.state;
    activityLogArray.push(message);
    this.setState({
      activityLogArray
    });
  }

  algorithm() {
    const { numberArray, crossedOutNumberArray } = this.state;
    const smallestPrimeNumber = 2;
    this.pushPrime(smallestPrimeNumber);
    let p = smallestPrimeNumber;

    for (let value of numberArray) {
      this.getNumberMultiples(value);
      if (value > p && !crossedOutNumberArray.includes(value)) {
        p = value;
        this.pushPrime(p);
      }
    }
    // To-do: Can we add how much time it took to complete?
  }

  getNumberMultiples(p) {
    const { numberArray, crossedOutNumberArray } = this.state;
    return numberArray.map(number => {
      const multiple = p * number;
      // find multiple in the numberArray
      // if found, cross it out from the list
      // aka, add it to the crossedOutNumberArray
      if (numberArray.includes(multiple)) {
        if (!crossedOutNumberArray.includes(multiple)) {
          crossedOutNumberArray.push(multiple);
          this.setState(
            {
              crossedOutNumberArray
            },
            () => {
              this.addLogItem(
                `Cross out ${p *
                  number} (${p} x ${number}). It's a multiple of ${p}`
              );
            }
          );
        }
      }
      return multiple;
    });
  }

  pushPrime(number) {
    let { primeNumberArray } = this.state;
    primeNumberArray.push(number);
    this.setState(
      {
        primeNumberArray
      },
      () => {
        this.addLogItem(`Found a new prime number: ${number}`);
      }
    );
  }

  handleNumberAmountChange(e) {
    const newNumberAmount = e.target.value;
    this.setState(
      {
        numberAmount: newNumberAmount
      },
      () => {
        this.resetAlgorithm();
      }
    );
  }

  resetAlgorithm() {
    this.addLogItem(`Reset the algorithm!`);
    this.setState(
      {
        numberArray: [],
        primeNumberArray: [],
        crossedOutNumberArray: [],
        activityLogArray: []
      },
      () => {
        this.generateNumberArray();
      }
    );
  }

  render() {
    const {
      numberAmount,
      primeNumberArray,
      numberArray,
      crossedOutNumberArray,
      activityLogArray,
      sourceCode
    } = this.state;

    const numberList = numberArray.map(number => {
      return (
        <Number
          key={number}
          isStrikedOut={crossedOutNumberArray.includes(number)}
          isPrime={primeNumberArray.includes(number)}
          number={number}
        />
      );
    });

    const primeNumberList = primeNumberArray.map(primeNumber => {
      return <li key={`prime-${primeNumber}`}>{primeNumber}</li>;
    });

    const activityLogList = activityLogArray.map(activity => {
      return <li key={`log-entry-${Math.random()}`}>{activity}</li>;
    });

    return (
      <AlgorithmLayout
        algorithmName={algorithmName}
        algorithmDescription={algorithmDescription}
        algorithmInstructions={algorithmInstructions}
        algorithmURL={algorithmURL}
      >
        <StyledAlgorithm>
          <Tabs>
            <TabList>
              <Tab>Solution</Tab>
              <Tab>Actions Log</Tab>
              <Tab>Notes</Tab>
              <Tab>Source Code</Tab>
            </TabList>

            <TabPanel>
              <h2>Number Array</h2>
              <p>
                I'm currently checking for primes up to number {numberAmount}.{" "}
                <span className="number-green">Green numbers</span> are primes.
                Modify the amount of integers to check here:{" "}
                <input
                  type="number"
                  id="numbers"
                  name="numbers"
                  min={2}
                  value={numberAmount}
                  onChange={this.handleNumberAmountChange}
                />
                .
              </p>

              <div>
                <ul className="number-list">{numberList}</ul>
              </div>

              <aside className="algorithm__aside">
                <h2>Found Prime Numbers</h2>
                <ul className="prime-list">{primeNumberList}</ul>
              </aside>
            </TabPanel>

            <TabPanel>
              <h2>Actions Log</h2>
              <div>
                <ol>{activityLogList}</ol>
              </div>
            </TabPanel>

            <TabPanel>
              <h2>Notes</h2>
              <ul>
                <li>
                  <a
                    href={algorithmURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more about the algorithm here.
                  </a>
                </li>
                <li>
                  This algorithm is so inneficient that it will wreck your
                  browser if you input a number bigger than 500ish!
                </li>
              </ul>
            </TabPanel>

            <TabPanel>
              <h2>Source Code</h2>
              <pre>
                <code className="language-javascript">{sourceCode}</code>
              </pre>
            </TabPanel>
          </Tabs>
        </StyledAlgorithm>
      </AlgorithmLayout>
    );
  }
}

export default Sieve_of_Eratosthenes;
