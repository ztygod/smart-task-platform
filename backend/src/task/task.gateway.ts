import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';

@WebSocketGateway({ cors: true })
export class TaskGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly taskService: TaskService
  ) { }

  //连接鉴权
  async handleConnection(client: Socket, ...args: any[]) {
    try {

    } catch (error) {
      client.disconnect()//无效Token断开连接
    }
  }

  //监听任务编辑操作
  @SubscribeMessage('taskEditing')
  async handleMessage(client: Socket, taskId: string) {
    const task = await this.taskService.findOne(+taskId);
    const user = client.data.user;

    //广播编辑者信息（除了自己）
    client.broadcast.emit('taskEditing', {
      taskId,
      editor:
      {
        id: user.id,
        name: user.name,
      }
    })

    //更新任务当前的编辑者
    await this.taskService.updateDescription()
  }

  //监听任务更新事件
  @SubscribeMessage('taskUpdated')
  async handleTaskUpdated(client: Socket, payload: { taskid: string, changes: Partial<Task> }) {
    const updatedTask = await this.taskService.updateDescription();

    //广播更新后的任务数据
    this.server.emit('taskUpdated', updatedTask)
  }
}
