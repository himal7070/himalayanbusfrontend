import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';
import { decodeJwtToken } from '../components/Authentication/TokenDecoder.jsx';

let webSocketClient;

const getAccessToken = () => localStorage.getItem('accessToken');

const decodeAccessToken = (accessToken) => {
  const decodedToken = decodeJwtToken(accessToken);
  return decodedToken.passengerId;
};

const createWebSocketClient = (onMessageReceived) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  const socket = new SockJS('http://localhost:8080/ws');
  const passengerId = decodeAccessToken(accessToken);

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = (frame) => {
    client.subscribe(`/user/${passengerId}/queue/notifications`, (message) => {
      onMessageReceived(message.body);
    });
  };

  client.onStompError = (frame) => {
    console.error('WebSocket error occurred:', frame.headers['message']);
  };

  return client;
};

const connectWebSocket = (onMessageReceived) => {
  if (!webSocketClient || !webSocketClient.connected) {
    webSocketClient = createWebSocketClient(onMessageReceived);
    webSocketClient.activate();
  }
};

const disconnectWebSocket = () => {
  if (webSocketClient && webSocketClient.connected) {
    webSocketClient.deactivate();
  }
};

const sendNotification = (notification) => {
  if (webSocketClient && webSocketClient.connected) {
    const jsonString = JSON.stringify(notification);
    webSocketClient.publish({ destination: '/app/delayBusDeparture', body: jsonString });
  } else {
    console.error('WebSocket connection is not open.');
  }
};

export { connectWebSocket, disconnectWebSocket, sendNotification };
