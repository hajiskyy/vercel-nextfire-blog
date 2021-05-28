import React from 'react'
import { User } from '../lib/type'

interface Props {
  user: User
}

const UserProfile = (props: Props) => {
  return (
    <div className='box-center'>
      <img src={props.user.photoURL} className='card-img-center' />
      <p>
        <i>@{props.user.username}</i>
      </p>
      <h1>{props.user.displayName}</h1>
    </div>
  )
}

export default UserProfile
