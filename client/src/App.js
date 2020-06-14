import React from 'react';
import { Header, Container, Card } from "semantic-ui-react";
import UserInputForm from "./components/UserInputForm";
import "./App.css";

function App() {
  return (
    <Container fluid>
      <Header inverted as="h1" block textAlign="center">
        README Generator
      </Header>
      <Card fluid raised id="form">
        <UserInputForm />
      </Card>
    </Container>
  );
}

export default App;