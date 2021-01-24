import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PersonList from './containers/PersonList/PersonList'
import './App.css';
import { PersonForm } from './containers/PersonForm/PersonForm';
import { MemoList } from './containers/MemoList/MemoList'
import { MemoForm } from './containers/MemoForm/MemoForm';
import { MemoDetails } from './containers/MemoDetails/MemoDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/memo/details/:id" render={() => <MemoDetails />} />
          <Route path="/memo/create-memo" render={() => <MemoForm />} />
          <Route path="/memos/:personId?" render={() => <MemoList />} />
          <Route path="/person/:id?" render={() => <PersonForm />} />
          <Route exact path="/" render={() => <PersonList />} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
