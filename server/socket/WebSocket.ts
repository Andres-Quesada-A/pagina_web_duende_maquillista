import WebSocket from "ws";
export class Socket {
    private static instance: Socket;
    private wss: WebSocket.Server;
    private userWebSocketMap: Map<number, WebSocket> = new Map<number,WebSocket>();

    private constructor(config: any) {

        this.wss = new WebSocket.Server(config);
        this.wss.on('connection', (ws) => {
            console.log('Client connected');
            ws.on('message', (message) => {
                console.log('received: %s', message);
                const data = JSON.parse(message.toString());
                if (data.userId) {
                    this.userWebSocketMap.set(data.userId, ws);
                }
            });
            ws.on('close', () => {
                // Remove the user identifier from the map when the connection is closed
                this.userWebSocketMap.forEach((value, key) => {
                  if (value === ws) {
                    this.userWebSocketMap.delete(key);
                    console.log(`User ${key} disconnected`);
                  }
                });
              });
        });
    }

    public static getInstance(config: any): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket(config);
        }
        return Socket.instance;
    }

    public sendToUser(userId: number, message: string): void {
        const ws = this.userWebSocketMap.get(userId);
        if (ws) {
            ws.send(message);
        }
    }
}