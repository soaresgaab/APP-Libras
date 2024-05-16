export type TypeLibrasData = {
  nameWord: string;
  wordDefinitions: [
    {
      descriptionWordDefinition: string;
      src: string;
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
  TypeLibrasData['wordDefinitions'][number],
  'descriptionWordDefinition' | 'src' | 'category'
>;
