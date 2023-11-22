import { useEffect, useState } from "react";
import { Ad } from "@/interfaces/ads";
import AdCard from "./AdCard";
import axios from "axios";

export default function RecentAds() {
    const [ads, setAds] = useState<Ad[]>([]);

    const fetchAds = () => {
        axios
            .get<Ad[]>("http://localhost:4000/ad")
            .then((res) => {
                setAds(res.data);
            })
            .catch((error) => {
                console.error("Error fetching ads:", error);
            });
    };

    useEffect(() => {
        fetchAds();
    }, [])

    return (
        <>
            <h2>Annonces récentes</h2>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <AdCard
                        key={ad.id}
                        link={ad.link}
                        picture={ad.picture}
                        title={ad.title}
                        price={ad.price}
                    />
                ))}
            </section>
        </>
    )
};
