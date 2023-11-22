/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from "next/router";
import { useEffect } from "react";

export type AdCardProps = {
  id: number;
  price: number;
  title: string;
  picture: string;
  link: string;
};

export default function AdCard({ id, title, price, picture, link }: AdCardProps) {
  const router = useRouter();

  return (
    <button className="ad-card-container" onClick={() => router.push(`/ads/${id}`)}>
      <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={picture} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price}€</div>
        </div>
      </a>
    </button>
  );
}
