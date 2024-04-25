
import {Card} from "antd";
import {useNavigate} from "react-router-dom";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";

const CardAuctionOnline = ({data}) => {
    const navigate = useNavigate()
    const {selectedAuction , setSelectedAuction  } = useAuctionOnlineTracking()
    const handleDetail = (id) => {
        navigate(`/auction/online/item/${id}`)
        window.scrollTo(0, 0);
    }
    const handleBiddingOnline = (id) => {
        navigate(`/bidding/${id}`)
        setSelectedAuction(id)
        window.scrollTo(0, 0);
    }
    return(
        <>
            <Card
                size="small"
                hoverable
                bordered={false}
                style={{width: '100%', borderRadius: 0, minHeight: 236}}
                cover={<img alt="example" style={{
                    width: '100%',
                    height: '10rem',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                            src={data.main_image}/>}
            >
                <div className="flex flex-col text-left py-2 px-1">
                        <button
                            onClick={() => handleBiddingOnline(data.product_id)}
                            className=" p-2 leading-none  rounded-3xl  text-white  cursor-pointer"
                            style={{backgroundColor: '#f32c50', width: '100%', border:'1px solid #ee002a'}}>
                            Đấu giá trực tuyến
                        </button>
                    <div
                        style={{color: '#188fa6', width: '100%'}}
                        onClick={() => handleDetail(data.product_id)} className="pt-2 text-center text-blue-800 text-sm font-semibold hover:text-blue-900">
                        Xem chi tiết sản phẩm
                    </div>
                </div>
            </Card>
        </>
    )
}
export default CardAuctionOnline
