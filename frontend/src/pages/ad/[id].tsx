import { useRouter } from "next/router"

export default function AdDetailComponent() {
    const router = useRouter();
    return <p>Display details of ad with id {router.query.id}</p>
}
