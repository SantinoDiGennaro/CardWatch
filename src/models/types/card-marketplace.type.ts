import {CardStatus} from './card-status.type';

export type CardMarketplace = {
  id: number;
  blueprint_id: number;
  name_en: string;
  expansion: Expansion;
  price_cents: number;
  price_currency: string;
  quantity: number;
  description: string;
  properties_hash: CardProperties;
  graded: string | null;
  bundle_size: number;
  on_vacation: boolean;
  user: User;
  price: CardPrice;

  imageUrl?: string;
}

export type Expansion = {
  code: string;
  id: number;
  name_en: string;
}

export type CardProperties = {
  condition: CardStatus;
  mtg_card_colors: string;
  collector_number: string;
  tournament_legal: boolean;
  cmc: string;
  signed: boolean;
  mtg_foil: boolean;
  mtg_rarity: string;
  mtg_language: string;
  altered: boolean;
}

export type User = {
  country_code: string;
  too_many_request_for_cancel_as_seller: boolean;
  user_type: string;
  can_sell_sealed_with_ct_zero: boolean;
  max_sellable_in24h_quantity: number | null;
  id: number;
  username: string;
  can_sell_via_hub: boolean;
}

export type CardPrice = {
  cents: number;
  currency: string;
  currency_symbol: string;
  formatted: string;
}
