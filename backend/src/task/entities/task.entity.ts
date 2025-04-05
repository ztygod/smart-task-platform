import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')  // 表明这是一个名为 'tasks' 的实体
export class Task {
    @PrimaryGeneratedColumn()  // 自动生成主键
    id: number;

    @Column()// 排序字段
    order: string;

    @Column()  // 定义 title 字段
    title: string;

    @Column()  // 定义 description 字段
    description: string;

    @Column()  // 定义 status 字段
    status: string;

    @Column()  // 定义 due_date 字段
    due_date: Date;

    @CreateDateColumn()  // 自动设置为当前时间
    created_at: Date;

    @UpdateDateColumn()  // 自动更新为当前时间
    updated_at: Date;

    @Column({ default: 1 })  // 新增乐观锁版本字段
    version: number;
}
