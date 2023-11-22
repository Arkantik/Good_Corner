import RecentAds from "@/components/RecentAds";
import { Ad, RecentAdsProps } from "@/interfaces/ads";
import Layout from "@/layouts/Layout";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);

  const handleSearch = (query: string) => {
    const filtered = query
      ? ads.filter((ad) =>
        ad.title.toLowerCase().includes(query.toLowerCase())
      )
      : ads;
    setFilteredAds(filtered);
  };

  const fetchAds = () => {
    axios
      .get<Ad[]>("http://localhost:4000/ads")
      .then((res) => {
        setAds(res.data);
        setFilteredAds(res.data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <Layout pageTitle="Accueil" onSearch={handleSearch}>
      <RecentAds filteredAds={filteredAds} />
    </Layout>
  );
}
