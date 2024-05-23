import {daysRemaining, formatMoney} from "../../Utils/constant.js";
import {ClockCircleOutlined} from "@ant-design/icons";
import {Card} from "antd";

const CardItem4Line = ({data}) => {
  return(
      <>
          <Card
              className="card-hover_home"
              size="small"
              hoverable
              bordered={false}
              style={{width: '100%', borderRadius: 8,padding:4, minHeight: 236}}
              cover={<img alt="example" style={{
                  width: '100%',
                  height: '163.84px',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',

              }}
                          src={data.main_image}/>}
          >
              <div className="flex flex-col text-left py-0.5 px-1 gap-y-0.5">
                  <div
                      className="truncate text-sm font-sans font-semibold leading-6 hover:text-orange-300 ">{data?.product_name}
                  </div>
                  <div className="flex flex-row items-center gap-1 overflow_css">
                      <div
                          className="text-neutral-500 hover:text-neutral-700 "
                          style={{fontSize: 12}}>Hiện
                          tại :
                      </div>
                      <div
                          className="text-red-700 mb-1 font-semibold hover:text-red-500 "
                          style={{fontSize: 16}}> {formatMoney(data?.final_price)} đ
                      </div>
                  </div>
                  <div className="flex flex-row items-center gap-1 overflow_css">
                      <div
                          className="text-neutral-500 hover:text-neutral-700 "
                          style={{fontSize: 12}}>Vận chuyển:
                      </div>
                      <div
                          className=" mb-0.5  "
                          style={{fontSize: 12}}> {formatMoney(data?.shipping_fee)} đ
                      </div>
                  </div>
                  <div className="flex flex-row items-center gap-5 pb-0.5">
                      <div className="flex flex-row items-center gap-1 ">
                          <div><img
                              src="https://s.yimg.jp/images/auc/pc/search/image/2.0.1/icon_hammer.svg"
                              alt=""/></div>
                          <span>{data?.bidCount}</span>
                      </div>

                      <div className="flex flex-row items-center gap-1 ">
                          <div><ClockCircleOutlined/></div>
                          <span>{daysRemaining(data?.finish_time)}  </span>
                      </div>

                  </div>
              </div>
          </Card>
      </>
  )
}
export default CardItem4Line
