import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Words from './pages/words/words'; 
import AddWord from './pages/addWord/addWord';
import UpdateWord from './pages/updateWord/updateWord';
import { WordsProvider } from './contexts/wordsContext';
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastProvider autoDismiss={true}>
          <WordsProvider>
            <Switch>
              <Route path="/words" component={Words}/>
              <Route path="/words/update/:id" component={UpdateWord}/>
              <Route path="/words/add/" component={AddWord} />
            </Switch>
          </WordsProvider>
        </ToastProvider>
      </Router>
    </div>
  );
}

export default App;
