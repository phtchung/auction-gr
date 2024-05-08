const Search = () => {
  return(
      <>
          <div className="header_container z-50 mx-[-9.54rem] bg-orange-500 opacity-90 border border-t-amber-50"
               style={{marginTop: '4rem'}}>
              <div className="container">
                  <div className=" lg:w-7/12 md:w-6/12 my-8   mx-auto">
                      <form className="">
                          <label htmlFor="default-search"
                                 className="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white">Tìm
                              kiếm</label>
                          <div className="relative">
                              <div
                                  className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                      <path stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                  </svg>
                              </div>
                              <input type="search" id="default-search"
                                     className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-600 focus:border-orange-500 "
                                     placeholder="Tìm kiếm..." required/>
                              <button type="submit"
                                      className="text-white absolute end-2.5 bottom-2 bg-orange-500 hover:bg-orange-600 focus:ring-1 hover:border-orange-500 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">Tìm
                                  kiếm
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Search
