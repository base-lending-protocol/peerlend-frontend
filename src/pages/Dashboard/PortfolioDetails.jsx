import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MakeOffer from '../../components/MakeOffer';
import ServiceRequest from '../../components/ServiceRequest';
import UseFetchRequests from '../../Hooks/UseFetchRequests';
import LoadingSpinner from '../../components/LoadingSpinner'
import tokenList from '../../constants/tokenList';

import { formatUnits } from 'ethers';

import requestImage from '../../assets/request.jpeg';


const PortfolioDetails = () => {
    const { id } = useParams();

    const allRequests = UseFetchRequests()
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        console.log("All Requests:", allRequests)
        if (allRequests.length > 0) {
            const foundTransaction = allRequests.find(data => String(data?.id) === id);
            setTransaction(foundTransaction);
            console.log("Transaction:", foundTransaction);
        }
    }, [allRequests]);

    return (
        <main>
            <h2 className="lg:text-[26px] md:text-[26px] text-[20px] mb-6 font-bold">Transaction Details</h2>
            {transaction ? (<div className="w-[100%] flex flex-col lg:flex-row  md:flex-row justify-between rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src={requestImage} alt="" className="w-[100%] lg:w-[50%] md:w-[50%] rounded-lg h-[200px] object-cover object-center mb-4" />
                <div className="w-[100%] lg:w-[47%] md:w-[47%]">
                    <p>Amount: {formatUnits(transaction?.amount, tokenList[transaction?.loanReq]?.decimals)}</p>
                    <p>Rate: {transaction?.interest.toString()}<span>&#37;</span></p>
                    <p>Repayment: {formatUnits(transaction?.repayment, tokenList[transaction?.loanReq]?.decimals + 1)}</p>
                    <p>Return date: <span>{(new Date(Number(transaction?.rDate) * 1000)).toLocaleString()}</span></p>
                    <h2 className='my-4 text-[#E0BB83] font-bold'>Manage Requests</h2>
                    <div className='flex justify-between'>
                        <MakeOffer id={id} request={transaction} />
                        <ServiceRequest id={id} request={transaction} />
                    </div>
                </div>
            </div>) : <div>
                <LoadingSpinner />
            </div>}
            <section>
                <h2 className="lg:text-[26px] md:text-[26px] text-[20px] my-6 font-bold">Transaction Offers</h2>
                <div className="flex justify-between">
                    <div className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                        <img src="https://img.freepik.com/free-photo/3d-render-businessman-hand-holding-money-banknotes_107791-17027.jpg?size=626&ext=jpg" alt="" className="w-[100%] rounded-lg h-[200px] object-cover object-center mb-4" />
                        <p className="truncate">Lender: </p>
                        <p>Amount: </p>
                        <p>Rate: </p>
                        <p>Status: </p>
                        <p>Return date: <span></span></p>
                        <div className="flex justify-between flex-col lg:flex-row md:flex-row flex-wrap">
                            <button
                                className="bg-bg-ash text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[40%] my-4 mx-auto text-center font-bold truncate flex">
                                Accept
                            </button>
                            <button
                                className="bg-bg-ash text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] w-[40%] my-4 mx-auto text-center font-bold truncate flex">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default PortfolioDetails;
