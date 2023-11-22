/* eslint-disable @next/next/no-img-element */
import { Ad } from "@/interfaces/ads";
import Layout from "@/layouts/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdDetails() {
  const [adDetails, setAdDetails] = useState<Ad>();
  const router = useRouter();

  useEffect(() => {
    const fetchAdDetails = () => {
      axios
        .get(`http://localhost:4000/ads/${router.query.id}`)
        .then((res) => setAdDetails(res.data))
        .catch((error) => {
          console.log("Error fetching ad details", error);
        });
    };

    if (router.query.id) {
      fetchAdDetails();
    }
  }, [router.query.id]);

  return (
    <Layout pageTitle="Details d'une annonce">
      <div>
        <h1>Details de l&apos;annonce #{router.query.id}</h1>
        <Link href={"/"}>Retour à l&apos;acceuil</Link>
      </div>

      {adDetails ? (
        <section className="ad-card-container">
          <div className="ad-card-text">
            <h2 className="ad-card-title">Titre: {adDetails.title}</h2>
            <h3 className="ad-card-price">Prix: {adDetails.price} €</h3>
          </div>
          <img src={adDetails.picture} alt={adDetails.title} className="ad-card-image" />
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
