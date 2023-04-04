import realm from '../schemas/realm';

export const getTodoData = async () => {
  const data: any = await realm.objects('Todo');
  return data;
};
