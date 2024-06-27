import { useState, useEffect } from "react";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProtocolContract, getErc20TokenContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { ethers } from "ethers";

import TokenList from '../constants/tokenList';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#1E1D34',
    p: 4,
};

const MakeOffer = (request) => {
    const { walletProvider } = useWeb3ModalProvider();
    const { address } = useWeb3ModalAccount();
    const [requestId, setRequestId] = useState(request.id);
    const [borrowerAddress, setBorrowerAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [returnDate, setReturnDate] = useState(1767139200);
    const [collateralCurrencyAddress, setCollateralCurrencyAddress] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function handleChange(requestId) {
            if (requestId === "" || requestId === "0" || requestId === undefined) {
                setRequestId("");
                return console.log("No request id found");
            }

            try {
                const provider = getProvider(walletProvider);

                const contract = await getProtocolContract(provider);
                const request = await contract.getRequestById(requestId);

                // console.log(request);

                setBorrowerAddress(request["1"]);
                setAmount(request["2"].toString());
                setInterest(request["3"].toString());
                setReturnDate(Number(request["6"]));
                setCollateralCurrencyAddress(request["8"]);

                switch (request["9"].toString()) {
                    case "0":
                        setRequestStatus("Open");
                        break;
                    case "1":
                        setRequestStatus("Serviced");
                        break;
                    case "2":
                        setRequestStatus("Closed");
                        break;
                }

            } catch (error) {
                console.log(error);
                toast.error("Request not found", {
                    position: "top-center",
                });
                console.log("Request not found");

                setBorrowerAddress("");
                setAmount(0);
                setInterest(0);
                setReturnDate(1767139200 * 1000);
                setRequestId("");
                setCollateralCurrencyAddress("");
                setRequestStatus("");
            }
        }
        handleChange(requestId);
    }, [requestId])

    async function handleMakeOffer() {
        if (requestId === "" || requestId === "0" || requestId === undefined) {
            toast.error("Collateral amount is required", {
                position: "top-center",
            })
            return console.log("No collateral amount found");
        }

        const provider = getProvider(walletProvider);
        const signer = await provider.getSigner();

        const collateralContract = await getErc20TokenContract(signer, collateralCurrencyAddress);
        const contract = await getProtocolContract(signer);

        // const _collateralAmount = ethers.parseUnits(collateralAmount, TokenList[collateralCurrencyAddress]?.decimals);

        try {
            const approveTx = await collateralContract.approve(await contract.getAddress(), amount);
            const approveReceipt = await approveTx.wait();
            console.log("approve", approveReceipt);

            const _returnDate = Math.floor(new Date(returnDate).getTime() / 1000);
            // console.log(address, requestId, amount, interest, _returnDate, collateralCurrencyAddress)
            const transaction = await contract.makeLendingOffer(
                borrowerAddress, requestId, amount, interest, returnDate, collateralCurrencyAddress);
            const receipt = await transaction.wait();
            console.log(receipt);
            toast.success("Offer made successful", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Offer transaction failed", {
                position: "top-center",
            });
            console.log(error);
        } finally {
            handleClose();
        }
    }

    return (
        <div className="lg:w-[48%] md:w-[48%] w-[100%]">
            <button
                onClick={handleOpen}
                className="bg-[#E0BB83] text-[#2a2a2a] my-2 hover:bg-[#2a2a2a] hover:text-[white] hover:font-bold px-4 py-2  font-playfair w-[95%] mx-auto text-center lg:text-[18px] md:text-[18px] text-[16px] font-bold rounded-lg"
            >Offer</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='lg:text-[24px] md:text-[24px] text-[18px] mb-4'>Make offer</p>
                    <input type="text" placeholder='Request Id' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={requestId} disabled />
                    <input type="text" placeholder='Interest' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={interest} onChange={(e) => setInterest(e.target.value)} />
                    <input type="text" placeholder='Amount' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none"
                        value={ethers.formatUnits(amount.toString(), TokenList[collateralCurrencyAddress]?.decimals).toString()}
                        onChange={(e) => setAmount(e.target.value)} disabled />
                    {/* <input type="text" placeholder='Return date' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={(new Date(returnDate).toISOString().slice(0, 10))} disabled /> */}
                    <input type="date" placeholder='Return date' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={new Date(1767139200 * 1000).toISOString().slice(0, 10)} disabled />
                    <input type="text" placeholder='Collateral currency address' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={TokenList[collateralCurrencyAddress]?.name} disabled />
                    <input type="text" placeholder='Request status' className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" value={requestStatus} disabled />
                    {
                        borrowerAddress !== address ?
                            requestStatus === "Open" ?
                                <button
                                    onClick={handleMakeOffer}
                                    className="bg-[#E0BB83] text-[#2a2a2a] my-2 hover:bg-[#2a2a2a] hover:text-[white] hover:font-bold px-4 py-2  font-playfair w-[95%] mx-auto text-center text-[16px] font-bold rounded-lg"
                                >Make offer</button> : null : null
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default MakeOffer