import React from 'react'

const UserContainer = ({ user, onLogout }) => (
    <div id='UserContainer' className='inner-container'>
        <div id="UserAuthorized">Вы получили доступ к ВКонтакте</div>
        <button id="UserLogout" className="red light" type="submit" onClick={onLogout}>Выйти</button>
        <h3 id="UserName">Ваше имя: {user.firstName} {user.lastName}</h3>
    </div>
)

export default UserContainer