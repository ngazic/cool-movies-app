import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import { useDispatch } from "react-redux";
import { getSearchItems } from './store/actions/index';
import List from './components/Containers/List/List';
import Single from "./components/Containers/Single/Single";


const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(getSearchItems());
  return (<div className="App">
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to='/search' />
        </Route>
        <Route path="/search">
          <List show='search'/>
        </Route>
        <Route path="/favorite">
          <List show='favorite' />
        </Route>
        <Route path="/single">
          <Single />
        </Route>
        <Route path="*">
          <Redirect to='/tv' />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>);
};

 
 export default App;
