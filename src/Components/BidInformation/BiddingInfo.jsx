

const BiddingInfo = ({data}) => {


  return(
      <>
        <div className="flex justify-between m-2.5 items-center px-2">
          <div className="text-left text-sm font-semibold ">Bidding Information</div>
        </div>

        <div className="items-center gap-6 font-medium my-8 mx-8 px-1 text-xs space-y-6 ">

          <div className="grid grid-cols-6 text-left">
            <div> Type of auction :</div>
            <div className="font-normal  col-span-2"> {data.type_of_auction === 1 ? 'Đấu giá tăng' : "Đấu giá giảm "}</div>
          </div>

          <div className="grid grid-cols-6 text-left">
            <div> Bidding Start Time :</div>
            <div className="font-normal  col-span-2"> {data.start_time}</div>
            <di> Bidding Finish Time :</di>
            <div className="font-normal col-span-2"> {data.finish_time}</div>
          </div>

          {
            data.status!== undefined && data.status !== 2 && data.status !== 3 && data.status !== 10 && data.status !== 11 &&
              <>
                <div className="grid grid-cols-6 text-left">
                  <div> Giá trúng thầu :</div>
                  <div className="font-normal  col-span-2"> 1.600.000 VND</div>
                  <di> Thời gian trúng thầu :</di>
                  <div className="font-normal col-span-2"> 2023-09-11 15:03:21</div>
                </div>

                <div className="grid grid-cols-6 text-left">
                  <div> Tổng tiền :</div>
                  <div className="font-normal col-span-2"> 1.630.000 VND</div>
                  <div> Tổng tiền thực nhận :</div>
                  <div className="font-normal  col-span-2"> 1.470.000 VND</div>
                </div>

                <div className="grid grid-cols-6 text-left">
                  <div> Người trúng thầu :</div>
                  <div className="font-normal col-span-2"> Phạm Huy Hùng</div>
                  <div> Phone Number :</div>
                  <div className="font-normal col-span-2"> 0971751699</div>
                </div>
                <div className="grid grid-cols-6 text-left">
                  <div> Địa chỉ :</div>
                  <div className="font-normal col-span-5"> 67a ngõ 128c Đại La, Hai Bà Trưng, Hà Nội</div>
                </div>
                <div className="grid grid-cols-6 text-left">
                  <div> Ghi chú :</div>
                  <div className="font-normal col-span-5"> 67a ngõ 128c Đại La, Hai Bà Trưng, Hà Nội</div>
                </div>
              </>
          }

        </div>
      </>
  )
}

export default BiddingInfo;
