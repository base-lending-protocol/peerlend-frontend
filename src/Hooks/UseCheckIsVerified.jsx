import { useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getProtocolContract } from "../constants/contract";
import { ethers } from "ethers";

export const UseCheckIsVerified = (address) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            if (!address) {
                setUser(null);
                return;
            }

            try {
                const contract = getProtocolContract(readOnlyProvider);
                const res = await contract.isVerified(address);
                console.log(res);

                setUser(res);
            } catch (err) {
                console.error(err);
                setUser(null);
            }
        };

        fetchUser();
    }, [address]);

    return user;
};
