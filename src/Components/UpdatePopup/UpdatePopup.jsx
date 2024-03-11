import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {updateStatus} from "../../Services/updateStatusService.jsx";
import useWinOrdersTracking from "../../Pages/WinOrdersTracking/useWinOrdersTracking.jsx";
import useReqOrderTracking from "../../Pages/ReqOrderTracking/useReqOrderTracking.jsx";
import {convertCanReturn} from "../../Utils/constant.js";

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
            }else {
                navigate(`/reqOrderTracking?status=${value}`);
                refetch2();
                refetch3()
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
            <div className="flex justify-between m-2.5 items-center px-2">
                <div className="text-left text-sm font-semibold ">
                   Cập nhật trạng thái
                </div>
            </div>

            <div className="items-center text-left mt-4 mb-10 mx-8 px-1 space-y-6 ">

                <button
                    onClick={openPopup1}
                    className="bg-black text-sm p-2 rounded text-white hover:bg-neutral-600 border-none font-medium focus:outline-0"
                >
                    Cập nhật
                </button>
                <Dialog open={open1} onClose={closePopup1}  >
                    <DialogTitle>
                        <div className="text-left text-sm font-semibold ">
                            Cập nhật trạng thái
                        </div>
                        <div className="border-b-2 mt-2  border-gray-300"></div>
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} margin={1} minWidth={300}>
                            <div className="flex gap-4 justify-end mt-1  text-sm ">
                                {state && (state === 5) && (
                                    <>
                                        <button
                                            onClick={closePopup1}
                                            className="bg-red-600 p-2 w-full rounded
                                                 text-white hover:bg-red-400 border-none font-medium focus:outline-0"
                                        >
                                            Không
                                        </button>
                                        <button
                                            onClick={() => updateState(6)}
                                            className="bg-black p-2 w-full rounded text-white hover:bg-green-600 border-none font-medium focus:outline-0"
                                        >
                                            Xác nhận thông tin giao hàng
                                        </button>
                                    </>
                                )}
                                {state && (state === 6) && (
                                    <>
                                        <button
                                            onClick={closePopup1}
                                            className="bg-red-600 p-2 rounded w-full
                                                 text-white hover:bg-red-400 border-none font-medium focus:outline-0"
                                        >
                                            Không
                                        </button>
                                        <button
                                            onClick={() => updateState(7)}
                                            className="bg-black p-2 w-full rounded text-white hover:bg-green-600 border-none font-medium focus:outline-0"
                                        >
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
                                                    className="bg-red-600 p-2 rounded
                                                 text-white w-full hover:bg-red-400 border-none font-medium focus:outline-0"
                                                >
                                                    Yêu cầu trà hàng
                                                </button>
                                            </>
                                        }
                                        <button
                                            onClick={() => updateState(8)}
                                            className="bg-black p-2 w-full rounded text-white hover:bg-green-600 border-none font-medium focus:outline-0"
                                        >
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
