import {formatMoney} from "../../Utils/constant.js";
import {Card} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import CountDownDesSmall from "../Clock/countDownDesSmall.jsx";

const CardPreEnd = ({data}) => {
    return (
        <>
            <Card
                size="small"
                hoverable
                bordered={false}
                style={{width: '100%', borderRadius: 0, minHeight: 236}}
                cover={<img alt="example" style={{
                    width: '98%',
                    height: '10rem',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                            src={data.main_image}/>}
            >
                <div style={{backgroundColor: 'rgb(255, 165, 0)'}}
                     className="flex justify-center  gap-1 item-center">
                    <ClockCircleOutlined className="text-white "/>

                    <CountDownDesSmall  targetDate={data?.coutdown_time}></CountDownDesSmall>
                </div>
                <div className="flex flex-col text-left py-1 px-1">
                    <div
                        className="overflow_css_w_158 text-sm font-sans  hover:text-orange-300"
                        style={{lineHeight: '1.3rem'}}>{data?.product_name}
                    </div>
                    <div className="flex flex-row items-center gap-1 overflow_css">
                        <div
                            className="text-neutral-500 hover:text-neutral-700 text-xs">Hiện tại :
                        </div>
                        <div
                            className="text-red-700 text-sm font-semibold hover:text-red-500 "> {formatMoney(data?.final_price)} đ
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
export default CardPreEnd
