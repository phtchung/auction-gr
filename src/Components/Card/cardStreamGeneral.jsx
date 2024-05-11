import {Card} from "antd";
import {useNavigate} from "react-router-dom";

const CardStreamGeneral = ({data , onOpenPopup , getData }) => {
    const navigate = useNavigate()

    const handleDetail = (id) => {
        navigate(`/auction/stream/item/${id}`)
        window.scrollTo(0, 0);
    }

    const handleBtn = (id) => {
        onOpenPopup()
        getData('product_id',id)
    }

    return(
        <>
            <Card
                className={`card-hover  ${open} ? 'bg-transparent opacity-50' : ''`}
                size="small"
                hoverable
                bordered={false}
                style={{width: '100%', borderRadius: 8, minHeight: 236}}
                cover={<img alt="example" style={{
                    padding: '4px',
                    width: '100%',
                    height: '11rem',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: 8
                }}
                            src={data.main_image}/>}
            >
                <div className="flex flex-col text-left pb-2 pt-0.5 px-1">
                    <div className="flex flex-row gap-2 p-2 items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512" className="h-7 w-7 ">
                            <path fill="#fd8617"
                                  d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9
                               17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6
                                7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24
                                 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/>
                        </svg>
                        <div className="text-sm  font-medium flex flex-col gap-1 text-neutral-600 px-1 pb-1.5  ">
                            <p className="opacity-70 text-xs  ">Thời gian còn lại</p>
                            <p className=""> {data?.coutdown_time}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleBtn(data?.product_id)}
                        className=" p-2.5 leading-none rounded-3xl border-none  text-white  cursor-pointer"
                        disabled={data.register}
                        style={{
                            backgroundColor: data.register ? '#CCCCCC' : '#fa6a1c',
                            color: data.register ? 'gray' : 'white',
                            cursor: data.register ? 'not-allowed' : 'pointer',
                            width: '100%',
                        }}>
                        Vào phòng
                    </button>

                    <div
                        style={{color: '#188fa6', width: '100%'}}
                        className="pt-2 text-center text-blue-800 text-sm font-semibold hover:text-blue-900">
                        Mã phòng : {data?.room}
                    </div>
                </div>
            </Card>
        </>
    )
}
export default CardStreamGeneral
