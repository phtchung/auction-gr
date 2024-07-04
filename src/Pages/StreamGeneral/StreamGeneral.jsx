import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Pagination} from "@mui/material";
import {useState} from "react";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import {Modal} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import CardStreamGeneral from "../../Components/Card/cardStreamGeneral.jsx";
import useStreamGeneral from "./useStreamGeneral.jsx";
import {useMutation} from "@tanstack/react-query";
import { VerifyCodeRoom} from "../../Services/biddingService.jsx";
import {baseFEUrl} from "../../Utils/constant.js";

const modalStyles = {
    body:{ maxHeight: '450px', overflowY: 'auto',marginRight:'-10px'},
    header:{
        textAlign:'center',
    },
    content: {
        borderRadius:8,
    },
};
const StreamGeneral = () => {
    const {isSuccess , isLoading,data , setType , type, setQueryString, queryString , totalPage,currentPage,handlePageChange } = useStreamGeneral()
    const [activeTab, setActiveTab] = useState(type);
    const [keyword,setKeyword] = useState(null)
    const [connectData, setConnectData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [modalStatus, setModalStatus] = useState({url:'', message: '', status: null });

    const handleConnectData = (key, value) => {
        setConnectData({...connectData, [key]: value});
        console.log(connectData)
    };

    const handleKeyword = (value) => {
        if(keyword){
            setQueryString({...queryString,keyword:value})
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }else {
            delete queryString.keyword
            setQueryString(queryString)
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const {mutate, isError,error, isPending} = useMutation({
        mutationFn: async (connectData) => {
            try {
                const res = await VerifyCodeRoom(connectData)
                const data = res.data
                console.log(data.pathUrl)
                return data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (data) => {
            handleCancel()
            setModalStatus({...modalStatus, message: data.message,status: data.status,url:data.pathUrl})
            showModal1()
        },
        onError:(error) =>{
            handleCancel()
            setModalStatus({...modalStatus, message: error.response.data.message,status: error.response.status,url:`${baseFEUrl}/streamGeneral`})
            showModal1()
        }
    });
    const handleSubmit = () => {
        mutate(connectData);
    };

    return (
        <>
            <MainLayOut style={{zIndex: 10000}} >
                <>
                    <div
                        className=" flex flex-col gap-8 sm:gap-[60px] mt-24 lg:gap-32 xs:px-2 pb-4 md:pb-8 xl:pb-12 pt-[10px]">
                        <div className=" relative ">
                            <div
                                className="mb-10 md:w-1/2  mx-auto items-center justify-between text-base font-medium w-full ">
                                <div className="cursor-text sm:mt-0 mx-2 flex items-center h-10 px-2.5 gap-2  ">
                                    <input onChange={(e) => setKeyword(e.target.value)}
                                           placeholder="Tìm theo mã phòng"
                                           value={keyword}
                                           className="border text-sm w-full bg-white border-orange-500 px-4 py-2 focus:outline-orange-500 "/>
                                    <SearchOutlined className="cursor-pointer"
                                                    onClick={() => handleKeyword(keyword)} style={{
                                        fontSize: '20px',
                                        color: keyword ? 'rgb(249, 115, 22)' : '#A6A4A3FF'
                                    }}/>
                                </div>
                            </div>

                            {
                                isSuccess ?
                                    <>
                                        <div>
                                            <div
                                                className=" text-sm min-[450px]:grid-cols-2 grid sm:grid-cols-3 md:grid-cols-4 mb-4 lg:grid-cols-5 grid-cols-5 gap-4">
                                                {
                                                    isSuccess && data && data.length > 0 &&
                                                    data.map((product, index) => (
                                                        <div key={index}
                                                             className=" p-2  ">
                                                            <CardStreamGeneral data={product} getData={handleConnectData} onOpenPopup={showModal}/>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            {
                                                isSuccess && data && data.length === 0 ?
                                                    <>
                                                        <div className="flex flex-col items-center">
                                                            <img
                                                                style={{width: '30%'}}
                                                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                                                                alt=""/>
                                                            <div
                                                                className="font-medium text-neutral-600 text-base">Không có sản phẩm nào.
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <Pagination
                                                            count={totalPage}
                                                            page={currentPage}
                                                            onChange={handlePageChange}
                                                            shape="rounded"
                                                            style={{
                                                                justifyContent: "center",
                                                                display: "flex",
                                                            }}
                                                        />
                                                    </>
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <CustomSpinner h={8} w={8} font={'sm'}/>
                                    </>
                            }
                        </div>
                    </div>

                    <Modal styles={modalStyles} title={<p className="mb-4 text-xl font-medium text-gray-900">Xác thực phiên đấu giá</p>}
                           footer={null} centered open={isModalOpen}
                           destroyOnClose={true}
                           onCancel={handleCancel}>
                        {
                            <div>
                                <div className=" w-full h-full max-w-md md:h-auto">
                                    <div className="relative bg-white rounded-lg ">
                                        <div className="px-6 py-3 lg:px-8">
                                            <div className="space-y-6" >
                                                <div>
                                                    <label htmlFor="code"
                                                           className="block mb-2 text-base font-medium text-gray-900e">Mã tham gia đấu giá</label>
                                                    <input type="text" name="code"
                                                           onChange={(e) => handleConnectData('code',e.target.value)  }
                                                           className="bg-gray-50 border border-orange-300 text-gray-800 text-base   rounded-lg focus:border-orange-500  border-solid  block w-full p-2.5"
                                                           placeholder="Nhập mã tham gia" required/>
                                                </div>

                                                <button
                                                        onClick={handleSubmit}
                                                        className={`${isPending} ? 'animate-spin' : ''  w-full text-white bg-orange-500 hover:bg-orange-600 hover:border-orange-500  focus:ring-2 focus:outline-none focus:ring-orange-300
                                                         font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                                                     Xác thực
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </Modal>

                    <Modal styles={modalStyles}
                           header={null}
                           closable={false}
                           footer={null} centered open={isModalOpen1}
                           onCancel={handleCancel1}>
                        {
                            <div
                                className=" flex flex-wrap justify-center items-center w-full h-full   overflow-auto font-[sans-serif]">
                                <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-3 relative">
                                    <svg onClick={handleCancel1} xmlns="http://www.w3.org/2000/svg"
                                         className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-orange-500 float-right"
                                         viewBox="0 0 320.591 320.591">
                                        <path
                                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822
                                                 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                            data-original="#000000"></path>
                                        <path
                                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736
                                                 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                            data-original="#000000"></path>
                                    </svg>

                                    <div className="my-8 text-center">
                                        {modalStatus.status === 404 ?
                                            <>
                                                <svg className="w-20 h-20 text-red-500 mx-auto" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className="w-16 shrink-0 fill-[green] inline"
                                                 viewBox="0 0 512 512">
                                                <path
                                                    d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213
                                                     7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
                                                    data-original="#000000"/>
                                                <path
                                                    d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487
                                                     0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
                                                    data-original="#000000"/>
                                            </svg>
                                        }

                                        <h4 className={` font-semibold mt-6 ${modalStatus.status === 404 ? 'text-red-500 text-lg' : 'text-green-500 text-xl'}`}>
                                            {modalStatus.message}
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        className={`px-6 py-2.5 min-w-[150px] w-full rounded text-white text-sm font-semibold border-none outline-none 
                                                 ${modalStatus.status === 404 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                        onClick={() => {
                                            window.location.href = modalStatus.url
                                        }}
                                    >
                                        {modalStatus.status === 404 ? 'Trở về trang chủ' : 'Vào phiên đấu giá'}
                                    </button>
                                </div>
                            </div>
                        }
                    </Modal>
                </>
            </MainLayOut>
        </>
    )
}
export default StreamGeneral
