import { Injectable } from '@nestjs/common';
import { HttpService } from 'mangoo-core';

export class Assignee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  role?: {
    id: number;
    name: string;
  };
}

export class Project {
  id: number;
  name: string;
}

@Injectable()
export class TaskService {
  constructor(private httpService: HttpService) {}

  async getAssign(id: string) {
    const url = `http://localhost:3002/users/${id}`;
    const { data } = await this.httpService.get<Assignee>(url);
    return data;
  }

  async getProject(id: number) {
    const url = `http://localhost:3003/projects/${id}`;
    const { data } = await this.httpService.get<Project>(url);
    return data;
  }
}
