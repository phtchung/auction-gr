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
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";

const ReturnProduct = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {id} = useParams()
    const {state} = useLocation()
    const [isError , setIsError] = useState(false)
    const [returnData, setreturnData] = useState({id:id});
    const handleReturnData = (key, value) => {
        setreturnData({...returnData, [key]: value});
    };
    const handleFileUpload = (formData) => {
        handleReturnData("files", formData)
    };

    const handleSubmit = async () => {
        const values = await form.validateFields();
        try {
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
                      <div className="flex p-4 gap-2 pr-6  items-center px-2 justify-between">
                          <div
                              className="flex items-center font-medium text-neutral-600 cursor-pointer"
                              onClick={() => navigate(-1)}
                          >
                              <ArrowBackIosOutlinedIcon
                                  sx={{fontSize: 20}}
                                  color="rgb(212,212,212)"
                              ></ArrowBackIosOutlinedIcon>
                              <div className="text-base"> Trở lại</div>
                          </div>

                          <div className="flex items-center font-medium text-neutral-600 gap-2">
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
                      <div className="flex justify-between m-2.5 items-center px-6">
                          <div className="text-left text-sm font-semibold mt-4 ">
                              Thông tin yêu cầu trả hàng
                          </div>

                      </div>
                      <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                          <div className="mr-auto w-9/12  items-center">

                                  <Form form={form} >
                                      <Form.Item
                                          name="return_reason"
                                          label="Lí do"
                                          rules={[
                                              {
                                                  required: true,
                                                  message: 'Hãy điền lí do yêu cầu trả sản phẩm!',
                                                  whitespace: true,
                                              },
                                          ]}
                                      >
                                          <Input
                                              onChange={(e) => handleReturnData('return_reason', e.target.value)}
                                              placeholder="Lí do"/>
                                      </Form.Item>


                                      <Form.Item
                                          name="main_image"
                                          label="Các hình ảnh liên quan "
                                          style={{textAlign: "left"}}
                                          rules={[
                                              {
                                                  required: false,
                                                  message: 'Hãy tải lên hình ảnh minh chứng!',
                                              },
                                          ]}
                                      >
                                          <FileUpload length={16} onGetFormData={handleFileUpload}/>
                                      </Form.Item>

                                      <Form.Item>
                                          <button
                                              type="primary"
                                              onClick={handleSubmit}
                                              className="p-2 px-6 py-2 float-right bg-orange-500 rounded text-white border-gray-400 border-none text-sm  font-semibold focus:outline-0">
                                              Trả hàng
                                          </button>
                                      </Form.Item>

                                  </Form>
                          </div>

                      </div>
                  </div>
              </div>
          </MainLayOut>
      </>
  )
}
export default ReturnProduct
