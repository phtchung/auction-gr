const TabItem = ({data , count, onClick,isSelected  }) => {
  return(
      <>
          <div style={{
              backgroundColor: isSelected ? 'rgb(203 213 225)' : 'white',
          }} onClick={onClick}
              className="flex-col cursor-pointer m-3 border-2 border-gray-300 w-44 text-left relative bg-gray-200">
              <div className=" px-3 leading-8 text-sm text-gray-600 ">
                  {data.name}
              </div>
              <div className="border-b border-gray-400"></div>
              <div className="font-semibold bg-slate-50 px-3 text-2xl">{count}</div>
              <div
                  className={`absolute -right-2 -top-2 text-white text-xs font-light rounded-md px-1 ${data.color}`}>
                  {data.top}
              </div>

          </div>

      </>
  )
}

export default TabItem;
