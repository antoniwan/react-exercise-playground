import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
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
`;

class AlgorithmLayout extends Component {
  render() {
    const {
      algorithmDescription,
      algorithmName,
      algoirthmURL,
      Solution,
      Notes,
      ActivityLog,
      SourceCode
    } = this.props;
    return (
      <MainLayout>
        <StyledAlgorithmLayout>
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
                <Tab>Notes</Tab>
                <Tab>Source Code</Tab>
                <Tab>Activity Log</Tab>
              </TabList>

              <TabPanel>
                <Solution />
              </TabPanel>
              <TabPanel>
                <h2>Source Code</h2>
                <SourceCode />
              </TabPanel>

              <TabPanel>
                <h2>Notes</h2>
                <Notes />
              </TabPanel>

              <TabPanel>
                <h3>Activity Log</h3>
                <ActivityLog />
              </TabPanel>
            </Tabs>
          </div>
        </StyledAlgorithmLayout>
      </MainLayout>
    );
  }
}

export default AlgorithmLayout;
