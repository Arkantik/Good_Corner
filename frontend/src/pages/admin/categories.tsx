import CategoryRow from "@/components/admin/CategoryRow";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import {
    AllCategoriesDocument,
    AllCategoriesQuery,
    useAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from "@/graphql/generated/schema";
import client from "@/graphql/client";

export default function AdminCategories() {
    const { data } = useAllCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();

    const categories = data?.categories || [];
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDeleteCategory = async (id: number) => {
        try {
            await deleteCategory({ variables: { categoryId: id } });
            client.writeQuery<AllCategoriesQuery>({
                query: AllCategoriesDocument,
                data: {
                    categories: categories.filter((category) => category.id !== id),
                },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <LayoutAdmin pageTitle="Gestion des categories">
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    const json = Object.fromEntries(data.entries());

                    try {
                        const { data } = await createCategory({ variables: { data: json as any } });
                        // The following condition avoid to refetch but will update the data similar to refetch()
                        if (data?.createCategory) {
                            AllCategoriesDocument;

                            client.writeQuery<AllCategoriesQuery>({
                                query: AllCategoriesDocument,
                                data: {
                                    categories: [data.createCategory, ...categories],
                                },
                            });
                        }
                        form.reset();
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
        </LayoutAdmin>
    );
}
