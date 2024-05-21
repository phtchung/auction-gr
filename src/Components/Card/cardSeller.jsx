import {Avatar, Card} from "antd";
import {StarFilled} from "@ant-design/icons";
import {getColorForLetter, getFirstLetter} from "../../Utils/constant.js";

const CardSeller = ({data}) => {
    return(
        <>
            <Card
                hoverable
                style={{
                    width: 209,
                }}
                actions={[
                    <div className="flex gap-1 justify-center">
                        <span>{data.average_rating}</span>
                        <StarFilled className="text-yellow-500"/>
                    </div>,
                    <div>{data.product_done_count} <span className="text-xs">đơn hàng</span></div>,
                ]}
            >
                <div className="flex flex-row p-2 pb-2 items-center gap-2">
                    <Avatar
                        style={{
                            backgroundColor: getColorForLetter(getFirstLetter(data.name)),
                            verticalAlign: 'middle',
                        }}
                        size='large'
                    >
                        <span className="font-medium text-lg">{getFirstLetter(data.name)}</span>
                    </Avatar>
                    <div
                        className="overflow_css text-neutral-700 text-base font-sans"> {data.name}
                    </div>
                </div>
            </Card>
        </>
    )
}
export default CardSeller
