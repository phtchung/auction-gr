import  { useState, useEffect } from 'react';
import {FinishAuction} from "../../Services/biddingService.jsx";
import {useNavigate} from "react-router-dom";

const CountDownFullDate = ({ targetDate,id }) => {

    const [auctionData,setAuctionData] = useState({productId:id})
    const navigate = useNavigate()

    const calculateTimeRemaining =  () => {
        const now = new Date();
        const target = new Date(targetDate);
        const timeDifference = target - now;

            if (timeDifference <= -1) {
                // Handle when the countdown reaches or goes past the target date
                FinishAuction({...auctionData})
                    .then(res => {
                        navigate("/resultSuccess", { state: 99 });
                        setAuctionData({ productId: id });
                    })
            }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [currentTime, setCurrentTime] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval( () => {
            setCurrentTime(calculateTimeRemaining);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="text-2xl font-semibold justify-center flex-row flex" style={{minWidth: 200}}>
                <div className="flex flex-col gap-3">
                    <span className="bg-orange-300 p-1 mr-1 px-2.5 inline-block rounded-md" style={{width: 45}}>
                {currentTime.days < 10 ? `0${currentTime.days}` : currentTime.days}
                    </span>
                    <span className="text-sm">ngày</span>
                </div>
                :
                <div className="flex flex-col gap-3">
                   <span className="bg-orange-300 p-1 mx-1 inline-block px-2.5 rounded-md" style={{width: 45}}>
                {currentTime.hours < 10 ? `0${currentTime.hours}` : currentTime.hours}
            </span>
                    <span className="text-sm">giờ</span>
                </div>
                :
                <div className="flex flex-col gap-3">
                    <span className="bg-orange-300 p-1 mx-1 inline-block px-2.5 rounded-md" style={{width: 45}}>
                {currentTime.minutes < 10 ? `0${currentTime.minutes}` : currentTime.minutes}
                    </span>
                    <span className="text-sm">phút</span>
                </div>

                :
                <div className="flex flex-col gap-3">
                    <span className="bg-orange-300 p-1 mx-1 inline-block px-2.5 rounded-md" style={{width: 45}}>
                {currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds}
            </span>
                    <span className="text-sm">giây</span>
                </div>

            </div>

        </>

    )
        ;
};

export default CountDownFullDate;
