import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number;

  @Column({ length: 20, unique: true })
  @ApiProperty({ description: '用户名', example: 'user123' })
  username: string;

  @Column({ length: 20 })
  @Exclude() // 排除密码字段,在序列化时不包含该字段
  @ApiProperty({ description: '密码', example: 'password123' })
  @ApiHideProperty() // 隐藏密码字段,在Swagger文档中不显示
  password: string;

  @Column({ length: 15, nullable: true })
  @Transform(({ value }) => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')) // 自定义转换方法
  @ApiProperty({ description: '手机号', example: '13800000000' })
  mobile: string;

  @Expose() // 暴露手机号字段,在序列化时包含该字段
  @ApiProperty({ description: '联系方式', example: '手机号：13800000000' })
  get contact() {
    return `手机号：${this.mobile}`;
  }

  @Column({ length: 100, nullable: true })
  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  email: string;

  @Column({ default: 1 })
  @ApiProperty({ description: '状态', example: 1 })
  status: number;

  @Column({ default: false })
  @ApiProperty({ description: '是否为超级用户', example: false })
  is_super: boolean;

  @Column({ default: 100 })
  @ApiProperty({ description: '排序', example: 100 })
  sort: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  @ApiProperty({ description: '创建时间', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ description: '更新时间', example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
