import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
@ValidatorConstraint({ name: 'ValidAssignee', async: true })
export class ValidAssignee implements ValidatorConstraintInterface {
  constructor(private taskService: TaskService) {}
  async validate(id: string, args: ValidationArguments): Promise<boolean> {
    const assignee = await this.taskService.getAssign(id);
    if (assignee) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Assignee not found';
  }
}
