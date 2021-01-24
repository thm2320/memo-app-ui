import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PersonList from './containers/PersonList/PersonList'
import './App.css';
import { PersonForm } from './containers/PersonForm/PersonForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route path="/person/:id?" render={() => <PersonForm />} />y
          <Route exact path="/" render={() => <PersonList />} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
