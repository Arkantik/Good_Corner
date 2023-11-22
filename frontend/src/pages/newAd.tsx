import Layout from "@/layouts/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
}

export default function NewAd() {
    const [categories, setCategories] = useState<Category[]>([]);

    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        (formJson as any).price = parseFloat((formJson as any).price)
        axios
            .post("http://localhost:4000/ad", formJson)
            .then((res) => {
                console.log("Annonce créée", res.data);
                router.push('/');
                form.reset();
            })
            .catch((error) => console.error(error));
    }

    const fetchCategories = () => {
        axios
            .get('http://localhost:4000/categories')
            .then((res) => setCategories(res.data))
            .catch((error) => console.error("Error fetching categories:", error));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" >
                    Titre de l&apos;annonce
                    <input type="text" name="title" id="title" />
                </label>
                <label htmlFor="picture" >
                    Image de l&apos;annonce
                    <input type="url" name="picture" id="picture" />
                </label>
                <label htmlFor="owner" >
                    Auteur
                    <input type="text" name="owner" id="owner" />
                </label>
                <label htmlFor="location" >
                    Localisation
                    <input type="text" name="location" id="location" />
                </label>
                <label htmlFor="price" >
                    Prix
                    <input type="number" name="price" id="price" />
                </label>
                <label htmlFor="description" >
                    Description
                    <textarea name="description" id="description" />
                </label>
                <label htmlFor="category" >
                    Description
                    <select name="category" id="category">
                        {categories.map((el) => (
                            <option value={el.id} key={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Envoyer</button>
            </form>
        </Layout>
    )

};
