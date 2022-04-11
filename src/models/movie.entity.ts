import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: `Auto Generated ID of the movie`,
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: `Title of the movie`,
    example: 'John Wick',
  })
  @IsString()
  title: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: `Movie date of release`,
    example: '03/30/2022',
  })
  @IsOptional()
  @IsDate()
  released?: Date;

  @Column({ nullable: true, default: '' })
  @ApiProperty({
    description: `Genre of the movie`,
    example: 'Action',
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @Column({ nullable: true, default: '' })
  @ApiProperty({
    description: `Director of the movie`,
    example: 'Director Yu',
  })
  @IsOptional()
  @IsString()
  director?: string;

  @Column({ nullable: true, default: null })
  @ApiProperty({
    description: `User ID of the movie creator`,
    example: 1,
  })
  @IsOptional()
  createdBy: number;
}
