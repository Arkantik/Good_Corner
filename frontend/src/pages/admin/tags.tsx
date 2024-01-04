import TagRow from "@/components/admin/TagRow";
import client from "@/graphql/client";
import { AllTagsDocument, AllTagsQuery, useAllTagsQuery, useCreateTagMutation, useDeleteTagMutation } from "@/graphql/generated/schema";
import LayoutAdmin from "@/layouts/LayoutAdmin";

export default function AdminTags() {
    const { data, refetch } = useAllTagsQuery();
    const tags = data?.tags || [];

    const [createTag] = useCreateTagMutation();
    const [deleteTag] = useDeleteTagMutation();

    const handleDeleteTag = async (id: number) => {
        try {
            await deleteTag({ variables: { tagId: id } });
            client.writeQuery<AllTagsQuery>({
                query: AllTagsDocument,
                data: {
                    tags: tags.filter((tag) => tag.id !== id),
                },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <LayoutAdmin pageTitle="Gestion des tags">
            <div className="pt-6">
                <h2 className="text-2xl mb-6">Gestion des tags</h2>
                <section>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const data = new FormData(form);
                            const json = Object.fromEntries(data.entries());

                            try {
                                const { data } = await createTag({ variables: { data: json as any } });
                                form.reset();
                                if (data?.createTag) {
                                    AllTagsDocument;

                                    client.writeQuery<AllTagsQuery>({
                                        query: AllTagsDocument,
                                        data: {
                                            tags: [data.createTag, ...tags],
                                        },
                                    });
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        <label htmlFor="name">
                            Nouveau Tag :{" "}
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

                    {tags?.length !== 0 && (
                        <table className="table mt-4">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags?.map((c) => (
                                    <TagRow
                                        key={c.id}
                                        handleDeleteTag={handleDeleteTag}
                                        tag={c}
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