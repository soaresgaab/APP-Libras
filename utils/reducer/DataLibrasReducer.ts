import { Action, TypeLibrasData } from '@/@types/LibrasData';

export function DataLibrasReducer(
  data: TypeLibrasData[],
  action: Action,
): TypeLibrasData[] {
  switch (action.type) {
    case 'addedMultiple ': {
      return [...data!];
    }
    case 'teste': {
      console.log(data);
      return [...data!];
    }
    case 'added': {
      return [
        ...data!,
        {
          nameWord: action.payload.nameWord!,
          wordDefinitions: action.payload.wordDefinitions!,
        },
      ];
    }
    case 'changed': {
      return data?.map((t) => {
        if (t.nameWord === action.payload?.nameWord) {
          return action.payload;
        } else {
          return t;
        }
      }) as TypeLibrasData[];
    }
    case 'deleted': {
      return data?.filter(
        (t) => t.nameWord !== action.payload.nameWord,
      ) as TypeLibrasData[];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const initialStateDataLibrasReducer: TypeLibrasData[] = [];
