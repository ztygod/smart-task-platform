import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')  // 表明这是一个名为 'tasks' 的实体
export class Task {
    @PrimaryGeneratedColumn()  // 自动生成主键
    id: number;

    @Column({ type: 'varchar', length: 255 })  // 定义 title 字段，VARCHAR(255)
    title: string;

    @Column({ type: 'text', nullable: true })  // 定义 description 字段，TEXT 类型，可为空
    description: string | null;

    @Column({ type: 'varchar', length: 50, default: 'todo' })  // 定义 status 字段，VARCHAR(50)，默认为 'todo'
    status: string;

    @Column({ type: 'timestamp', nullable: true })  // 定义 due_date 字段，TIMESTAMP 类型，可为空
    due_date: Date | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  // 自动设置为当前时间
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  // 自动更新为当前时间
    updated_at: Date;
}
