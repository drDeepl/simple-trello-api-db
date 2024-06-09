import { BaseColumnDto } from './base-column-dto';

export class CreateColumnDto extends BaseColumnDto {
  constructor(title: string, position: number) {
    super(title, position);
  }
}
