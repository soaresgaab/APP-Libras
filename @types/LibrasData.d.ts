export type TypeLibrasData = {
  _id: number;
  nameWord: string;
  wordDefinitions: [
    {
      _id: number;
      descriptionWordDefinition?: string;
      src?: string;
      fileType?: string;
      category?: {
        _id: number;
        nameCategory: string;
        descriptionCategory: string;
      };
    },
  ];
};

export type TypeLibrasResponse = {
  item: TypeLibrasData;
  refIndex: number;
};

export type TypeLibrasDataWithId = {
  _id: number | undefined;
  nameWord?: string;
  wordDefinitions?: {
    _id: number | undefined;
    descriptionWordDefinition?: string;
    src?: string;
    fileType?: string;
    category?: number;
  }[];
};
export type TypeLibrasDataWithOutId = {
  nameWord?: string;
  wordDefinitions?: {
    descriptionWordDefinition?: string;
    src?: string;
    fileType?: string;
    category?: number;
  }[];
};
export type TypeLibrasDataSuggestion = {
  _id: number | undefined;
  nameWord?: string;
  emailContact?: string;
  wordDefinitions?: {
    _id: number | undefined;
    descriptionWordDefinition?: string;
    src?: string;
    fileType?: string;
    category?: number;
  }[];
};
export type TypeLibrasDataSuggestion = {
  nameWord?: string;
  emailContact?: string;
  wordDefinitions?: {
    descriptionWordDefinition?: string;
    src?: string;
    fileType?: string;
    category?: number;
  }[];
};

type Action = {
  type: string;
  payload: TypeLibrasData;
};

type TypeLibrasDataSinais = Pick<
  TypeLibrasData,
  'wordDefinitions'
>['wordDefinitions'][number];
