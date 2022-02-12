import axios from 'axios'
import Cookies from 'universal-cookie';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import ProjectList from './components/Project.js'
import ProjectForm from './components/ProjectForm.js'
import TODOList from './components/TODO.js'
import TODOForm from './components/TODOForm.js'
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
        'link': '/todos'
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

  deleteTODO(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, { headers })
      .then(response => {
        this.setState({ todos: this.state.todos.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  createTODO(text, project, creator) {
    const headers = this.get_headers()
    const data = { text: text, project: project, creator: creator }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/todos/`, data, { headers })
      .then(response => {
        let new_todo = response.data
        const project = this.state.projects.filter((item) => item.id === new_todo.project_id)[0]
        new_todo.project_id = project
        const creator = this.state.users.filter((item) => item.uuid === new_todo.creator)[0]
        new_todo.creator = creator
        this.setState({ todos: [...this.state.todos, new_todo] })
      }).catch(error => console.log(error))
  }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
      .then(response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  createProject(name, repository, users) {
    const headers = this.get_headers()
    const data = { name: name, repository: repository, users: [users] }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, { headers })
      .then(response => {
        let new_project = response.data
        const user = this.state.users.filter((item) => item.uuid === new_project.user)[0]
        new_project.user = user
        this.setState({ projects: [...this.state.projects, new_project] })
      }).catch(error => console.log(error))
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
              <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, repository, users) => this.createProject(name, repository, users)} />} />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
              <Route exact path='/todos/create' component={() => <TODOForm projects={this.state.projects} users={this.state.users} createTODO={(text, project, creator) => this.createTODO(text, project, creator)} />} />
              <Route exact path='/todos' component={() => <TODOList todos={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)} />} />
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
