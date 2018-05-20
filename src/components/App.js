import React, { Component } from 'react'
import HeaderContainer from './HeaderContainer'
import LoginContainer from './LoginContainer'
import UserContainer from './UserContainer'
import FriendsContainer from './FriendsContainer'
import './app.css'

const VK_API_VERSION = 5.75

class App extends Component {
    state = {
        user: null,
        friends: []
    }

    componentDidMount() {
        VK.Auth.getLoginStatus(response => {
            if (response.status === 'connected') {
                // если пользователь залогинен в ВК
                this.setStateFromSession(response.session)
            }
        })
    }

    setStateFromSession = session => {
        let user = { firstName: '', lastName: '' }
        if (typeof(session.user) === 'undefined') {
            // Этого поля нет тогда, когда пользователь был залогинен ранее.
            VK.api('users.get', { uid: session.mid, v: VK_API_VERSION }, r => {
                user.firstName = r.response[0].first_name
                user.lastName = r.response[0].last_name
            })
        } else {
            // Если авторизация прошла только что (от VK.Auth.login(authInfo);), то имя и фамилия уже будут в ответе
            user.firstName = session.user.first_name
            user.lastName = session.user.last_name
        }
        let friends = []
        VK.api('friends.get', { count: 5, fields: "first_name, last_name", v: VK_API_VERSION }, r => {
            friends = r.response.items
            this.setState({ user: user, friends: friends })
        })
    }

    handleLogout= () => {
        // @TODO Add error callback.
        if(this.state.user) VK.Auth.logout(r => console.log('Logout:', r))
        this.setState({ user: null, friends: [] })
    }

    handleAuthorize = () => {
        let rights = 1024 + 2
        VK.Auth.login((response) => {
                this.setStateFromSession(response.session)
            },
            rights
        )
    }

    render() {
        return (
            <div id="container">
                <HeaderContainer />
                <p>При нажатии кнопки "Авторизоваться" - делает oauth авторизацию ВКонтакте,
                    и показывает имя авторизованного пользователя и 5 любых друзей пользователя.</p>
                {!this.state.user ? (
                    <LoginContainer
                        onLogin={this.handleAuthorize}
                    />
                ) : (
                    <div>
                        <UserContainer
                            user={this.state.user}
                            onLogout={this.handleLogout}
                        />
                        <FriendsContainer friends={this.state.friends}/>
                    </div>
                    )
                }
                <div id="footer"><span>*</span>Сайт не хранит никакую информацию, включая куки</div>
            </div>
        )
    }

}

export default App