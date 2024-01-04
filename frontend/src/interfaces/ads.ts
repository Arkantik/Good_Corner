export type Ad = {
  id: number;
  link?: string;
  picture: string;
  title: string;
  price: number;
};

export interface RecentAdsProps {
  filteredAds: Ad[];
}

export type AdDetails = Ad & {
  location: string;
  owner: string;
  description: string;
  createdAt: string;
  tags: { id: number; name: string }[];
};

export type RecentAd = {
  id: number;
  title: string;
  price: number;
  picture: string;
};
