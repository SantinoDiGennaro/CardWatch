export type CardBlueprint = {
  id: number;
  meta_name: string;
  version: string | null;
  slug: string;
  game_id: number;
  category_id: number;
  expansion_id: number;
  name: string;
  translated_name: string;
  image: CardImageSet;
  back_image: CardImageSet;
}

export type CardImageSet = {
  url: string;
  show: {
    url: string;
  };
  preview: {
    url: string;
  };
  social: {
    url: string;
  };
}
