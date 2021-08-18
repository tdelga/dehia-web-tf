import Home from "./components/Home";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
