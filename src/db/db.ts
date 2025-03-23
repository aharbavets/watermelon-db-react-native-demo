import {appSchema, Database, tableSchema} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Note from '../models/note.tsx';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
});


export const adapter = new SQLiteAdapter({
  schema,
});

export const database = new Database({
  adapter,
  modelClasses: [Note],
});
