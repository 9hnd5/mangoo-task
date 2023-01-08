import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class GetSectionDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
