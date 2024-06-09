import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {updateStatus} from "../../Services/updateStatusService.jsx";
import useWinOrdersTracking from "../../Pages/WinOrdersTracking/useWinOrdersTracking.jsx";
import useReqOrderTracking from "../../Pages/ReqOrderTracking/useReqOrderTracking.jsx";
import {convertCanReturn} from "../../Utils/constant.js";
import CloseSvg from "../../assets/close.jsx";

const UpdatePopup = ({state,canReturn}) => {
    const {id} = useParams();
    const [open1, openchange1] = useState(false);
    const {refetch, refetch1} = useWinOrdersTracking();
    const {refetch : refetch2 , refetch1 : refetch3} = useReqOrderTracking()
    const [newState, setNewState] = useState(null)
    const navigate = useNavigate()
    const openPopup1 = () => {
        openchange1(true);
    };
    const closePopup1 = () => {
        openchange1(false);
    };

    useEffect(() => {
            setNewState({
                ...newState,
                product_id: id,
                state:state,
            });

    }, [id,state]);
    const updateState = async (value) => {
        try {
            const res = await updateStatus({...newState,'newState':value});
            toast.success("Cập nhật thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 300,
            });
            openchange1(false);
            if(value === 8){
                navigate(`/winOrderTracking?status=${value}`);
                refetch();
                refetch1();
                window.scrollTo(0,0)
            }else {
                navigate(`/reqOrderTracking?status=${value}`);
                refetch2();
                refetch3()
                window.scrollTo(0,0)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const handleNavigateReturn = () => {
        navigate(`/winOrderTracking/winOrderDetail/return/${id}`,{ state: state})
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="flex justify-between text-neutral-600 m-2.5 items-center px-2">
                <div className="text-center px-2 text-sm font-semibold ">
                   Cập nhật trạng thái
                </div>
            </div>

            <div className="items-center text-left mt-4 mb-10 mx-8 px-1 space-y-6 ">

                <button
                    onClick={openPopup1}
                    className=" px-6  right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-semibold focus:outline-0">
                    Cập nhật
                </button>
                <Dialog open={open1} onClose={closePopup1}  >
                    <DialogTitle>
                        <div className="flex flex-row text-neutral-600 items-center justify-between">
                            <div className="text-left text-base font-semibold ">
                                Cập nhật trạng thái
                            </div>
                            <div onClick={closePopup1}>
                                <CloseSvg/>
                            </div>
                        </div>
                        <div className="border-b-2 mt-2  border-gray-300"></div>
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} margin={1} >
                            <div className="flex gap-4 justify-end mt-1  text-sm ">
                                {state && (state === 5) && (
                                    <>
                                        <button
                                            onClick={closePopup1}
                                            className=" px-8 right-0 bg-white rounded text-orange-500 border-orange-500 text-sm hover:border-orange-500 hover:bg-orange-50 font-medium ">
                                            Không
                                        </button>
                                        <button
                                            onClick={() => updateState(6)}
                                            className=" px-8  right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-medium focus:outline-0">
                                            Xác nhận thông tin giao hàng
                                        </button>
                                    </>
                                )}
                                {state && (state === 6) && (
                                    <>
                                        <button
                                            onClick={closePopup1}
                                            className=" px-8   right-0 bg-white rounded text-orange-500 border-orange-500 text-sm hover:border-orange-500 hover:bg-orange-50 font-medium ">
                                            Không
                                        </button>
                                        <button
                                            onClick={() => updateState(7)}
                                            className=" px-8  right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-medium focus:outline-0">
                                            Bắt đầu giao hàng
                                        </button>
                                    </>
                                )}
                                {state && state === 7 && (
                                    <>
                                        {
                                            convertCanReturn(canReturn) === 1 &&
                                            <>
                                                <button
                                                    onClick={handleNavigateReturn}
                                                    className=" px-8  right-0 bg-orange-800 rounded text-white border-none text-sm hover:bg-orange-900 font-medium focus:outline-0">
                                                    Yêu cầu trả hàng
                                                </button>
                                            </>
                                        }
                                        <button
                                            onClick={() => updateState(8)}
                                            className=" px-8  right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-medium focus:outline-0">
                                            Đã nhận hàng
                                        </button>

                                    </>
                                )}
                            </div>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default UpdatePopup;
