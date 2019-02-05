import React, { Component } from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";

const StyledAlgorithmLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

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
    margin-bottom: 1rem;
  }

  .react-tabs__tab {
    border: 1px solid var(--color-black);
    cursor: pointer;
    list-style: none;
    padding: 15px;
    border-radius: 0;
    line-height: 1.2rem;
    text-align: center;
  }

  .react-tabs__tab-list {
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
    display: flex;
  }

  .react-tabs__tab--selected {
    border: 1px solid var(--color-pretty-pink);
    background: var(--color-pretty-pink);
    color: white;
  }

  input {
    border: 1px solid black;
  }

  input[type="number"] {
    width: 50px;
  }

  .prism-code {
    width: 100%;
  }
`;

class AlgorithmLayout extends Component {
  render() {
    const {
      algorithmDescription,
      algorithmName,
      algorithmInstructions,
      algorithmURL,
      children
    } = this.props;
    return (
      <MainLayout>
        <StyledAlgorithmLayout>
          <div className="algorithm__header">
            <h2>Algorithm</h2>
            <h1>{algorithmName}</h1>
            <p>{algorithmDescription}</p>
            {/* <p>{algorithmInstructions}</p> */}
          </div>

          <div className="algorithm__content">{children}</div>
        </StyledAlgorithmLayout>
      </MainLayout>
    );
  }
}

export default AlgorithmLayout;
