import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { UserService } from 'src/user/user.service';
import { TaskOrder } from './task.interface';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';
import { HttpException } from '@nestjs/common';
import * as OT from 'ot';
@WebSocketGateway({
  cors: {
    origin: '*',  // 可以配置允许的源
    methods: '*',
  },
})
export class TaskGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private otServer = new Map<number, OT.Server>();// taskId -> OTServer（每个任务的 OT 状态）

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
  async handleTaskDrag(client: Socket, payload: UpdateTaskOrderDto[]) {
    console.log('监听任务拖拽');
    console.log(payload)
    //更新数据库数据
    const updateOrder = payload.map((value) => this.taskService.updateOrder(value));
    let newOrderTask = await Promise.all(updateOrder);
    console.log(newOrderTask)
    //向所有用户广播
    client.broadcast.emit('taskDragUpdate', {
      status: 'success'
    });
  }

  @SubscribeMessage('onDescriptionFocus')
  async handleStartEditing(client: Socket, payload: { taskTitle: string, taskId: number, username: string, id: string }) {
    console.log(`${payload.username}开始编辑,信息${payload}`);
    // 查询用户是否存在
    let user = await this.userService.findById(+payload.id);
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    //向除了自己以外的用户进行广播
    client.broadcast.emit('onDescriptionFocus', {
      taskTitle: payload.taskTitle,
      taskId: payload.id,
      username: payload.username,
      id: payload.id
    })
  }

  @SubscribeMessage('onDescriptionBlur')
  async handleEndEditing(client: Socket, payload: { taskTitle: string, taskId: number, username: string, id: string }) {
    console.log(`${payload.username}结束编辑消息,信息${payload}`);
    // 查询用户是否存在
    let user = await this.userService.findById(+payload.id);
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    //向除了自己以外的用户进行广播
    client.broadcast.emit('onDescriptionFocus', {
      taskTitle: payload.taskTitle,
      taskId: payload.id,
      username: payload.username,
      id: payload.id
    })
  }

  // 监听客户端的OT操作
  @SubscribeMessage('otOperation')
  handleOTOperation(client: Socket, payload: { taskId: string, operation: any }) {
    console.log('协同编辑');
    const { taskId, operation } = payload;
    const otServer = this.getOrCreateOTServer(+taskId);

    //将接收到的操作转换为其他可以处理的格式
    const transformedOperation = otServer.receiveOperation(0, operation);

    // 广播给其他用户
    client.broadcast.emit('otOperation', transformedOperation);
  }

  // 获取或创建OT服务
  private getOrCreateOTServer(taskId: number): OT.Server {
    if (!this.otServer.has(taskId)) {
      // 创建新的任务
      this.otServer.set(taskId, new OT.Server(''));
    }
    return this.otServer.get(taskId);
  }
}
