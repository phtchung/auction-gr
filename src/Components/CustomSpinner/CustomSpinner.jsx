const CustomSpinner = ({h , w , font }) => {
  return(
      <>
          <div
              className='flex space-x-2 justify-center items-center flex-col gap-2 bg-white h-screen '>
              <div className="flex gap-1">
                  <div style={{width:`${w}px`,height:`${h}px`}} className='bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                  <div style={{width:`${w}px`,height:`${h}px`}} className='bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                  <div style={{width:`${w}px`,height:`${h}px`}} className='bg-orange-500 rounded-full animate-bounce'></div>
              </div>

              <span className={`text-neutral-600 text-${font} font-medium`}>Đang tải...</span>
          </div>
      </>
  )
}
export default CustomSpinner
