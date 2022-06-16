import { SaveMessageDto } from './dto/saveMessage.dto';
import { MessageService } from './service/message.service';
import { EConfig } from 'src/common/config.enum';
import { getConfig } from 'src/common/util';
import { verify } from 'jsonwebtoken';
import { Logger, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const users = {};

@WebSocketGateway(8090, { cors: { origin: '*' } })
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) { }
  private readonly logger = new Logger(MessageGateway.name);
  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log(`Initialized:`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const socketId = client.id;
    const bearerHeader = client.handshake.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    try {
      const { id }: any = verify(accessToken, getConfig(EConfig.EXMO_JWT_ACCESS_SECRET_KEY));
      users[`${id}`] = socketId;
      this.logger.debug(`User ${id} connected: ${client.id}`);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw new ForbiddenException('Please register or sign in.');
    }
  }

  handleDisconnect(client: Socket) {
    const bearerHeader = client.handshake.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    try {
      const { id }: any = verify(accessToken, getConfig(EConfig.EXMO_JWT_ACCESS_SECRET_KEY));
      delete users[`${id}`];
      this.logger.debug(`User ${id} disconnected: ${client.id}`);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw new InternalServerErrorException();
    }
  }

  @SubscribeMessage('sendToReceiver')
  async sendMessage(client: Socket, payload: SaveMessageDto) {
    const { to } = payload;
    console.log(users[to]);
    client.to(users[to]).emit('receiveFromSender', { ...payload });
    await this.messageService.create(payload);
  }
}
