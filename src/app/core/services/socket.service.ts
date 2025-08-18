// import { Injectable } from "@angular/core";
// import { io, Socket } from "socket.io-client";
// import { environment } from "../../../configs/environment";

// @Injectable({
//   providedIn: "root"
// })
// export class SocketService {
//   private socket: Socket | null = null;

//   constructor() {
//     console.log("🔗 Connecting to socket server");
//     if (!this.socket) {
//       this.socket = io(environment.socketUrl, {
//         withCredentials: true,
//         autoConnect: true,
//         path: "/socket",
//         transports: ["websocket"]
//       });

//       this.socket.on("connect", () => {
//         console.log("🔗 Connected to socket server");
//       });

//       this.socket.on("disconnect", () => {
//         console.log("❌ Disconnected from socket server");
//       });

//       this.socket.on("error", err => {
//         console.error("Socket error:", err);
//       });

//       this.socket.connect();
//     }
//   }

//   disconnect() {
//     this.socket?.disconnect();
//   }

//   reconnect() {
//     if (this.socket) {
//       this.socket.connect();
//     } else {
//       console.warn("Socket is not initialized.");
//     }
//   }

//   emit(event: string, body: any) {
//     this.socket?.emit("events", { event, body });
//   }

//   on(event: string, callback: (data: any) => void) {
//     this.socket?.on(event, callback);
//   }
// }
