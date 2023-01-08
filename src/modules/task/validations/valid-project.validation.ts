import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
@ValidatorConstraint({ name: 'ValidProject', async: true })
export class ValidProject implements ValidatorConstraintInterface {
  constructor(private taskService: TaskService) {}
  async validate(value: any, validationArguments?: ValidationArguments | undefined): Promise<boolean> {
    const project = await this.taskService.getProject(value);
    if (project) return true;
    return false;
  }
  defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
    return 'project not found';
  }
}
