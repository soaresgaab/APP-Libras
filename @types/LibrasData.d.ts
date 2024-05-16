export type TypeLibrasData = {
  id: number;
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

type TypeLibrasDataSinais = {
  descriptionWordDefinition: string;
  src: string;
  category: {
    nameCategory: string;
    descriptionCategory: string;
  };
};
