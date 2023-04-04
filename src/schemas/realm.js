import Realm from 'realm';

const TodoSchema = {
  name: 'Todo',
  properties: {
    id: 'string',
    title: 'string',
    completed: {type: 'bool', default: false},
    data: 'string', // the binary data of the image
    date: 'date',
    mime: 'string',
  },
  primaryKey: 'id',
};

const realm = new Realm({schema: [TodoSchema]});

export default realm;
