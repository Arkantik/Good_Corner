import { useState } from 'react';

// Components
import Header from "@/components/Header";
import RecentAds from "@/components/RecentAds";

// Helpers
import { ads } from '@/helpers/ads';

// Interfaces
import { Ad } from "@/interfaces/ads";

export default function Home() {
  const [filteredAds, setFilteredAds] = useState<Ad[]>(ads);

  const handleSearch = (query: string) => {
    const filtered = ads.filter(ad =>
      ad.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAds(filtered);
  };

  return (
    <body>
      <main className="main-content">
        <Header onSearch={handleSearch} />
        <RecentAds ads={filteredAds} />
      </main>
    </body>
  );
}
