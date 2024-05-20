import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../Pages/Context/AuthContext.jsx";
import Swal from 'sweetalert2'
import {formatMoney} from "../../Utils/constant.js";

const CountDownOnline = ({targetDate, id}) => {
    const [auctionData, setAuctionData] = useState({productId: id})
    const navigate = useNavigate()
    const {currentUser} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const calculateTimeRemaining = () => {
        const target = new Date(targetDate);
        const timeDifference = +target - +new Date();

        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {hours, minutes, seconds};
    };
    const [currentTime, setCurrentTime] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            const { hours, minutes, seconds} = calculateTimeRemaining();
            setCurrentTime({ hours, minutes, seconds});

            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(interval);
                setIsLoading(true);
                const eventSource = new EventSource('http://localhost:8088/events');
                eventSource.addEventListener(`finishAuctionOnline_${id}`, function (event) {
                    const res = JSON.parse(event.data);
                    {
                        const isSuccess = currentUser.id.toString() === res?.winner;
                        const title = isSuccess ? "Đấu giá thành công!" : "Không trúng đấu giá!";
                        const icon = isSuccess ? 'success' : 'error';

                        let timerInterval;
                        Swal.fire({
                            title: title,
                            html: isSuccess ?
                                `<h5 class="text-sm">Bạn đã đấu giá thành công sản phẩm với mức giá ${formatMoney(res?.final_price)} VNĐ</h5>
                                    <br/><span class="text-base">Trở về trang chủ sau <b></b> s.</span>` :
                                `<h5 class="text-sm">Rất tiếc! Bạn không đấu giá thành công sản phẩm</h5>
                                    <br/><span class="text-base">Trở về trang chủ sau <b></b> s.</span>`,
                            timer: 10000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            width:'400px',
                            icon: icon,
                            didOpen: () => {
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    const secondsLeft = Math.ceil(Swal.getTimerLeft() / 1000); // Chuyển mili giây thành giây và làm tròn lên
                                    timer.textContent = `${secondsLeft}`;
                                }, 1000);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                navigate('/winOrderTracking')
                            }
                        });
                    }
                    setIsLoading(false);
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className="text-2xl font-semibold justify-center flex-row flex " style={{minWidth: 200}}>
                <div className="justify-center flex-row flex border ring-2 ring-orange-500 border-neutral-200 p-1">
                    <div className="flex flex-col">
                   <span className="  mx-1 inline-block px-2.5 rounded-md" style={{width: 45}}>
                {currentTime.hours < 10 ? `0${currentTime.hours}` : currentTime.hours}
            </span>
                        <span className="text-sm">giờ</span>
                    </div>
                    :
                    <div className="flex flex-col ">
                    <span className="  mx-1 inline-block px-2.5 rounded-md" style={{width: 45}}>
                {currentTime.minutes < 10 ? `0${currentTime.minutes}` : currentTime.minutes}
                    </span>
                        <span className="text-sm">phút</span>
                    </div>

                    :
                    <div className="flex flex-col ">
                    <span className=" mx-1 inline-block px-2.5 rounded-md" style={{width: 45}}>
                {currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds}
            </span>
                        <span className="text-sm">giây</span>
                    </div>
                </div>

                {isLoading &&
                    <>
                        <div
                            className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 z-50 flex justify-center items-center">
                            <img className="w-20 h-20 animate-spin"
                                 src="https://www.svgrepo.com/show/70469/loading.svg"
                                 alt="Loading icon"/>
                            {/*<img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"*/}
                            {/*     className="rounded-full h-28 w-28"/>*/}
                        </div>
                    </>
                }
            </div>
        </>
    )
        ;
};
export default CountDownOnline;
