import { useEffect, useState } from "react";
import axios from "axios";
import { Ad } from "@/interfaces/ads";
import AdCard from "@/components/AdCard";
import Layout from "@/layouts/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function RecentAds() {
    const [ads, setAds] = useState<Ad[]>([]);

    const router = useRouter();

    const handleDelete = async (adId: number) => {
        axios
            .delete(`http://localhost:4000/ads/${adId}`)
            .then((res) => {
                setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
                router.push(`/admin`);
            })
            .catch(console.error);
    };

    useEffect(() => {
        axios
            .get<Ad[]>("http://localhost:4000/ads")
            .then((res) => {
                setAds(res.data);
            })
            .catch(console.error);
    }, []);

    return (
        <Layout pageTitle="Admin">
            <div className="pt-6">
                <h2 className="text-2xl mb-6">Gestion des annonces</h2>

                <section className="flex flex-wrap pb-24">
                    {ads.map((ad) => (
                        <div className="flex flex-col" key={ad.id}>
                            <AdCard ad={ad} />
                            <div className="flex justify-between mr-3 pb-3">
                                <button className="flex items-center gap-2 hover:text-red-600" onClick={() => handleDelete(ad.id)}>
                                    <TrashIcon width={24} height={24} />{" "}
                                    Delete ad
                                </button>
                                <Link className="flex items-center gap-2 hover:text-green-600" href={`/editAd/${ad.id}`}>
                                    Update ad
                                    <PencilIcon width={24} height={24} />{" "}
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </Layout>
    );
}