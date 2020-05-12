import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import './App.css'
import './routerMenu/Menu.css'
import Todos from './todoListApp/Todos.js'
import Chart from './routerMenu/Chart.js'
import Position from './routerMenu/Position.js'
import Accounts from './routerMenu/Accounts.js'
import Home from './routerMenu/Home/Home.js'
import WidgetsList from './widgetApp/WidgetList'
import SettingsList from './routerMenu/Settings/SettingsList'
import Dashboard from './routerMenu/hoc/dashboard'
import DragAndDrop from './routerMenu/DragAndDrop/Home'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuItems: [
        { label: 'Todo App', url: '/todoapp' },
        { label: 'Home', url: '/home' },
        { label: 'HOC', url: '/hoc' },
        { label: 'Chart', url: '/chart' },
        { label: 'Positions', url: '/positions' },
        { label: 'Accounts', url: '/accounts' },
        { label: 'Settings', url: '/settings' },
        { label: 'Widget App', url: '/widgets' },
        { label: 'Drag & Drop', url: '/draganddrop' }
      ]
    }
  }

  render () {
    return (
      <Router>
        <div className='app container'>
          <nav className='navbar navbar-inverse'>
            <div className='navbar-header'>
              <button
                type='button'
                className='navbar-toggle'
                data-toggle='collapse'
                data-target='#myNavbar'
              >
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
            </div>
            <div className='collapse navbar-collapse' id='myNavbar'>
              <ul className='nav navbar-nav'>
                {this.state.menuItems.map((item, index) => (
                  <li className='nav-item nav-link' key={index}>
                    <Link key={index} to={item.url}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path='/todoapp'>
              <Todos />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/hoc'>
              <Dashboard />
            </Route>
            <Route path='/chart'>
              <Chart />
            </Route>
            <Route path='/positions'>
              <Position />
            </Route>
            <Route path='/accounts'>
              <Accounts />
            </Route>
            <Route path='/settings'>
              <SettingsList />
            </Route>
            <Route path='/widgets'>
              <WidgetsList />
            </Route>
            <Route path='/draganddrop'>
              <DragAndDrop />
            </Route>
            <Route path='/'>
              <Redirect to='/todoapp' />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
