import { RecentAdsProps } from "@/interfaces/ads";
import AdCard from "./AdCard";

export default function RecentAds({ ads }: RecentAdsProps) {
    return (
        <>
            <h2>Annonces récentes</h2>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <AdCard
                        key={ad.title}
                        link={ad.link}
                        imgUrl={ad.imgUrl}
                        title={ad.title}
                        price={ad.price}
                    />
                ))}
            </section>
        </>
    )
};
