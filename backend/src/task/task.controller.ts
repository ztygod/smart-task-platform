import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { createByNaturalLanguageDto } from './dto/create-by-natural-language.dto';
import { UpdateTaskDescDto } from './dto/update-task-desc.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Post('parse')
  async parse(@Body() createByNaturalLanguageDto: createByNaturalLanguageDto) {
    return await this.taskService.createByNaturalLanguage(createByNaturalLanguageDto);
  }

  @Get('get')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch('update/status')
  updateStatus(@Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    try {
      return this.taskService.updateStatus(updateTaskStatusDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.getResponse(), HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  @Patch('update/description')
  updateDescription(@Body() updateTaskDescDto: UpdateTaskDescDto) {
    return this.taskService.updateDescription(updateTaskDescDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
