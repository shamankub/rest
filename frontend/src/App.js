import axios from 'axios'
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/menu.js'
import Footer from './components/footer.js'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'menu': []
    }
  }

  componentDidMount() {
    const menu = [
      {
        'name': 'главная',
        'url': 'http://127.0.0.1:8000/'
      },
      {
        'name': 'api',
        'url': 'http://127.0.0.1:8000/api'
      },
      {
        'name': 'админка',
        'url': 'http://127.0.0.1:8000/admin'
      }
    ]

    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users,
            'menu': menu
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div>
          <MenuList menu={this.state.menu} />
        </div>
        <div>
          <UserList users={this.state.users} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}


export default App;
