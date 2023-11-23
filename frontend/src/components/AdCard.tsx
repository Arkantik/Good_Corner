/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Ad } from "@/interfaces/ads";
import { useRouter } from "next/router";

export type AdCardProps = {
  ad: Ad;
  link: string;
};

export default function AdCard({ ad: { id, price, title, picture }, link }: AdCardProps) {
  const router = useRouter();

  return (
    <button className="w-[400px]" onClick={() => router.push(`/ads/${id}`)}>
      <a className="ad-card-link" href={link}>
        <div className="shadow-md border rounded-lg  p-6 bg-white mr-3 mb-3">
          <img
            className="h-[200px] w-full object-cover rounded-md"
            src={picture}
          />
          <div className="flex justify-between pt-6">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">{price} €</div>
          </div>
        </div>
      </a>
    </button>
  );
}
