import React from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import VoteItemList from "./components/VoteItemList";
import Authentication from "./components/Authentication";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={VoteItemList} />
          <Route path="/auth" component={Authentication} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
