export interface Ad {
  link: string;
  imgUrl: string;
  title: string;
  price: number;
}

export interface RecentAdsProps {
  ads: Ad[];
}
