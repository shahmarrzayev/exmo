import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
// import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  // async connectToRedis(): Promise<void> {
  //   const redis = createClient();
  //   this.adapterConstructor = createAdapter(redis);
  // }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
