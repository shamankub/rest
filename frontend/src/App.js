import axios from 'axios'
import Cookies from 'universal-cookie';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import ProjectList from './components/Project.js'
import TODOList from './components/TODO.js'
import LoginForm from './components/Auth.js'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'


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
      'token': '',
    }
  }

  load_data() {

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
        'title': 'ToDo',
        'link': '/TODO'
      },
    ]

    this.setState(
      {
        'menu': menu,
      }
    )

    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', { headers })
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users,
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ users: [] })
      })

    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects,
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })

    axios.get('http://127.0.0.1:8000/api/todos/', { headers })
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos,
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ todos: [] })
      })
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div class="login_link">
            {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
          </div>
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
