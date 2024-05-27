export type TypeLibrasData = {
  _id: number;
  nameWord: string;
  wordDefinitions: [
    {
      _id: number;
      descriptionWordDefinition?: string;
      src?: string;
      category?: {
        _id: number;
        nameCategory: string;
        descriptionCategory: string;
      };
    },
  ];
};

export type TypeLibrasDataWithId = {
  _id?: number | undefined;
  nameWord?: string;
  wordDefinitions?: [
    {
      _id: number | undefined;
      descriptionWordDefinition?: string;
      src?: string;
      category?: number;
    },
  ];
};

type Action = {
  type: string;
  payload: TypeLibrasData;
};

type TypeLibrasDataSinais = Pick<
  TypeLibrasData,
  'wordDefinitions'
>['wordDefinitions'][number];
