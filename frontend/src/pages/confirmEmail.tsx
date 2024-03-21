import { useConfirmEmailMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { use, useEffect } from "react";

export default function ConfirmEmail() {
    const router = useRouter();
    const [confirmEmail] = useConfirmEmailMutation();
    const token = router.query.token as string;

    useEffect(() => {
        if (!token) return;
        confirmEmail({ variables: { token } }).then(() => {
            setTimeout(() => {
                router.push("/login");
            }, 5000);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (<div>Confirmation...</div>);
};
