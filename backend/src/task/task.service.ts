import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { TaskRo, TaskStatus } from './task.interface';
import { createByNaturalLanguageDto } from './dto/create-by-natural-language.dto';
import * as chrono from 'chrono-node';
import * as natural from 'natural';
import * as nodejieba from 'nodejieba';

@Injectable()
export class TaskService {
  private tokenizer = new natural.WordTokenizer();
  private stemmer = natural.PorterStemmer;
  private tfidf = new natural.TfIdf();
  private nounInflector = new natural.NounInflector();

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    nodejieba.load();
    this.trainTfIdf([
      '开发任务需要编写代码',
      '设计原型图并评审',
      '召开项目进度会议'
    ]);
  }
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

  //添加自然语言解析后的任务
  async ceateByNaturalLanguage(ceateByNaturalLanguage: createByNaturalLanguageDto) {

  }

  //解析自然语言
  parseTaskText(ceateByNaturalLanguage: createByNaturalLanguageDto) {
    const text = ceateByNaturalLanguage.text
    //分词
    const tokens = nodejieba.cut(text);

    //词干提取
    const stems = tokens.map((t) => this.stemmer.stem(t));

    //提取关键词，基于TF-IDF
    const keyWords = this.extractKeywords(text);

    //词性标准化
    const normalized = keyWords.map((k) => this.nounInflector.singularize(k));

    //提取日期
    const dueDate = this.extractDueDate(text);

    //判断任务状态
    const status = this.getTaskStatus(text);

    return {
      tokens,
      stems,
      keyWords,
      normalized,
      dueDate,
      status
    }
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
      due_date: task.due_date,
    }

    return { task: taskRo };
  }

  //解析截止时间
  private parseDueDate(text: string): Date | null {
    const results = chrono.parse(text);
    return results[0]?.start?.date() || null
  }

  //训练TF-IDF模型
  private trainTfIdf(trainingData: string[]) {
    trainingData.forEach((text) => this.tfidf.addDocument(text));
  }

  //关键词提取
  private extractKeywords(text: string) {
    const keywordScores: Record<string, number> = {};

    //TF-IDF分析文本
    this.tfidf.tfidfs(text, (docIndex, measure, word: string) => {
      if (!keywordScores[word]) {
        keywordScores[word] = 0;
      }
      keywordScores[word] += measure;
    });

    // 取权重最高的3个词
    return Object.entries(keywordScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word]) => word)
  }

  //提取日期
  private extractDueDate(text: string) {
    const parseDate = chrono.parse(text);
    if (parseDate.length > 0) {
      const date = parseDate[0].start.date();
      return date ? date.toISOString() : '';
    }
    return '';
  }

  //判断任务状态
  private getTaskStatus(text: string) {
    const statusKeyWords = {
      '待开始': ['未开始', '待办', '准备', '即将'],
      '进行中': ['进行中', '正在做', '正在进行'],
      '已完成': ['完成', '已完成', '做完', '结束'],
    }

    for (let [status, keyWords] of Object.entries(statusKeyWords)) {
      if (keyWords.some((keyword) => text.includes(keyword))) {
        return status
      }
    }
    return '待开始'
  }

  //判断任务是否紧急
  private isUrgentTask(text: string) {
    const urgentWords = ['紧急', '立刻', '马上'];
    const regex = new RegExp(urgentWords.join('|'), 'i');
    return regex.test(text);
  }
}
