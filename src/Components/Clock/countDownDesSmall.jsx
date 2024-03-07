import React, { useState, useEffect } from 'react';

const CountDownDesSmall = ({ hours, minutes, seconds }) => {
    const [currentTime, setCurrentTime] = useState({
        hours: hours || 0,
        minutes: minutes || 0,
        seconds: seconds || 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentTime.hours === 0 && currentTime.minutes === 0 && currentTime.seconds === 0) {
                clearInterval(interval);
                // Xử lý khi hết giờ ở đây (ví dụ: hiển thị thông báo)
            } else {
                updateTimer();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime]);

    const updateTimer = () => {
        setCurrentTime((prevTime) => {
            const newTime = { ...prevTime };

            if (newTime.seconds > 0) {
                newTime.seconds -= 1;
            } else {
                if (newTime.minutes > 0) {
                    newTime.minutes -= 1;
                    newTime.seconds = 59;
                } else {
                    if (newTime.hours > 0) {
                        newTime.hours -= 1;
                        newTime.minutes = 59;
                        newTime.seconds = 59;
                    }
                }
            }
            return newTime;
        });
    };

    return (
        <div className=" flex text-white font-semibold" style={{minWidth:84}} >
            <span className="text-sm mr-1">Còn </span>
            <span className="    " >{currentTime.hours < 10 ? `0${currentTime.hours}` : currentTime.hours}</span>:
            <span className="     " >{currentTime.minutes < 10 ? `0${currentTime.minutes}` : currentTime.minutes}</span>:
            <span className="     " >{currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds}</span>
        </div>
    );
};

export default CountDownDesSmall;
