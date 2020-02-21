import React from 'react';
import './App.css';
import FormOfficeTools from "./Components/FormOfficeTools/FormOfficeTools";
import Layout from "./Components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import OfficeTools from "./Components/OfficeTools/OfficeTools";

function App() {
  return (
    <div className="App">
      <Layout>
          <Switch>
              <Route exact path="/" component={OfficeTools}/>
              <Route exact path="/add" component={FormOfficeTools}/>
              <Route exact path="/officetools/:id" component={FormOfficeTools}/>
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
