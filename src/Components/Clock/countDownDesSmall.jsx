import React, { useState, useEffect } from 'react';

const CountDownDesSmall = ({ targetDate }) => {

    const calculateTimeRemaining =  () => {
        const now = new Date();
        const target = new Date(targetDate);
        const timeDifference = target - now;

        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {  hours, minutes, seconds };
    };

    const [currentTime, setCurrentTime] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval( () => {
            setCurrentTime(calculateTimeRemaining);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className=" flex text-white font-semibold" style={{minWidth:84}} >
            <span className="text-sm mr-1">Còn </span>
            <span className="    " > {currentTime.hours < 10 ? `0${currentTime.hours}` : currentTime.hours}</span>:
            <span className="     " >  {currentTime.minutes < 10 ? `0${currentTime.minutes}` : currentTime.minutes}</span>:
            <span className="     " >{currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds}</span>
        </div>
    );
};

export default CountDownDesSmall;
