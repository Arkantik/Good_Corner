import CategoryRow from "@/components/admin/CategoryRow";
import { Category } from "@/interfaces/categories";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:4000/categories")
            .then((res) => setCategories(res.data))
            .catch(console.error);
    }, []);

    const handleDeleteCategory = async (id: number) => {
        try {
            await axios.delete(`http://localhost:4000/categories/${id}`);
            setCategories((catList) => catList?.filter((c) => c.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <LayoutAdmin pageTitle="Gestion des categories">
            <div className="pt-6">
                <h2 className="text-2xl mb-6">Gestion des catégories</h2>

                <section className="flex flex-wrap pb-24">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const data = new FormData(form);
                            const json = Object.fromEntries(data.entries());

                            try {
                                const newCat = (
                                    await axios.post("http://localhost:4000/categories", json)
                                ).data;
                                form.reset();
                                setCategories((oldList) => [newCat, ...oldList]);
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        <label htmlFor="name">
                            Nouvelle Catégorie :{" "}
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input mr-2"
                                required
                            />
                        </label>
                        <button className="btn">Enregistrer</button>
                    </form>

                    {categories?.length !== 0 && (
                        <table className="table mt-4">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((c) => (
                                    <CategoryRow
                                        key={c.id}
                                        handleDeleteCategory={handleDeleteCategory}
                                        category={c}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </LayoutAdmin>
    );
}