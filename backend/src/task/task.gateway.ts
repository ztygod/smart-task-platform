import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { UserService } from 'src/user/user.service';
import { TaskOrder } from './task.interface';

@WebSocketGateway({
  cors: {
    origin: '*',  // 可以配置允许的源
    methods: '*',
  },
})
export class TaskGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService
  ) { }

  //连接鉴权
  async handleConnection(client: Socket, ...args: any[]) {
    try {

    } catch (error) {
      client.disconnect()//无效Token断开连接
    }
  }

  //监听任务状态开始编辑
  @SubscribeMessage('taskStatusEditing')
  handleStatusEditing(client: Socket, payload: { taskId: String }) {
    console.log('监听任务状态开始编辑')
    //广播给其他用户（排除自己）
    client.broadcast.emit('taskStatusEditing', {
      taskId: payload.taskId
    });
  }

  //监听任务更新事件
  @SubscribeMessage('taskStatusEditEnd')
  handleStatusEditEnd(client: Socket, payload: { taskId: String, status: String }) {
    //向其他用户进行广播
    client.broadcast.emit('taskStatusEditEnd', {
      taskId: payload.taskId,
      status: payload.status,
    });
  }

  //监听任务拖拽
  @SubscribeMessage('taskDragUpdate')
  handleTaskDrag(client: Socket, payload: TaskOrder[]) {
    console.log('监听任务拖拽');
    //更新数据库数据
    const updateOrder = payload.map((value, index) => this.taskService.updateOrder(value.item));
    Promise.all(updateOrder)
      .then(() => {
        console.log('success')
      })
      .catch((err) => {
        console.log('err', err)
      })
    //向其他用户广播
    client.broadcast.emit('taskDragUpdate', {

    })

  }
}
