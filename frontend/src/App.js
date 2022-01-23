import axios from 'axios'
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import ProjectList from './components/Project.js'
import TODOList from './components/TODO.js'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'menu': [],
      'projects': [],
      'todos': [],
    }
  }

  componentDidMount() {
    const menu = [
      {
        'title': 'Пользователи',
        'link': '/'
      },
      {
        'title': 'Проекты',
        'link': '/projects'
      },
      {
        'title': 'TODO',
        'link': '/TODO'
      },
    ]

    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users,
            'menu': menu
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects,
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos/')
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos,
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <MenuList menu={this.state.menu} />
          </div>
          <div>
            <Switch>
              <Route exact path='/' component={() => <UserList users={this.state.users} />} />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
              <Route exact path='/TODO' component={() => <TODOList todos={this.state.todos} />} />
              <Redirect from='/users' to='/' />
              <Route component={NotFound404} />
            </Switch>
          </div>
          <div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
