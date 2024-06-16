import {CheckOutlined} from "@ant-design/icons";

const CardDeposit = ({level , price,deposit, select}) => {
    const handleClick = () => {
      select({level,price,deposit})
    }
  return(
      <>
          <div
              className="bg-white card-hover_home flex text-sm flex-col rounded-md space-y-2 font-medium text-neutral-600">
              <div className="bg-orange-200 rounded-md p-3">Mức {level}</div>
              <div className="p-3 px-4">
                  <div className="text-left mb-3">Đăng ký ngay để nhận
                      quyền lợi:
                  </div>
                  <div className="space-y-1.5 mb-6">
                      <div className="flex flex-row gap-1 ">
                          <CheckOutlined style={{
                              fontSize: '14px',
                              color: '#f15502'
                          }}/>
                          <div> Tham gia phiên đấu giá <span className="text-orange-500">{price}</span>
                          </div>
                      </div>
                      <div className="flex flex-row gap-2 ">
                          <CheckOutlined style={{
                              fontSize: '14px',
                              color: '#f15502'
                          }}/>
                          <div> Hoàn cọc bất kỳ lúc nào bạn muốn</div>
                      </div>
                  </div>
                  <div
                      onClick={handleClick}
                      className="bg-orange-400 text-white text-base active:bg-orange-700 cursor-pointer rounded-md hover:bg-orange-600 p-3">
                      {deposit},000 VNĐ
                  </div>
              </div>
          </div>
      </>
  )
}
export default CardDeposit
