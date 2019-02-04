import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";

const algorithmName = `Sieve of Eratosthenes`;
const algorithmDescription = `Simple, ancient algorithm for finding all prime numbers up to any given limit`;
const algoirthmURL = `https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes`;

const StyledAlgorithm = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .number-green {
    color: var(--color-pretty-green);
    font-weight: bold;
  }

  .algorithm__header {
    h2 {
      font-weight: 600;
      font-style: italic;
      color: var(--color-dark-gray);
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    margin-bottom: 1rem;
  }

  .algorithm__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .algorithm__main {
    flex: 65%;
    margin-bottom: 1rem;
  }

  .algorithm__aside {
    margin-bottom: 1rem;
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
      activityLogArray: []
    };
    this.addLogItem = this.addLogItem.bind(this);
    this.generateNumberArray = this.generateNumberArray.bind(this);
    this.algorithm = this.algorithm.bind(this);
    this.pushPrime = this.pushPrime.bind(this);
    this.getNumberMultiples = this.getNumberMultiples.bind(this);
    this.handleNumberAmountChange = this.handleNumberAmountChange.bind(this);
    this.resetAlgorithm = this.resetAlgorithm.bind(this);
  }

  componentDidMount() {
    this.generateNumberArray();
  }

  generateNumberArray() {
    const { numberAmount } = this.state;
    let startingFrom = 2;
    let numberArray = [];

    // This iteration is not working for some reason!
    // WTF!!!!!
    // const numberArray = new Array(numberAmount).fill().map(() => {
    //   return index++;
    // });

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
                  number} (${p} x ${number}) because it's a multiple of ${p}.`
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
        this.addLogItem(`Found a new prime number: ${number}!`);
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
      activityLogArray
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
      return <li key={`process-${Math.random()}`}>{activity}</li>;
    });

    return (
      <MainLayout>
        <StyledAlgorithm>
          <div className="algorithm__header">
            <h2>Algorithm</h2>
            <h1>{algorithmName}</h1>
            <p>
              {algorithmDescription}.{" "}
              <a href={algoirthmURL} target="_blank" rel="noopener noreferrer">
                Learn more about the algorithm
              </a>{" "}
              and see my source code on Github here.
            </p>
          </div>

          <div className="algorithm__content">
            <Tabs>
              <TabList>
                <Tab>Interactive Solution</Tab>
                <Tab>Source Code</Tab>
                <Tab>Notes</Tab>
                <Tab>Activity Log</Tab>
              </TabList>

              <TabPanel>
                <h2>Number Array</h2>
                <p>
                  We are generating {numberAmount} numbers for this exercise and
                  numbers in <span className="number-green">green</span> are
                  primes. Modify the sample size here:{" "}
                  <input
                    type="number"
                    id="numbers"
                    name="numbers"
                    min={2}
                    value={numberAmount}
                    onChange={this.handleNumberAmountChange}
                  />
                  .{" "}
                  <em>
                    Keep in mind that if you input a very big number, your
                    browser will need time to process everything!
                  </em>
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
                <h2>Source Code</h2>
              </TabPanel>

              <TabPanel>
                <h2>Notes</h2>
              </TabPanel>

              <TabPanel>
                <h3>Activity Log</h3>
                <div>
                  <ol>{activityLogList}</ol>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </StyledAlgorithm>
      </MainLayout>
    );
  }
}

export default Sieve_of_Eratosthenes;
