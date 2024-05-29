const RejectInfo = ({data}) => {
    return (
        <>
            <div className="items-center font-medium text-sm gap-6  my-5 px-1 lg:space-y-5  min-[225px]:space-y-3">
                <div className="grid grid-cols-6 text-left">
                    <div className="min-[100px]:col-span-6 md:col-span-1"> Thời gian từ chối
                    </div>
                    <div className="font-normal  min-[100px]:col-span-6  md:col-span-5">
                        {data?.reject_time}</div>
                </div>

                <div className="grid grid-cols-6 text-left">
                    <div className="min-[100px]:col-span-6 md:col-span-1"> Từ chối bởi
                    </div>
                    <div className="font-normal  min-[100px]:col-span-6  md:col-span-5">
                        Quản trị viên
                    </div>
                </div>

                <div className="grid grid-cols-6 text-left">
                    <div className="min-[100px]:col-span-6 md:col-span-1"> Lí do
                    </div>
                    <div className="font-normal  min-[100px]:col-span-6  md:col-span-5">
                        {data?.reason}
                    </div>
                </div>
            </div>
        </>
    );
};
export default RejectInfo;
