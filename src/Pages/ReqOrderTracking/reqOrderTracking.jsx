import SideBar from "../../Components/SideBar/index.jsx";
import "./home.css";
import {
  categories,
  numberToString,
  pending,
  rankItems,
  reqConvertStatus,
  tabData,
} from "../../Utils/constant.js";
import { useState } from "react";
import TabItem from "../../Components/TabItem/TabItem.jsx";
import Header from "../../Components/Header/header.jsx";

import TableData from "../../Components/TableData/TableData.jsx";
import { useNavigate } from "react-router-dom";
import useReqOrderTracking from "./useReqOrderTracking.jsx";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { sendRequest } from "../../Services/requestService.jsx";
import { toast } from "react-toastify";

const ReqOrderTracking = () => {
  const {
    isLdCount,
    isScCount,
    reqCount,
    isLoading,
    refetch,
    refetch1,
    colData,
    isSuccess,
    reqTrackingData,
    status,
    setStatus,
  } = useReqOrderTracking();

  const [open, openchange] = useState(false);
  const [open1, openchange1] = useState(false);
  const [open2, openchange2] = useState(false);

  const [request, setRequest] = useState(null);

  const handleRequest = (key, value) => {
    setRequest({ ...request, [key]: value });
    console.log("req", request);
  };

  const openPopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };
  const openPopup2 = () => {
    openchange2(true);
  };
  const closePopup2 = () => {
    openchange2(false);
  };

  const openPopup1 = () => {
    openchange1(true);
  };
  const closePopup1 = () => {
    openchange1(false);
  };

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(status);
  const handelClick = (value) => {
    setStatus(reqConvertStatus(value));
    setSelectedTab(value);
    navigate(`/reqOrderTracking?status=${value}`);
  };
  const handleData = () => {
    setRequest({ ...request });
    closePopup2();
    closepopup();
  };

  const handleDeleteData = () => {
    setRequest(null);
    closePopup2();
    closepopup();
  };

  const handleSendRequest = async () => {
    try {
      if (!request) {
        toast.error("Chưa điền thông tin");
        closePopup1(true);
        return;
      }
      const res = await sendRequest({ ...request });
      toast.success("Gửi yêu cầu thành công", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
      refetch();
      refetch1();
      openchange1(false);
      openchange(false);
      setRequest(null);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <SideBar></SideBar>
        <div className="home-right ">
          <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
            Quản Lý Đơn Bán
          </div>
          <div className="border-b border-neutral-700 "></div>
          <div className="flex items-center font-normal justify-center pt-10 flex-wrap  "></div>
          {isScCount && (
            <div className="flex justify-around flex-wrap">
              <>
                <TabItem
                  data={pending}
                  count={reqCount.count_penR}
                  onClick={() => handelClick(1)}
                  isSelected={selectedTab === 1}
                ></TabItem>
                <TabItem
                  data={tabData[0]}
                  count={reqCount.count_appR}
                  onClick={() => handelClick(2)}
                  isSelected={selectedTab === 2}
                ></TabItem>
                <TabItem
                  data={tabData[1]}
                  count={reqCount.count_bidR}
                  onClick={() => handelClick(3)}
                  isSelected={selectedTab === 3}
                ></TabItem>
                <TabItem
                  data={tabData[2]}
                  count={reqCount.count_sucR}
                  onClick={() => handelClick(5)}
                  isSelected={selectedTab === 5}
                ></TabItem>
                <TabItem
                  data={tabData[4]}
                  count={reqCount.count_cfR}
                  onClick={() => handelClick(6)}
                  isSelected={selectedTab === 6}
                ></TabItem>
                <TabItem
                  data={tabData[5]}
                  count={reqCount.count_dlvR}
                  onClick={() => handelClick(7)}
                  isSelected={selectedTab === 7}
                ></TabItem>
                <TabItem
                  data={tabData[6]}
                  count={reqCount.count_cplR}
                  onClick={() => handelClick(8)}
                  isSelected={selectedTab === 8}
                ></TabItem>
                <TabItem
                  data={tabData[3]}
                  count={reqCount.count_failR}
                  onClick={() => handelClick(10)}
                  isSelected={selectedTab === 10}
                ></TabItem>
                <TabItem
                  data={tabData[7]}
                  count={reqCount.count_calR}
                  onClick={() => handelClick(11)}
                  isSelected={selectedTab === 11}
                ></TabItem>
                <TabItem
                  data={tabData[8]}
                  count={reqCount.count_rejR}
                  onClick={() => handelClick(13)}
                  isSelected={selectedTab === 13}
                ></TabItem>
              </>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <button
              onClick={openPopup}
              className="p-2 rounded bg-neutral-900  text-white border-gray-400 hover:bg-neutral-600 text-sm  font-medium focus:outline-0"
            >
              Tạo yêu cầu
            </button>

            <Dialog open={open} onClose={closepopup} fullWidth maxWidth="md">
              <DialogTitle>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">
                    Tạo yêu cầu đấu giá
                  </span>
                  <div
                    onClick={closepopup}
                    className="bg-black rounded cursor-pointer text-base text-white hover:bg-neutral-600 border-none font-medium focus:outline-0"
                  >
                    <CloseIcon></CloseIcon>
                  </div>
                </div>

                <div className="border-b-2 mt-2  border-gray-300"></div>
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={1}>
                  <div className="text-sm font-semibold">
                    Thông tin sản phẩm
                  </div>
                  <div className="flex justify-between items-center gap-6">
                    <TextField
                      id="filled-basic"
                      fullWidth
                      sx={{ maxWidth: 690 }}
                      color="info"
                      defaultValue={
                        request?.product_name ? request?.product_name : null
                      }
                      onChange={(e) =>
                        handleRequest("product_name", e.target.value)
                      }
                      label="Tên sản phẩm *"
                      size="small"
                      variant="filled"
                    />
                    <FormControl
                      size="small"
                      variant="filled"
                      sx={{ minWidth: 200 }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Chất lượng *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                      >
                        {rankItems.map((item) => (
                          <MenuItem
                            key={item.value}
                            value={item.value}
                            onClick={() => handleRequest("rank", item.value)}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <FormControl
                    size="small"
                    variant="filled"
                    sx={{ m: 1, maxWidth: 405 }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Danh mục *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                    >
                      {categories.map((item) => (
                        <MenuItem
                          key={item.value}
                          value={item.value}
                          onClick={() => handleRequest("category", item.value)}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="text-base font-semibold">
                    Giá sản phẩm (VND)
                  </div>
                  <div className="flex justify-between items-center gap-6">
                    <TextField
                      size="small"
                      id="filled-basic"
                      fullWidth
                      color="info"
                      required
                      error={request?.sale_price ? false : true}
                      onChange={(e) =>
                        handleRequest("sale_price", e.target.value)
                      }
                      label="Giá bán trực tiếp"
                      variant="filled"
                    />
                    <TextField
                      size="small"
                      id="filled-basic"
                      fullWidth
                      color="info"
                      onChange={(e) =>
                        handleRequest("reserve_price", e.target.value)
                      }
                      label="Giá khởi điểm *"
                      variant="filled"
                    />
                    <TextField
                      size="small"
                      id="filled-basic"
                      fullWidth
                      color="info"
                      onChange={(e) =>
                        handleRequest("step_price", e.target.value)
                      }
                      label="Step Price *"
                      variant="filled"
                    />
                    <TextField
                      size="small"
                      id="filled-basic"
                      fullWidth
                      color="info"
                      onChange={(e) =>
                        handleRequest("shipping_fee", e.target.value)
                      }
                      label="Phí vận chuyển *"
                      variant="filled"
                    />
                  </div>
                  <div className="text-base font-semibold">
                    Hình ảnh sản phẩm
                  </div>
                  <div className="text-base font-semibold">Mô tả sản phẩm</div>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    size="small"
                    label="Description"
                    onChange={(e) =>
                      handleRequest("description", e.target.value)
                    }
                    variant="filled"
                    maxRows={8}
                  />
                  <div className="flex gap-4 justify-end my-2">
                    <button
                      onClick={openPopup2}
                      className="bg-red-500 text-base text-white hover:bg-red-400 border-none font-medium focus:outline-0"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={openPopup1}
                      className="bg-black text-base text-white hover:bg-neutral-600 border-none font-medium focus:outline-0"
                    >
                      Gửi
                    </button>
                  </div>
                </Stack>
              </DialogContent>
            </Dialog>
          </div>

          {/* Dialog confirm */}
          <Dialog open={open1} onClose={closePopup1} maxWidth="xs">
            <DialogTitle>
              <span className="font-semibold text-base">
                Xác nhận gửi yêu cầu
              </span>
              <div className="border-b-2 mt-2  border-gray-300"></div>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} margin={1}>
                <div className="flex-col items-center text-center">
                  <TaskAltIcon color="success" fontSize="large"></TaskAltIcon>
                  <div className="text-base">
                    {" "}
                    Bạn có chắc chắn muốn gửi yêu cầu không ?
                  </div>
                </div>

                <div className="flex gap-4 justify-end mt-1 ">
                  <button
                    onClick={closePopup1}
                    className="bg-red-600  text-base text-white hover:bg-red-400 border-none font-medium focus:outline-0"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="bg-green-800 text-base text-white hover:bg-green-600 border-none font-medium focus:outline-0"
                  >
                    Có
                  </button>
                </div>
              </Stack>
            </DialogContent>
          </Dialog>

          {/*dialog hủy confirm*/}
          <Dialog open={open2} onClose={() => closePopup2} maxWidth="xs">
            <DialogTitle>
              <span className="font-semibold text-base">
                Xác nhận gửi yêu cầu
              </span>
              <div className="border-b-2 mt-2  border-gray-300"></div>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} margin={1}>
                <div className="flex-col items-center text-center">
                  <TaskAltIcon color="success" fontSize="large"></TaskAltIcon>
                  <div className="text-base"> Giữ thông tin hiện tại ?</div>
                </div>

                <div className="flex gap-4 justify-end mt-1 ">
                  <button
                    onClick={handleDeleteData}
                    className="bg-red-600  text-base text-white hover:bg-red-400 border-none font-medium focus:outline-0"
                  >
                    Không
                  </button>
                  <button
                    onClick={handleData}
                    className="bg-green-800 text-base text-white hover:bg-green-600 border-none font-medium focus:outline-0"
                  >
                    Có
                  </button>
                </div>
              </Stack>
            </DialogContent>
          </Dialog>

          {isSuccess && (
            <>
              <div className="border border-gray-300 mt-6">
                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                  <div className="text-left font-medium my-2 ml-3 ">
                    List - {numberToString(status)}
                  </div>
                </div>

                <div className="border-b-2 border-gray-300 "></div>
                <TableData cols={colData} rows={reqTrackingData}></TableData>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReqOrderTracking;
