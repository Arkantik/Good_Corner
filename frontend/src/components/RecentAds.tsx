import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import { Ad, RecentAdsProps } from "@/interfaces/ads";

export default function RecentAds({ filteredAds }: RecentAdsProps) {
  return (
    <>
      <h1>Annonces récentes</h1>
      <section className="recent-ads">
        {filteredAds.map((filteredAd) => (
          <div key={filteredAd.id}>
            <AdCard
              {...filteredAd}
            />
          </div>
        ))}
      </section>
    </>
  );
}
