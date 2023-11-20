import Image from "next/image";

// Interfaces
import { Ad } from "@/interfaces/ads";

export default function AdCard({ title, imgUrl, price, link }: Ad) {
    return (
        <div className="ad-card-container">
            <a className="ad-card-link" href={link}>
                <Image className="ad-card-image" src={imgUrl} alt={title} width={400} height={250} />
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price}€</div>
                </div>
            </a>
        </div>
    )
};
