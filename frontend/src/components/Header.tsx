import Link from "next/link";

// Components
import Searchbar, { SearchbarProps } from "./Searchbar";

// Helpers
import { categories } from "@/helpers/categories";

export default function Header({ onSearch }: SearchbarProps) {
    return (
        <header className="header">
            <div className="main-menu">
                <h1>
                    <Link href="/" className="button logo">
                        <span className="mobile-short-label">TGC</span>
                        <span className="desktop-long-label">THE GOOD CORNER</span>
                    </Link>
                </h1>
                <Searchbar onSearch={onSearch} />
                <a href="/post-ad" className="button link-button">
                    <span className="mobile-short-label">Publier</span>
                    <span className="desktop-long-label">Publier une annonce</span>
                </a>
            </div>
            <nav className="categories-navigation">
                {categories.map((category, index) => (
                    <>
                        <a href={category.link} className="category-navigation-link">{category.title}</a>
                        {index < categories.length - 1 && '•'}
                    </>
                ))}
            </nav>
        </header>
    );
};
