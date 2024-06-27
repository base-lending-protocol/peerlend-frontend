import React from 'react';
import { useParams } from 'react-router-dom';
import MakeOffer from '../../components/MakeOffer';
import ServiceRequest from '../../components/ServiceRequest';

const PortfolioDetails = () => {
    const { id } = useParams();
    console.log(id)

    return (
        <main>
            <h2 className="lg:text-[26px] md:text-[26px] text-[20px] mb-6 font-bold">Transaction Details</h2>
            <div className="w-[100%] flex flex-col lg:flex-row  md:flex-row justify-between rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
                <img src='https://z-p3-scontent.fiba1-2.fna.fbcdn.net/o1/v/t0/f1/m247/2850021285355695016_2501028907_22-06-2024-04-34-56.jpeg?_nc_ht=z-p3-scontent.fiba1-2.fna.fbcdn.net&_nc_cat=102&ccb=9-4&oh=00_AYC1Z9Nt9gCWm8sHZ_yH-6sZYlv-w5ySnuMEa1F81h25RQ&oe=66794051&_nc_sid=5b3566' alt="" className="w-[100%] lg:w-[50%] md:w-[50%] rounded-lg h-[200px] object-cover object-center mb-4" />
                <div className="w-[100%] lg:w-[47%] md:w-[47%]">
                    <p>Amount: </p>
                    <p>Rate: <span>&#37;</span></p>
                    <p>Repayment: </p>
                    <p>Return date: <span></span></p>
                    <h2 className=''>Manage Requests</h2>
                    <div className='flex justify-between'>
                        <MakeOffer  />
                        <ServiceRequest  />
                    </div>
                </div>
            </div>
        <section>
            <h2 className="lg:text-[26px] md:text-[26px] text-[20px] my-6 font-bold">Transaction Offers</h2>
            <div className="flex justify-between">    
            <div  className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6">
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
