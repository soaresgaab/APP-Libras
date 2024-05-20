export type TypeLibrasData = {
  _id: number;
  nameWord: string;
  wordDefinitions: [
    {
      _id: number;
      descriptionWordDefinition?: string;
      src?: string;
      category?: {
        nameCategory: string;
        descriptionCategory: string;
      };
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
