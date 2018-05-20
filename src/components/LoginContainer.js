import React, { Component } from 'react'

class LoginContainer extends Component {
    componentDidUpdate() {
        // VK.UI.button('AuthorizeButton')
    }

    render = () => {
        return (
        <div id='LoginContainer' className='inner-container'>
            <div id="LoginAuthorize">Для продолжения необходимо</div>
            <button id="LoginAuthorizeButton" className="red light" type="submit" onClick={this.props.onLogin}>Авторизоваться</button>
            <div>в вашем аккаунте <span>VK.com</span></div>
        </div>
    )}
}

export default LoginContainer