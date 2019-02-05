import React from "react";
import styled from "styled-components";

const StyledMainLayout = styled.div`
  header {
    background: var(--color-black);
    color: var(--color-white);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    h1 {
      margin: 0;
    }
  }
  header .header--container {
    width: 100%;
    max-width: calc(1024px - var(--base-padding) * 2);
    padding-top: calc(var(--base-padding) / 2);
    padding-bottom: calc(var(--base-padding) / 2);
    padding-left: calc(var(--base-padding) / 1);
    padding-right: calc(var(--base-padding) / 1);
  }

  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  main .main--container {
    width: calc(100% - var(--base-padding) * 2);
    max-width: calc(1024px - var(--base-padding) * 2);
    padding-top: calc(var(--base-padding) / 1);
    padding-bottom: calc(var(--base-padding) / 1);
    padding-left: calc(var(--base-padding) / 1);
    padding-right: calc(var(--base-padding) / 1);
    margin-top: 0;
    margin-bottom: calc(var(--base-padding) / 1);
    background: var(--color-white);
    box-shadow: 0 0px 5px rgba(57, 63, 72, 0.12);
  }
`;

const MainLayout = ({ children }) => {
  return (
    <StyledMainLayout>
      <header>
        <div className="header--container">
          <h1>
            <a href="/">
              <span role="img" aria-label="Go Back to the Home">
                🧠
              </span>
            </a>
          </h1>
        </div>
      </header>

      <main className="">
        <div className="main--container">{children}</div>
      </main>
    </StyledMainLayout>
  );
};

export default MainLayout;
