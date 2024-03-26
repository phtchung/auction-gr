import StarIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";
import {formatDateTime, isDateGreaterThanToday} from "../../Utils/constant.js";
import {Tooltip} from "antd";
import { Form, Input} from "antd";
import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";
import { Flex, Rate } from 'antd';
import FileUpload from "../UploadFile/uploadFile.jsx";
import {toast} from "react-toastify";
import {reviewProduct} from "../../Services/productService.jsx";
const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
const AuctionHistoryCpn = ({data}) => {
    const [value, setValue] = useState(5);
    const [reviewData, setReviewData] = useState({product_id:data.id})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const handleReviewData = (key, value) => {
        setReviewData({...reviewData, [key]: value});
        console.log(reviewData)
    };
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/auctionHistory" + `/auction/${data.id}`)
        window.scrollTo(0, 0);
    }
    const handleValueChange = (newValue) => {
        setValue(newValue);
        handleReviewData("rate", newValue)
    }
    const handleFilesUpload = (formData) => {
        handleReviewData("files", formData)
    };
    const handleSubmitReview = async () => {
        try {
            const res = await reviewProduct({...reviewData});
            handleOpen()
            toast.success('Đánh giá thành công')
            setReviewData({product_id:data.id});
            navigate('/auctionHistory')
        } catch (error) {
            toast.error(error?.response?.data?.message);
            handleOpen()

        }
    };

    return (
        <>
            <div className=" px-6 py-3 mb-3 shadow-inner bg-white  text-sm ">
                <div onClick={handleNavigate} className="flex cursor-pointer pb-2 pt-2 items-center border-b border-b-gray-150">
                    <div className="font-semibold pr-10">{data?.seller_name}</div>
                    <div className="mr-1 mb-0.5">4.5 </div>
                    <StarIcon
                        fontSize="small"
                        sx={{color: "rgb(245 158 11)", width: 14, height: 14}}
                    ></StarIcon>

                    <div className="flex items-center gap-2 ml-auto">
                        <Tooltip placement="bottom" title={
                            <div>
                                Giao hàng thành công <br/>
                                {formatDateTime(data?.completed_time)}
                            </div>
                        }>
                            <img
                                src="../../src/assets/delivery-truck.png"
                                style={{maxWidth: "7%",color: "#26aa99"}}
                                alt=""
                            />
                        </Tooltip>
                        <div
                            className=" gap-3 border-r pr-4 font-normal border-gray-200"
                            style={{color: "#26aa99",fontWeight:500}}
                        >
                            {/*<img src="src/assets/fast.png" style={{maxWidth: '5%'}} alt=""/>*/}
                            <div>Đơn hàng đã giao thành công</div>
                        </div>

                        <div
                            className="p-2  py-2  right-0 rounded  text-red-600 opacity-80 border-gray-400 border-none text-sm  font-medium focus:outline-0">
                            {data?.is_review === 1 ?  'ĐÁNH GIÁ' : 'HOÀN THÀNH' }
                        </div>
                    </div>
                </div>
                <div onClick={handleNavigate} className="flex pb-3 py-4 items-center cursor-pointer  border-b border-b-gray-150">
                    <div className="flex items-start">
                        <div className=" w-24">
                            <img
                                style={{
                                    maxWidth: '96px', maxHeight: '96px',
                                    overflow: 'hidden', height: 'auto', width: '100%'
                                }}
                                src={data?.main_image}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="px-4 max-w-3xl text-base text-left">
                                {data?.product_name}
                            </div>
                            <div
                                style={{color: "rgba(0,0,0,.54)"}}
                                className="px-4 mt-2 max-w-3xl text-left"
                            >
                                Rank : {data?.rank}
                            </div>
                        </div>
                    </div>

                    <div className=" text-base ml-auto px-5">
                       <span className="text-black text-sm">Giá khởi điểm </span> {data?.reserve_price}đ
                    </div>
                </div>
                <div
                    className="py-4 flex items-center "
                    style={{backgroundColor: "#fffefb"}}
                >
                    {
                       (data.is_review === 0 && isDateGreaterThanToday(data?.review_before)) && <>
                            <button style={{backgroundColor: "#ee4d2d"}}
                                    onClick={handleOpen}
                                    className="p-2 px-8 py-2  right-0 rounded-none cursor-pointer   text-white  border-none text-sm  font-medium focus:outline-0">
                                Đánh giá
                            </button>
                            <div
                                className=" gap-3 px-4 text-xs "
                                style={{color: "rgba(0, 0, 0, .54)"}}
                            >
                                <div>Đánh giá trước ngày <u>{data?.review_before}</u> để nhận 100 điểm</div>
                            </div>
                        </>
                    }

                    <div className="flex ml-auto items-center gap-2 px-6">
                        <div className="">Giá trúng thầu :</div>
                        <div className="text-red-500 text-2xl">{data?.final_price}đ</div>
                    </div>
                </div>
                {/* dialog đánh giá */}
                <Dialog open={open} onClose={handleOpen} maxWidth="md">
                    <DialogTitle>
                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-lg">
                                              Đánh giá sản phẩm
                                            </span>
                        </div>
                        <div className="border-b mt-2  border-gray-300"></div>
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} margin={1} minWidth={750}>
                            <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                <div className="flex items-start">
                                    <div className="">
                                        <img

                                            style={{
                                                width: '4rem', maxHeight: '4rem',
                                                overflow: 'hidden', height: 'auto'
                                            }}
                                            src={data?.main_image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="px-4  overflow_css_card_740 text-sm text-left">
                                            {data?.product_name}
                                        </div>
                                        <div
                                            style={{color: "rgba(0,0,0,.54)"}}
                                            className="px-4 mt-2 text-sm  text-left"
                                        >
                                            Rank : {data?.rank}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-10 items-center text-left pt-2 font-medium">
                                    <div> Chất lượng sản phẩm :</div>
                                    <Flex gap="middle" vertical className="flex flex-row items-center">

                                        <Rate allowClear={false} tooltips={desc} rootClassName="text-yellow-400" onChange={handleValueChange} value={value} />
                                        <span className="mt-0.5">{value ? <span>{desc[value - 1]}</span> : null}</span>
                                    </Flex>
                                </div>
                                <div className="-m-7 px-7 py-5"  style={{backgroundColor: "rgb(248 248 248"}}>
                                    <Form.Item
                                        name="rv_image"
                                        label="Hình ảnh "
                                        style={{textAlign: "left"}}
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <FileUpload length={5} onGetFormData={handleFilesUpload}/>
                                    </Form.Item>

                                    <Form.Item
                                        name="comment"
                                        label="Nhận xét"
                                        rules={[
                                            {
                                                required: false,
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            maxLength={300}
                                            onChange={(e) => handleReviewData('comment', e.target.value)}
                                            placeholder="Nhận xét về sản phẩm"/>
                                    </Form.Item>
                                </div>

                            </div>
                            <div className="flex gap-4 justify-end my-2">
                                <button
                                    onClick={handleOpen}
                                    className="p-2 px-6 py-2 right-0 bg-white rounded-none text-orange-500  border border-orange-500  text-sm hover:border-orange-500 hover:bg-neutral-50  font-medium focus:outline-0">
                                    Trở về
                                </button>

                                <button
                                    onClick={handleSubmitReview}
                                    className="p-2 px-6 py-2 right-0 bg-orange-400 rounded-none text-white  border-gray-300 border-none text-sm hover:bg-orange-500  font-semibold focus:outline-0">
                                    Hoàn thành
                                </button>
                            </div>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default AuctionHistoryCpn;
