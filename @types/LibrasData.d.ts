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

type TypeLibrasDataSinais = Pick<
  TypeLibrasData['wordDefinitions'][number],
  'descriptionWordDefinition' | 'src' | 'category'
>;
