import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Words from './pages/words/words'; 
import AddWord from './pages/addWord/addWord';
import UpdateWord from './pages/updateWord/updateWord';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/words" component={Words}/>
          <Route path="/words/update/:id" component={UpdateWord}/>
          <Route path="/words/add/" component={AddWord} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
