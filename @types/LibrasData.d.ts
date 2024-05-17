export type TypeLibrasData = {
  id: number;
  nameWord: string;
  wordDefinitions: [
    {
      id: number;
      descriptionWordDefinition?: string;
      src?: string;
      category: {
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
