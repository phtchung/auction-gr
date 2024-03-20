import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { Form, Input} from 'antd';
import {Button} from "@material-tailwind/react";
import {useState} from "react";
import SideBar from "../../Components/SideBar/index.jsx";
import FileUpload from "../../Components/UploadFile/uploadFile.jsx";
import {toast} from "react-toastify";
import {returnProductData} from "../../Services/requestService.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";

const ReturnProduct = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const {state} = useLocation()
    const [returnData, setreturnData] = useState({id:id});
    const handleReturnData = (key, value) => {
        setreturnData({...returnData, [key]: value});
    };
    const handleFileUpload = (formData) => {
        handleReturnData("files", formData)
    };
    if(state !== 7){
        navigate('/404')
    }
    const handleSubmit = async () => {
        try {
            if (Object.keys(returnData).length < 2 ) {
                toast.error("Chưa điền đủ các thông tin", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                return;
            }
            const res = await returnProductData({...returnData});
            navigate("/resultSuccess", { state: 9});
            setreturnData({id:id});
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

  return(
      <>
          <MainLayOut>
              <div className="wrapper">
                  <SideBar/>
                  <div className="home-right bg-white">
                      <div className="flex p-4 gap-2  items-center px-2 justify-between">
                          <div
                              className="flex items-center cursor-pointer"
                              onClick={() => navigate(-1)}
                          >
                              <ArrowBackIosOutlinedIcon
                                  sx={{fontSize: 20}}
                                  color="rgb(212,212,212)"
                              ></ArrowBackIosOutlinedIcon>
                              <div className="text-base"> Trở lại</div>
                          </div>

                          <div className="flex items-center gap-2">
                              <div className="text-left text-base ">Danh Sách</div>
                              <ArrowForwardIosOutlinedIcon
                                  sx={{fontSize: 18}}
                                  fontSize="small"
                                  color="gray"
                              ></ArrowForwardIosOutlinedIcon>
                              <div className="text-base">Chi tiết</div>
                              <ArrowForwardIosOutlinedIcon
                                  sx={{fontSize: 18}}
                                  fontSize="small"
                                  color="gray"
                              ></ArrowForwardIosOutlinedIcon>
                              <div className="text-base">Yêu cầu trả hàng</div>
                          </div>
                      </div>
                      <div className="border-b border-gray-400  mx-5"></div>
                      <div className="flex justify-between m-2.5 items-center px-2">
                          <div className="text-left text-sm font-semibold mt-4 ">
                              Thông tin yêu cầu trả hàng
                          </div>

                      </div>
                      <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                          <div className="grid grid-cols-6  items-center">
                              <div className="font-normal text-left col-span-5">
                                  <Form.Item
                                      name="return_reason"
                                      label="Lí do"
                                      rules={[
                                          {
                                              required: true,
                                              message: 'Hãy điền tên sản phẩm!',
                                              whitespace: true,
                                          },
                                      ]}
                                  >
                                      <Input
                                          onChange={(e) => handleReturnData('return_reason', e.target.value)}
                                          placeholder="Lí do"/>
                                  </Form.Item>
                              </div>
                          </div>
                          <div className="grid grid-cols-6  items-center">
                              <div className="font-normal text-left col-span-6">
                                  <Form.Item
                                      name="main_image"
                                      label="Các hình ảnh liên quan "
                                      style={{textAlign: "left"}}
                                      rules={[
                                          {
                                              required: true,
                                              message: 'Hãy điền phí vận chuyển sản phẩm!',
                                          },
                                      ]}
                                  >
                                      <FileUpload length={16} onGetFormData={handleFileUpload}/>
                                  </Form.Item>
                              </div>
                          </div>


                          <div className="flex  gap-5 pb-6 justify-start mr-10">
                              <Button
                                  onClick={handleSubmit}
                                  className="p-2 px-6 py-2 right-0 bg-yellow-400 rounded text-black border-gray-400 border-none text-sm  font-semibold focus:outline-0">
                                  Trả hàng
                              </Button>
                          </div>
                      </div>
                  </div>
              </div>
          </MainLayOut>


      </>


  )
}
export default ReturnProduct
