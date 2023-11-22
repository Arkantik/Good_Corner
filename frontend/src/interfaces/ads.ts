export interface Ad {
  id: number;
  link: string;
  picture: string;
  title: string;
  price: number;
}

export interface RecentAdsProps {
  ads?: Ad[];
}
