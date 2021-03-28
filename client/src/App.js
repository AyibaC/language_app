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
import ErrorBoundary from './ErrorBoundary';
import Login from './pages/login/login';
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import Home from './pages/home/home';
import Account from './pages/Account/Account';
import { createBrowserHistory } from 'history';
import NotFound from './pages/NotFound/NotFound'

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Auth0Provider
        domain="dev-1qrl1afc.eu.auth0.com"
        clientId="3A6FMsTa6Gmw1Gfq791fCfRe2iY6zcLR"
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}>
          <Router history={history}>
            <ToastProvider autoDismiss={true}>
              <WordsProvider>
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/words" component={Words}/>
                  <ProtectedRoute path="/words/update/:id" component={UpdateWord}/>
                  <ProtectedRoute path="/words/add" component={AddWord} />
                  <ProtectedRoute path="/account" component={Account}/>
                  <Route path="*" component={NotFound} />
                </Switch>
              </WordsProvider>
            </ToastProvider>
          </Router>
        </Auth0Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
