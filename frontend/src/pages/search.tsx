import Layout from "@/layouts/Layout";
import { useRouter } from "next/router";
import AdCard from "@/components/AdCard";
import { useRecentAdsQuery } from "@/graphql/generated/schema";

export default function Search() {
    const router = useRouter();

    const title = router.query.title as string | undefined;
    const categoryId = router.query.categoryId as string | undefined;

    const { data } = useRecentAdsQuery({
        variables: {
            title: (title || "") as never,
            categoryId: (categoryId || "") as never,
        },
    });

    const ads = data?.ads || [];

    return (
        <Layout pageTitle="recherche - TGC">
            {ads.length === 0 && (
                <div>
                    <p className="pb-4 pt-12">
                        {" "}
                        Aucune annonce ne corresspond à ces critères de recherche
                    </p>

                    <button
                        className="btn btn-primary text-white"
                        onClick={() => router.push("/search")}
                    >
                        Voir toutes les annonces
                    </button>
                </div>
            )}

            <div className="pt-6 pb-20 flex flex-wrap">
                {ads.map((ad) => (
                    <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
                ))}
            </div>
        </Layout>
    );
}