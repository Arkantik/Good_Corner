import { useState } from "react";
// Components
import RecentAds from "@/components/RecentAds";

// Helpers
import { ads } from '@/helpers/ads';
import { Ad } from "@/interfaces/ads";
import Layout from "@/layouts/Layout";

export default function Home() {
  const [filteredAds, setFilteredAds] = useState<Ad[]>(ads);

  const handleSearch = (query: string) => {
    const filtered = ads.filter(ad =>
      ad.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAds(filtered);
  };

  return (
    <Layout onSearch={handleSearch}>
      <body>
        <RecentAds ads={filteredAds} />
      </body>
    </Layout>
  );
}
