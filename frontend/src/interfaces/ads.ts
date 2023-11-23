export interface Ad {
  id: number;
  link?: string;
  picture: string;
  title: string;
  price: number;
}

export interface RecentAdsProps {
  filteredAds: Ad[];
}

export type AdDetails = Ad & {
  location: string;
  owner: string;
  description: string;
  createdAt: string;
};
