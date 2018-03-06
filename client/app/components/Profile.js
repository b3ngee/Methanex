import React from 'react';
import { profile } from '../styles/profile.scss';

const Profile = () =>
    <div className={ profile }>
      <p> Hello {localStorage.getItem('user_name')}! </p>
    </div>;

export default Profile;
