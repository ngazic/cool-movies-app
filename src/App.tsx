import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import { useDispatch } from "react-redux";
import { getTopMovies } from './store/actions/index';
import List from './components/Containers/List/List';
import Single from "./components/Containers/Single/Single";


const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(getTopMovies());
  return (<div className="App">
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to='/movie' />
        </Route>
        <Route path="/movie">
          <List show='movies'/>
        </Route>
        <Route path="/tv">
          <List show='shows' />
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
