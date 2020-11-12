import React  from 'react';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Content from "../Components/Content/Content";
import styled from "styled-components";
import Books from "../Containers/Books";
import './App.css';

const StyledApp = styled("div")`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  color: #fff;
`;

/***************************************
 *                App
 ***************************************/
const App = () => {

  return (
    <StyledApp data-id="app">
      <Header data-id="header"/>
      <Content data-id="content">
        <Books/>
      </Content>
      <Footer data-id="footer"/>
     </StyledApp>
  );
}

export default App;
