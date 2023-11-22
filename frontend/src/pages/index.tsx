import RecentAds from "@/components/RecentAds";
import { Ad, RecentAdsProps } from "@/interfaces/ads";
import Layout from "@/layouts/Layout";

import { useState } from "react";

export default function Home() {
  const [filteredAds, setFilteredAds] = useState<Ad[]>();

  const handleSearch = (query: string) => {
    const filtered = ads.filter(ad =>
      ad.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAds(filtered);
  };

  return (
    <Layout pageTitle="Acceuil" onSearch={handleSearch}>
      <RecentAds ads={filteredAds} />
    </Layout>
  );
}
