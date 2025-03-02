import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { TaskRo, TaskStatus } from './task.interface';
import { createByNaturalLanguageDto } from './dto/create-by-natural-language.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }
  async create(createTaskDto: CreateTaskDto): Promise<TaskRo> {
    let taskInstance = new Task();
    taskInstance.title = createTaskDto.title;
    taskInstance.description = createTaskDto.description;
    taskInstance.status = createTaskDto.status;
    taskInstance.due_date = createTaskDto.due_date;
    taskInstance.created_at = new Date();
    taskInstance.updated_at = new Date();

    const error = await validate(taskInstance);
    if (error.length > 0) {
      const errorMessageFromat = { username: 'Taskinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', errorMessageFromat }, HttpStatus.BAD_REQUEST);
    } else {
      const newTask = await this.taskRepository.save(taskInstance);
      return this.buildTaskRO(newTask)
    }
  }

  async ceateByNaturalLanguage(ceateByNaturalLanguage: createByNaturalLanguageDto) {

  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  //构建响应成功返回的数据结构
  public buildTaskRO(task: Task) {
    const taskRo = {
      title: task.title,
      status: task.status as TaskStatus,
      due_date: task.due_date
    }

    return { task: taskRo };
  }
}
