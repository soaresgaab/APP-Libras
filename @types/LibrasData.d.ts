export type TypeLibrasData = {
  name: string;
  sinais: {
    description: string | null;
    type: string;
  }[];
};

type TypeLibrasDataSinais = Pick<
  LibrasData['sinais'][number],
  'description' | 'type'
>;
