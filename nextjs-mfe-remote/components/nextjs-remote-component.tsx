import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, Toast, ToastContainer } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { IMessage, ISnapshot, IUserInvestments } from '../common/types';

const NextjsRemoteComponent = () => {
  const [message, setMessage] = useState<IMessage>();
  const [snapshot, setSnapshot] = useState<ISnapshot>({});
  const [show, setShow] = useState<boolean>(false);
  const apiURLRef = useRef();
  const userIdRef = useRef();

  const loadData = () => {
    fetch(`${apiURLRef.current}/investments?userId=${userIdRef.current}`)
      .then((res) => res.json())
      .then((data: Array<IUserInvestments>) => {
        setSnapshot({
          securities: new Set(data.map(({ symbol }: IUserInvestments) => symbol)).size,
          sectors: new Set(data.map(({ sector }: IUserInvestments) => sector)).size,
          investmentValue: data
            .reduce((sum, { ttlInv }: IUserInvestments) => (ttlInv ? sum + ttlInv : sum), 0)
            .toFixed(2),
        });
      });
  };

  useEffect(() => {
    const bc = new BroadcastChannel('app_channel');
    bc.addEventListener('message', ({ data }) => {
      const { type, data: msgData } = data;
      setShow(true);
      setMessage(data);
      console.log('[NextJs Remote] Received Message');
      console.table([
        {
          date: new Date().toLocaleString(),
          type: type,
          data: JSON.stringify(msgData),
        },
      ]);
      if (data.type === 'SET_URL') {
        apiURLRef.current = msgData.apiURL;
      } else if (data.type === 'UPDATE_USER') {
        userIdRef.current = msgData.userId;
        loadData();
      } else if (data.type === 'REFRESH_DATA') {
        loadData();
      }
    });
    return () => {
      bc.close();
    };
  }, []);

  return (
    <div className='row'>
      <Card className='col-4 p-2 m-2 bg-info text-white'>
        <Card.Body>
          <Card.Title>{snapshot.securities}</Card.Title>
          <Card.Text>Securities</Card.Text>
        </Card.Body>
      </Card>

      <Card className='col-4 p-2 m-2 bg-primary text-white'>
        <Card.Body>
          <Card.Title>{snapshot.sectors}</Card.Title>
          <Card.Text>Sectors</Card.Text>
        </Card.Body>
      </Card>

      <Card className='col p-2 m-2 bg-success text-white'>
        <Card.Body>
          <Card.Title>${snapshot.investmentValue}</Card.Title>
          <Card.Text>Investment</Card.Text>
        </Card.Body>
      </Card>

      <ToastContainer position={'top-end'} style={{ zIndex: 10 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header closeButton={false}>
            <strong className='me-auto'>NextJS Remote: Broadcast Message Received</strong>
          </Toast.Header>
          <Toast.Body>{JSON.stringify(message)}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default NextjsRemoteComponent;
