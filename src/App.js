import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import JobItem from './components/JobItem'
import Protected from './components/Protected'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Protected exact path="/" component={Home} />
    <Protected exact path="/jobs" component={Jobs} />
    <Protected exact path="/jobs/:id" component={JobItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
