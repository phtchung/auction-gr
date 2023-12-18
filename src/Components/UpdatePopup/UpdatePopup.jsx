import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";

const UpdatePopup = ({state}) => {

    const [open1,openchange1]=useState(false);
    const openPopup1=()=>{
        openchange1(true);
    }
    const closePopup1=()=>{
        openchange1(false);
    }
  return(
      <>
          <div className="flex justify-between m-2.5 items-center px-2">
              <div className="text-left text-base font-medium ">Update State</div>
          </div>

          <div className="items-center text-left mt-4 mb-10 mx-8 px-1 space-y-6 ">
              {
                  state && state === 5 &&
                  <>
                      <div className="text-xs col-span-6">
                      Chuyển sang trạng thái đã xác nhận thông tin người chiến thắng ?
                      </div>
                  </>
              }
              {
                  state && state === 6 &&
                  <>
                      <div className="text-xs col-span-6">
                          Chuyển sang trạng thái bắt đầu giao hàng ?
                      </div>
                  </>
              }

              <button
                  onClick={openPopup1}
                  className="bg-black text-sm p-1.5 rounded text-white hover:bg-neutral-600 border-none font-medium focus:outline-0">
                  Cập nhật
              </button>
              <Dialog
                  open={open1} onClose={closePopup1} maxWidth='xs'>
                  <DialogTitle>
                      <span className="font-semibold text-sm">Cập nhật trạng thái</span>
                      <div className="border-b-2 mt-2  border-gray-300"></div>
                  </DialogTitle>
                  <DialogContent>
                      <Stack spacing={2} margin={1}>
                          <div className="flex-col items-center text-center">
                              {
                                  state && state === 5 &&
                                  <>
                                      <div className='text-sm'>Bạn chắc chắn muốn chuyển sang trạng thái đã xác nhận
                                          thông tin giao hàng ?
                                      </div>
                                  </>
                              }

                              {
                                  state && state === 6 &&
                                  <>
                                      <div className='text-sm p-0'>Bạn chắc chắn muốn chuyển sang trạng thái bắt đầu giao hàng ?
                                      </div>
                                  </>
                              }
                          </div>
                          <div className="flex gap-4 justify-end mt-1  text-sm ">
                              <button onClick={closePopup1}
                                      className="bg-red-600 p-2 rounded
                                                 text-white hover:bg-red-400 border-none font-medium focus:outline-0">
                                  Không
                              </button>
                              <button
                                  onClick={closePopup1}
                                  className="bg-black p-2 rounded text-white hover:bg-green-600 border-none font-medium focus:outline-0">
                                  Cập nhật
                              </button>
                          </div>
                      </Stack>
                  </DialogContent>
              </Dialog>
          </div>
      </>
  )
}

export default UpdatePopup
