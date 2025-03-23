import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

export default class Note extends Model {
  static table = 'notes';

  @field('title') title!: string;
  @field('content') content!: string;
  @readonly @date('created_at') createdAt!: Date;
}
