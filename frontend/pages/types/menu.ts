export type Menu = {
  _id: string;
  store: string;
  name: string[];
  price: number;
  description?: number;
  images?: number;
  category: number;
  isRecommended: string[];
  orderCount?: number;
  likeCount?: number;
  dislikeCount?: number;
  additionalSelection?: AdditionalSelection[];
};

export type AdditionalSelection = {
  title: string;
  option: AdditionalOption[];
  required?: boolean;
  multiple: boolean;
};

export type AdditionalOption = {
  title: string;
  price: number;
};

export type OrderOption = {
  selectionTitle: string;
  option: AdditionalOption;
};
