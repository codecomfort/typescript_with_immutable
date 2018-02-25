import * as Im from "immutable";

// 例として Trello のカードをイメージ
export interface CardData {
  id: string;
  title: string;
  description: string;
  comments: Im.List<Comment>;
  due: Date;
}

export class Comment {
  id: string;
  text: string;
  createdAt: Date;
  editedAt: Date;
}

// Im.Record の仕様上、defaultValues に項目がないと
// コンストラクタで渡しても undefined になるので注意
const defaultValues: Partial<CardData> = {
  id: null,
  title: null,
  description: null,
  comments: null,
  due: null,
};

export class Card extends Im.Record(defaultValues) {

  static validate(values: Partial<CardData>): Partial<CardData> {
    if (!values.title) {
      throw new Error(`title は必須です`);
    }
    return values;
  }

  constructor(values?: Partial<CardData>) {
    values ? super(Card.validate(values)) : super();
  }

  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly comments: Im.List<Comment>;
  readonly due: Date;

  with(values: Partial<CardData>) {
    return this.merge(Card.validate(values)) as this;
  }
}

