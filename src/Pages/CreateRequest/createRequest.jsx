import {Form, Input, InputNumber, Select} from "antd";
import {useState} from "react";
import SideBar from "../../Components/SideBar/index.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import FileUpload from "../../Components/UploadFile/uploadFile.jsx";
import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt.js";
import {toast} from "react-toastify";
import {sendRequest} from "../../Services/requestService.jsx";
import {useMutation} from "@tanstack/react-query";

const {Option} = Select;
const CreateRequest = () => {
    const [form] = Form.useForm();
    const [request, setRequest] = useState(null);
    const [open1, openchange1] = useState(false);

    const handleRequest = (key, value) => {
        setRequest({...request, [key]: value});
    };
    const handleFileUpload = (formData) => {
        handleRequest("files", formData)
    };
    const handleSingleFileUpload = (formData) => {
        handleRequest("singlefile", formData)
    }

    const handleSubmit = async () => {
        const values = await form.validateFields();
        openchange1(true);
    }

    const {mutate, isError, isPending} = useMutation({
        mutationFn: async (request) => {
            try {
                const res = await sendRequest({...request});
                const data = res.data
                return data;
            } catch (error) {
                console.log(error.response.data);
                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success("Gửi yêu cầu thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
            });
            window.location.href = '/reqOrderTracking'
            openchange1(false)
            setRequest(null);
        },
        onError: (error) => {
            toast.error(`${error.response.data.message}`)
        }
    });

    const handleSendRequest = () => {
        mutate(request)
    };

    return (
        <>
            <MainLayOut>
                <div className="wrapper ">
                    <SideBar/>

                    <div className="home-right">
                        <div className="">
                            <div className="text-left px-5 pt-3 pb-3 text-xl  font-bold text-neutral-600  bg-white">
                                Tạo yêu cầu đấu giá
                            </div>

                            <div className="border-b-2 border-gray-300"></div>
                            <div className="m-8">
                                <Form
                                    form={form}
                                    onFinish={(values) => {
                                        console.log({values})
                                    }}
                                    onFinishFailed={(failedValues) => {
                                        console.log({failedValues})
                                    }}
                                    scrollToFirstError
                                >

                                    <div className="lg:grid-cols-1 md:grid-cols-1 grid ">
                                        <Form.Item
                                            name="product_name"
                                            label="Tên sản phẩm"
                                            className="font-semibold lg:mr-28"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền tên sản phẩm!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 560,
                                                }}
                                                onChange={(e) => handleRequest('product_name', e.target.value)}
                                                placeholder="Tên sản phẩm"/>
                                        </Form.Item>
                                    </div>

                                    <div className="lg:grid-cols-2 md:grid-cols-1 grid">
                                        <Form.Item
                                            name="auction_live"
                                            label="Hình thức đấu giá"
                                            hasFeedback
                                            required
                                            className="font-semibold"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền hình thức đấu giá!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                onChange={(value) => handleRequest('auction_live', value)}
                                                placeholder="Hình thức đấu giá"
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 230,
                                                }}
                                            >
                                                <Option value="1">Đấu giá trực tuyến</Option>
                                                <Option value="0">Đấu giá thông thường</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="delivery_from"
                                            label="Nơi gửi sản phẩm"
                                            className="font-semibold -mr-5"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Điền nơi gửi sản phẩm!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 230,
                                                }}
                                                onChange={(e) => handleRequest('delivery_from', e.target.value)}
                                                placeholder="Nơi gửi sản phẩm "/>
                                        </Form.Item>
                                    </div>

                                    <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                        <Form.Item
                                            name="rank"
                                            label="Chất lượng sản phẩm"
                                            className="font-semibold mr-5"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền chất lượng của sản phẩm',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 230,
                                                }}
                                                onChange={(value) => handleRequest('rank', value)}
                                                placeholder="Chất lượng sản phẩm">
                                                <Option value="S">S (Superior, chất lượng trên 90% )</Option>
                                                <Option value="A">A (Excellent, chất lượng trên 80%) </Option>
                                                <Option value="B">B (Good, chất lượng trên 70%)</Option>
                                                <Option value="C">C (Fair, chất lượng trên 60%)</Option>
                                                <Option value="D">D (Poor, chất lượng trên 50%)</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="brand"
                                            label="Thương hiệu sản phẩm"
                                            className="font-semibold"
                                        >
                                            <Input
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 230,
                                                }}
                                                onChange={(e) => handleRequest('brand', e.target.value)}
                                                placeholder="Thương hiệu "/>
                                        </Form.Item>
                                    </div>

                                    <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                        <Form.Item
                                            name="is_used"
                                            label="Tình trạng sản phẩm"
                                            className="font-semibold mr-3"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền tình trạng sản phẩm',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                onChange={(value) => handleRequest('is_used', value)}
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 230
                                                }}
                                                placeholder="Tình trạng sản phẩm">
                                                <Option value="0">Chưa sử dụng</Option>
                                                <Option value="1">Đã sử dụng</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="can_return"
                                            label="Có thể trả sản phẩm"
                                            className="font-semibold -mr-2"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền khả năng trả lại sản phẩm',
                                                },
                                            ]}
                                        >
                                            <Select
                                                onChange={(value) => handleRequest('can_return', value)}
                                                style={{
                                                    textAlign: "left",
                                                    maxWidth: 230
                                                }}
                                                placeholder="Trả sản phẩm">
                                                <Option value="0">Không</Option>
                                                <Option value="1">Có thể</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>


                                    <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                        <Form.Item
                                            name="reserve_price"
                                            label="Giá khởi điểm"
                                            className="font-semibold lg:-mr-8"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền giá khởi điểm!',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Giá khởi điểm"
                                                onChange={(value) => handleRequest('reserve_price', value)}
                                                suffix="VNĐ"
                                                style={{
                                                    width: '100%',
                                                    borderRadius: 0,
                                                    maxWidth: 230
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="step_price"
                                            label="Bước giá"
                                            className="font-semibold lg:-mr-20"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền bước giá!',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Bước giá"
                                                onChange={(value) => handleRequest('step_price', value)}
                                                suffix="VNĐ"
                                                style={{
                                                    width: '100%',
                                                    maxWidth: 230,
                                                    borderRadius: 0,
                                                }}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                        <Form.Item
                                            name="shipping_fee"
                                            label="Phí vận chuyển"
                                            className="font-semibold -mr-6"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền phí vận chuyển sản phẩm!',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Phí vận chuyển"
                                                onChange={(value) => handleRequest('shipping_fee', value)}
                                                suffix="VNĐ"
                                                className="xl:w-full lg:w-10/12"
                                                style={{
                                                    width: '100%',
                                                    maxWidth: 230,
                                                    borderRadius: 0,
                                                }}
                                            />
                                        </Form.Item>

                                        {
                                            request?.auction_live === '0' &&
                                            <Form.Item
                                                name="sale_price"
                                                label="Giá bán trực tiếp"
                                                className="font-semibold lg:-mr-8"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Hãy điền giá bán trực tiếp!',
                                                    },
                                                    ({getFieldValue}) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('reserve_price') < value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('Giá bán trực tiếp phải lớn hơn giá khởi điểm!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input
                                                    style={{

                                                        maxWidth: 230,
                                                        borderRadius: 0,
                                                    }}
                                                    placeholder="Giá bán trực tiếp"
                                                    onChange={(e) => handleRequest('sale_price', e.target.value)}
                                                    suffix="VNĐ"/>
                                            </Form.Item>
                                        }
                                    </div>

                                    <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                        <Form.Item
                                            name="main_image"
                                            label="Hình ảnh sản phẩm"
                                            className="font-semibold "
                                            style={{textAlign: "left"}}
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                          <span className="lg:ml-14">
                                            <FileUpload length={1} onGetFormData={handleSingleFileUpload}/>
                                          </span>
                                        </Form.Item>

                                        <Form.Item
                                            name="rl_image"
                                            label="Các hình ảnh liên quan "
                                            className="font-semibold"
                                            style={{textAlign: "left"}}
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Hãy điền các hình ảnh liên quan!',
                                                },
                                            ]}
                                        >
                                          <span className="lg:ml-11">
                                          <FileUpload length={16} onGetFormData={handleFileUpload}/>
                                          </span>
                                        </Form.Item>
                                    </div>

                                    <div>
                                        <Form.Item
                                            name="description"
                                            required
                                            label="Mô tả sản phẩm"
                                            className="font-semibold -mr-2"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy điền mô tả sản phẩm!',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                style={{width: '86%'}}
                                                className="font-semibold -mr-2"
                                                placeholder="Mô tả sản phẩm"
                                                onChange={(e) => handleRequest('description', e.target.value)}
                                                maxLength={290}/>
                                        </Form.Item>
                                    </div>

                                    <Form.Item>
                                        <button
                                            type="primary"
                                            onClick={handleSubmit}
                                            className="px-6 mt-3 right-0 bg-orange-500 rounded text-white border-none text-sm hover:bg-orange-600 font-semibold focus:outline-0">
                                            Xác nhận
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>

                        {/* Dialog confirm */}
                        <Dialog open={open1} onClose={() => openchange1(!open1)} maxWidth="xs">
                            <DialogTitle>
                              <span className="font-semibold text-base text-neutral-600">
                                Xác nhận gửi yêu cầu
                              </span>
                                <div className="border-b-2 mt-1 border-gray-300"></div>
                            </DialogTitle>
                            <DialogContent>
                                <Stack spacing={2} margin={0}>
                                    <div className="flex-col items-center text-center">
                                        <TaskAltIcon style={{color: 'orange'}} fontSize="large"></TaskAltIcon>
                                        <div className="text-base font-medium text-neutral-600 mt-4">
                                            Bạn có chắc chắn muốn gửi yêu cầu không ?
                                        </div>
                                    </div>

                                    <div className="flex gap-4 justify-end mt-1 ">
                                        <button
                                            disabled={isPending}
                                            onClick={() => openchange1(!open1)}
                                            className={`${!isPending ? 'bg-white hover:bg-orange-50 border-orange-500 hover:border-orange-500' : 'opacity-60 cursor-no-drop'} px-6 right-0 bg-white rounded text-orange-500   
                                          text-sm  font-semibold focus:outline-0`}>
                                            Hủy
                                        </button>

                                        {
                                            isPending ?
                                                <>
                                                    <button type="button"
                                                            onClick={handleSendRequest}
                                                            className="flex opacity-75 items-center rounded-md bg-orange-500 hover:border-orange-500 px-6 text-white"
                                                            disabled>
                                                        <svg
                                                            className="mr-3 h-5 w-5 animate-spin text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24">
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12" cy="12" r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"></circle>
                                                            <path className="opacity-75"
                                                                  fill="currentColor"
                                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span
                                                            className="font-medium text-sm"> Hoàn thành... </span>
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button
                                                        onClick={handleSendRequest}
                                                        className=" px-6 right-0 bg-orange-500 rounded text-white border-gray-400 border-none text-sm hover:bg-orange-600 focus:outline-0">
                                                        Hoàn thành
                                                    </button>
                                                </>
                                        }
                                    </div>
                                </Stack>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </MainLayOut>
        </>
    )
}

export default CreateRequest
