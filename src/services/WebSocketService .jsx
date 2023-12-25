// // WebSocketService.jsx
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';
//
// const SOCKET_URL = 'http://localhost:8080/ws-message';
//
// const connectWebSocket = (onMessageReceived) => {
//   const socket = new SockJS(SOCKET_URL);
//   const stompClient = Stomp.over(socket);
//
//   stompClient.connect({}, () => {
//     console.log('Connected to WebSocket');
//     stompClient.subscribe('/topic/message', (msg) => {
//       const message = JSON.parse(msg.body);
//       onMessageReceived(message); // Pass the received message to the callback function
//     });
//   });
//
//   return stompClient;
// };
//
// export default connectWebSocket;
