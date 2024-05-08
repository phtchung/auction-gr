import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import { ArrowLeftOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import useBlogDetail from "./useBlogDetail.jsx";
const BlogDetail = () => {
    const {isLoading , isSuccess , blogData} = useBlogDetail()
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(-1)
        window.scroll(0,0)
    }
  return(
      <>
      <MainLayOut>
          <div className="md:container mt-24">
              {
                  isSuccess && <>
                      <div className="flex flex-col gap-3 mt-8 mx-8 mb-8 font_fml">
                          <div>
                              <img src={blogData?.image}
                                   className="w-full mb-4 bg-no-repeat overflow-hidden bg-cover " style={{height:'40rem'}} alt=""/>
                          </div>
                          <div className="text-2xl uppercase font-bold mb-6 text-center" style={{color: '#f7851c'}}>
                              {blogData?.title}
                          </div>
                          <div className="text-lg font-semibold opacity-80 text-left ">
                              {blogData?.subtitle1}
                          </div>
                          <div className="text-left opacity-80 font-normal my-1">
                              {blogData?.subtitle2}
                          </div>
                          <div className="text-left opacity-70 leading-6 font-normal">
                              {blogData?.content}
                          </div>
                          <div className="text-center pt-10 block">
                              <button
                                  onClick={handleNavigate}
                                  className="p-2 px-10 text-base font-semibold font_fml   right-0  bg-orange-400 rounded cursor-pointer text-white border-gray-400 border-none  focus:outline-0">
                                  <ArrowLeftOutlined className="pr-2"/>
                                  Quay trở lại
                              </button>
                          </div>
                      </div>
                  </>
              }
          </div>
      </MainLayOut>
      </>
  )
}
export default BlogDetail
