import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo, ToDoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(ToDo.name) private todoModel: Model<ToDoDocument>) {}

  async findAll(): Promise<ToDo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<ToDo> {
    return this.todoModel.findById(id).exec();
  }

  async create(todo: ToDo): Promise<ToDo> {
    const newToDo = new this.todoModel(todo);
    return newToDo.save();
  }

  async update(id: string, todo: ToDo): Promise<ToDo> {
    return this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}
