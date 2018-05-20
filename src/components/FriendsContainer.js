import React from 'react'

const FriendsContainer = ({ friends }) => {
    return (
        <div id='FriendsContainer' className='inner-container'>
            <h3>Ваши друзья (до 5-ти):</h3>
            {friends.length === 0 ? (
                <div>Друзей нет!</div>
            ) : (
                <ul>
                    {friends.map((friend, i) => (
                        <li key={i}>{friend.first_name} {friend.last_name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default FriendsContainer