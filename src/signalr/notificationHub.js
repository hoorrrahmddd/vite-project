import * as signalR from '@microsoft/signalr';

let connection = null;

export const startConnection = () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7037/notifications") 
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => {
      console.log(" SignalR connected!");
    })
    .catch(err => {
      console.error(" SignalR connection error:", err);
    });
};

export const onNotificationReceived = (callback) => {
  if (connection) {
    connection.on("ReceiveNotification", callback);
  }
};
