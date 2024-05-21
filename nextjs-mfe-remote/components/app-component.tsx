import React, { ChangeEvent, useEffect, useState } from 'react';

import NextjsRemoteComponent from './nextjs-remote-component';
import { IUsers } from '../common/types';

const AppComponent = () => {
  const [userId, setUserId] = useState<string>('');
  const [users, setUsers] = useState<Array<IUsers>>([]);
  const bc = new BroadcastChannel('app_channel');

  useEffect(() => {
    const apiURL = '/api';
    bc.postMessage({ type: 'SET_URL', data: { apiURL } });
    fetch(`${apiURL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setTimeout(() => setUserId('1'), 500);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      bc.postMessage({ type: 'UPDATE_USER', data: { userId } });
    }
  }, [userId]);

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
  };

  return (
    <>
      <div className='d-flex justify-content-center m-4'>
        <select
          className='bg-light text-dark rounded p-2'
          onChange={onChangeHandler}
          value={userId}
        >
          {users.map(({ userId, name }: IUsers) => (
            <option value={userId} key={userId}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center m-4'>
        <NextjsRemoteComponent />
      </div>
    </>
  );
};

export default AppComponent;
