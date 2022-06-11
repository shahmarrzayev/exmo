import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(8090, { cors: { origin: '*' } })
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MessageGateway.name);

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userRoom = client.handshake.query.userId;
    console.log('userRoom -- ', userRoom);
    if (userRoom) {
      client.join(userRoom);
    }
    console.log(client.rooms);

    this.logger.debug(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, payload: string): WsResponse<string> {
    client.emit('messageToClient', { data: payload });
    return;
  }
}
