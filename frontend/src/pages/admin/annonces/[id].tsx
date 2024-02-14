import { FormEvent } from "react";
import { useRouter } from "next/router";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { useAllCategoriesQuery, useRecentAdsQuery } from "@/graphql/generated/schema";

export default function EditAd() {
  const router = useRouter();

  const { data } = useRecentAdsQuery();
  const adData = data?.ads

  const { data: dataCategories } = useAllCategoriesQuery();
  const categories = dataCategories?.categories || []

  // useEffect(() => {
  //   axios
  //     .get<Category[]>("http://localhost:4000/categories")
  //     .then((res) => setCategories(res.data))
  //     .catch(console.error);

  //   const adId = router.query.id;
  //   if (adId) {
  //     axios
  //       .get<AdDetails>(`http://localhost:4000/ads/${adId}`)
  //       .then((res) => setAdData(res.data))
  //       .catch(console.error);
  //   }
  // }, [router.query.id]);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.price = parseFloat(formJSON.price);

    // axios
    //   .patch(`http://localhost:4000/ads/${adData?.id}`, formJSON)
    //   .then((res) => {
    //     setAdData(res.data)
    //     router.push(`/admin`);
    //   })
    //   .catch(console.error);
  };

  return (
    <LayoutAdmin pageTitle="Edition d'une annonce">
      <h1 className="pt-6 pb-6 text-2xl">Editer une annonce</h1>

      <form onSubmit={handleEdit} className="flex flex-col pb-12 gap-3">
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="form-control w-full">
            <label className="label" htmlFor="title">
              <span className="label-text">Titre</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Zelda : Ocarina of time"
              className="input input-bordered w-full"
              // value={adData?.title}
              // onChange={(e) => {
              //   const updatedData = { ...adData!, title: e.target.value };
              //   setAdData(updatedData)
              // }}
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label" htmlFor="picture">
              <span className="label-text">Image</span>
            </label>
            <input
              type="text"
              name="picture"
              id="picture"
              required
              placeholder="https://imageshack.com/zoot.png"
              className="input input-bordered w-full"
            // value={adData.picture}
            // onChange={(e) => {
            //   const updatedData = { ...adData!, picture: e.target.value };
            //   setAdData(updatedData)
            // }}
            />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="form-control w-full">
            <label className="label" htmlFor="location">
              <span className="label-text">Localisation</span>
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Paris"
              className="input input-bordered w-full"
              // value={adData?.location}
              // onChange={(e) => {
              //   const updatedData = { ...adData!, location: e.target.value };
              //   setAdData(updatedData)
              // }}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="owner">
              <span className="label-text">Auteur</span>
            </label>
            <input
              type="text"
              name="owner"
              id="owner"
              placeholder="Link"
              className="input input-bordered w-full"
              // value={adData.owner}
              // onChange={(e) => {
              //   const updatedData = { ...adData!, owner: e.target.value };
              //   setAdData(updatedData)
              // }}
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            rows={5}
            name="description"
            id="description"
            placeholder="The Legend of Zelda: Ocarina of Time est un jeu vidéo d'action-aventure développé par Nintendo EAD et édité par Nintendo sur Nintendo 64. Ocarina of Time raconte l'histoire de Link, un jeune garçon vivant dans un village perdu dans la forêt, qui parcourt le royaume d'Hyrule pour empêcher Ganondorf d'obtenir la Triforce, une relique sacrée partagée en trois : le courage (Link), la sagesse (Zelda) et la force (Ganondorf)."
            className="textarea textarea-bordered"
            // value={adData.description}
            // onChange={(e) => {
            //   const updatedData = { ...adData!, description: e.target.value };
            //   setAdData(updatedData)
            // }}
            required
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="form-control w-full">
            <label className="label" htmlFor="price">
              <span className="label-text">Prix</span>
            </label>
            <input
              min={0}
              type="number"
              name="price"
              id="price"
              placeholder="30"
              className="input input-bordered w-full"
              // value={adData.price}
              // onChange={(e) => {
              //   const updatedData = { ...adData!, price: parseFloat(e.target.value) };
              //   setAdData(updatedData)
              // }}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="category">
              <span className="label-text">Catégorie</span>
            </label>
            <select
              name="category"
              id="category"
              className="select select-bordered"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-primary text-white mt-12 w-full">
          Envoyer
        </button>
      </form>
    </LayoutAdmin>
  );
}