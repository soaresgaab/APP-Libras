import { Action, TypeLibrasData } from '@/@types/LibrasData';

export function tasksReducer(
  data: TypeLibrasData[],
  action: Action,
): TypeLibrasData[] {
  switch (action.type) {
    case 'added': {
      return [
        ...data,
        {
          nameWord: action.Payload.nameWord!,
          wordDefinitions: action.Payload.wordDefinitions!,
        },
      ];
    }
    case 'changed': {
      return data.map((t) => {
        if (t.nameWord === action.Payload?.nameWord) {
          return action.Payload;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return data.filter((t) => t.nameWord !== action.Payload.nameWord);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
