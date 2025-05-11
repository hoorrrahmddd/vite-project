// src/signalr/notificationHub.js
import * as signalR from '@microsoft/signalr';

let connection = null;
let isConnected = false;

export const startConnection = () => {
  if (isConnected) return;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7037/notifications")
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => {
      console.log("✅ SignalR connected");
      isConnected = true;
    })
    .catch(err => {
      console.error("❌ SignalR connection error:", err);
    });
};

export const onNotificationReceived = (callback) => {
  if (connection) {
    // ✅ امسح أي listeners قبل ما تسجل الجديد
    connection.off("ReceiveNotification");
    connection.on("ReceiveNotification", callback);
  }
};
