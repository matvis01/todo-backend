import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from './schemas/todo.schema';

// Controller for the todo service
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<ToDo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.findOne(id);
  }

  @Post()
  async create(@Body() todo: ToDo): Promise<ToDo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: ToDo): Promise<ToDo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(id);
  }
}
