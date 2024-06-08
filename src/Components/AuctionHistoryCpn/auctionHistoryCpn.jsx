import StarIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";
import {formatDateTime, formatDateTime1, formatMoney, isDateGreaterThanToday} from "../../Utils/constant.js";
import {Avatar, Tooltip} from "antd";
import { Form, Input} from "antd";
import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";
import { Flex, Rate } from 'antd';
import FileUpload from "../UploadFile/uploadFile.jsx";
import {toast} from "react-toastify";
import {getReview, reviewProduct} from "../../Services/productService.jsx";
import useConversation from "../../zustand/useConversation.js";
import {useQuery} from "@tanstack/react-query";
import CustomSpinner from "../CustomSpinner/CustomSpinner.jsx";
import {UserOutlined} from "@ant-design/icons";
const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
const AuctionHistoryCpn = ({data}) => {
    const [value, setValue] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [reviewData, setReviewData] = useState({product_id:data._id,rate : 5})
    const [open, setOpen] = useState(false);
    const {setOpenChat,selectedConversation,setSelectedConversation } = useConversation()

    const handleOpen = () => setOpen(!open);
    const handleReviewData = (key, value) => {
        setReviewData({...reviewData, [key]: value});
    };
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/auctionHistory" + `/auction/${data._id}`)
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
            setReviewData({product_id:data._id});
            navigate('/auctionHistory')
        } catch (error) {
            toast.error(error?.response?.data?.message);
            handleOpen()
        }
    };
    const handleStartChat = (seller) => {
        console.log(seller)
        setSelectedConversation(seller)
        setOpenChat(true)
    }

    const { data : dataRv, isSuccess, isLoading } = useQuery({
        queryKey: ["getReview"],
        queryFn: () => getReview({auction_id  : data._id }),
        select: (data) => data.data,
        enabled : !!showModal
    });

    return (
        <>
            <div className=" px-6 py-3 shadow-inner bg-white  text-sm ">
                <div onClick={handleNavigate}
                     className="flex cursor-pointer pb-2 pt-2 items-center border-b border-b-gray-150">
                    <div className="font-semibold pr-10">{data?.seller_id?.name}</div>
                    <div className="mr-1 mb-0.5">4.5</div>
                    <StarIcon
                        fontSize="small"
                        sx={{color: "rgb(245 158 11)", width: 14, height: 14}}
                    ></StarIcon>

                    <div className="flex items-center gap-2 ml-auto">
                        <Tooltip placement="bottom" title={
                            <div>
                                Giao hàng thành công <br/>
                                {formatDateTime(data?.delivery?.completed_time)}
                            </div>
                        }>
                            <img
                                src="../../src/assets/delivery-truck.png"
                                style={{maxWidth: "7%", color: "#26aa99"}}
                                alt=""
                            />
                        </Tooltip>
                        <div
                            className=" gap-3 border-r pr-4 font-normal border-gray-200"
                            style={{color: "#26aa99", fontWeight: 500}}
                        >
                            {/*<img src="src/assets/fast.png" style={{maxWidth: '5%'}} alt=""/>*/}
                            <div>Đơn hàng đã giao thành công</div>
                        </div>

                        <div
                            className="p-2  py-2  right-0 rounded  text-orange-600 opacity-80 border-gray-400 border-none text-sm  font-medium focus:outline-0">
                            {data?.is_review === 1 ? 'ĐÁNH GIÁ' : 'HOÀN THÀNH'}
                        </div>
                    </div>
                </div>
                <div onClick={handleNavigate}
                     className="grid md:grid-cols-4  py-4 items-center cursor-pointer  border-b border-b-gray-150">
                    <div className="flex items-start col-span-3">
                        <div className=" w-24">
                            <img
                                style={{
                                    width: '96px', height: '96px',
                                    overflow: 'hidden', backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                src={data?.product_id?.main_image}
                                alt="image"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="px-4 max-w-3xl text-base text-left">
                                {data?.product_id?.product_name}
                            </div>
                            <div
                                style={{color: "rgba(0,0,0,.54)"}}
                                className="px-4 mt-2 max-w-3xl text-left"
                            >
                                Rank : {data?.product_id?.rank}
                            </div>
                        </div>
                    </div>

                    <div className=" text-base ml-auto px-5">
                        <span className="text-black font-medium text-base">₫{formatMoney(data?.reserve_price)}</span>
                    </div>
                </div>
                <div
                    className="py-2 flex items-center "
                    style={{backgroundColor: "#fffefb"}}
                >
                    {
                        (data.is_review === 0 && isDateGreaterThanToday(formatDateTime1(data?.review_before))) && <>
                            <button style={{backgroundColor: "#ee6b3c"}}
                                    onClick={handleOpen}
                                    className="p-2 px-8 py-2  right-0 rounded-none cursor-pointer   text-white  border-none text-sm  font-medium focus:outline-0">
                                Đánh giá
                            </button>
                            <div
                                className=" gap-3 px-4 text-xs "
                                style={{color: "rgba(0, 0, 0, .54)"}}
                            >
                                <div>Đánh giá trước ngày <u>{formatDateTime1(data?.review_before)}</u> để nhận 20 điểm</div>
                            </div>
                        </>
                    }

                    <div className="flex ml-auto items-center gap-2 px-6">
                        <div className="text-base text-neutral-600 font-medium">Giá trúng thầu :</div>
                        <div className="text-orange-600 font-semibold text-2xl money">₫{formatMoney( data?.final_price)}</div>
                    </div>
                </div>
                <div style={{backgroundColor: "#fffefb"}} className="flex flex-row justify-end p-3 gap-4 pb-1 ml-auto items-center">
                    <div onClick={() => handleStartChat(data?.seller_id)}
                         className=" px-4 py-1.5 cursor-pointer border outline-0 border-orange-500 rounded-md shadow-md"
                         style={{backgroundColor: 'rgba(255,87,34,.1)'}}>
                        <div className="flex flex-row gap-2 items-center">
                            <svg className="w-5 h-5 text-white fill-orange-500"
                                 style={{color: '#ee4d2d'}}
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M18 6.07a1 1 0 01.993.883L19 7.07v10.365a1 1 0 01-1.64.768l-1.6-1.333H6.42a1 1
                                         0 01-.98-.8l-.016-.117-.149-1.783h9.292a1.8 1.8 0 001.776-1.508l.018-.154.494-6.438H18zm-2.78-4.5a1
                                         1 0 011 1l-.003.077-.746 9.7a1 1 0 01-.997.923H4.24l-1.6 1.333a1 1 0 01-.5.222l-.14.01a1 1 0 01-.993-.883L1
                                         13.835V2.57a1 1 0 011-1h13.22zm-4.638 5.082c-.223.222-.53.397-.903.526A4.61 4.61 0 018.2 7.42a4.61 4.61 0
                                         01-1.48-.242c-.372-.129-.68-.304-.902-.526a.45.45 0 00-.636.636c.329.33.753.571 1.246.74A5.448 5.448 0 008.2
                                         8.32c.51 0 1.126-.068 1.772-.291.493-.17.917-.412 1.246-.74a.45.45 0 00-.636-.637z"></path>
                            </svg>
                            <p className="text-orange-500 rounded-md font-medium text-base">Liên hệ người bán </p>
                        </div>
                    </div>
                    {
                        data.is_review === 1 &&
                        <button onClick={() => setShowModal(true)}
                                className="border border-neutral-200 hover:border-neutral-300 ">Xem đánh giá </button>
                    }

                </div>

                {/*dialog xem đánh giasd */}
                {showModal ? (
                    <>
                    {
                            isLoading ?
                                <>
                                    <CustomSpinner h={8} w={8} font={'sm'}/>
                                </>
                                :
                                isSuccess &&
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-2/3 my-6 mx-auto max-w-2xl">
                                            {/*content*/}
                                            <div
                                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div
                                                    className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h5 className="text-xl  font-medium text-neutral-600">
                                                        Đánh giá sản phẩm
                                                    </h5>
                                                </div>
                                                {/*body*/}
                                                <div className="relative p-5 flex-auto">
                                                    <div className="flex  flex-row gap-6">
                                                        <img src={dataRv?.auction_id?.product_id?.main_image} className="w-14 h-14" alt=""/>
                                                        <div className="text-neutral-500 font-medium leading-6">
                                                            {dataRv?.auction_id?.product_id?.product_name}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="border-t border-solid mt-6 pt-6 border-blueGray-200">
                                                        <div className="flex flex-row gap-4 items-start">
                                                            <Avatar
                                                                style={{
                                                                    backgroundColor: '#87d068',
                                                                }}
                                                                icon={<UserOutlined />}
                                                            />
                                                            <div
                                                                className="font-normal text-left flex flex-col gap-2 ">
                                                                <div className="text-xs text-neutral-700"> {dataRv?.user_id?.username}</div>
                                                                <div className="">
                                                                    <Rate disabled tooltips={desc}  defaultValue={dataRv?.rating}
                                                                          rootClassName="m-0" style={{
                                                                        marginInlineEnd: '2px !important',
                                                                        fontSize: 14
                                                                    }}/>
                                                                </div>
                                                                <div
                                                                    className="font-normal text-sm text-neutral-800  mb-3">{dataRv?.comment}</div>
                                                                <div className="grid grid-cols-4 gap-4">
                                                                    {
                                                                        dataRv?.rv_image_list?.map((img, idx) => (
                                                                            <><img key={idx}
                                                                                   className="col-span-1 h-32 w-32" src={img} alt=""/></>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*footer*/}
                                                <div
                                                    className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="bg-neutral-100 text-black active:bg-orange-200 hover:border-neutral-200 text-sm px-10 py-3 rounded border border-neutral-300  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        OK
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                        }
                    </>
                ) : null}

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
                                            src={data?.product_id?.main_image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="px-4  overflow_css_card_740 text-sm text-left">
                                            {data?.product_id?.product_name}
                                        </div>
                                        <div
                                            style={{color: "rgba(0,0,0,.54)"}}
                                            className="px-4 mt-2 text-sm  text-left"
                                        >
                                            Rank : {data?.product_id?.rank}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-10 items-center text-left pt-2 font-medium">
                                    <div> Chất lượng sản phẩm :</div>
                                    <Flex gap="middle" vertical className="flex flex-row items-center">

                                        <Rate allowClear={false} tooltips={desc} rootClassName="text-yellow-400"
                                              onChange={handleValueChange} value={value}/>
                                        <span className="mt-0.5">{value ? <span>{desc[value - 1]}</span> : null}</span>
                                    </Flex>
                                </div>
                                <div className="-m-7 px-7 py-5" style={{backgroundColor: "rgb(248 248 248"}}>
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
                                    className=" px-8   right-0 bg-white rounded text-orange-500 border-orange-500 text-sm hover:border-orange-500 hover:bg-orange-50 font-medium ">
                                    Trở về
                                </button>

                                <button
                                    onClick={handleSubmitReview}
                                    className="px-6 right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-semibold focus:outline-0">
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
