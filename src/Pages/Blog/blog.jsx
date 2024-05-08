import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {Card} from "antd";
import useBlog from "./useBlog.jsx";
import {useNavigate} from "react-router-dom";

const Blog = () => {
    const {blogs, isLoading , isSuccess} = useBlog()
    const navigate = useNavigate()
    const handleNavigate = (id) => {
        navigate(`/articles/news/${id}`)
        window.scroll(0,0)
    }
  return(
      <>
          <MainLayOut>
              <div className="md:container mt-24">
                  <h2 className="text-3xl font-medium text-neutral-600">Tin tức mới</h2>
                  <div className="grid md:grid-cols-4 gap-8 sm:grid-cols-2 mx-8 mt-8 mb-4">
                      {
                          blogs && blogs.map((blog, index) => (
                              <>
                                  <div key={index} className="md:basis-1/5  ">
                                      <Card
                                          className="card-hover"
                                          onClick={() => handleNavigate(blog.blog_id)}
                                          size="small"
                                          hoverable
                                          bordered={false}
                                          style={{width: '100%', borderRadius: 8, minHeight: 236}}
                                          cover={<img alt="example" style={{
                                              width: '100%',
                                              height: '10rem',
                                              backgroundSize: 'cover',
                                              borderRadius: '8px 8px 0 0',
                                              backgroundRepeat: 'no-repeat',
                                              overflow: "hidden",
                                          }}
                                                      src={blog?.sub_image}/>}
                                      >
                                          <div className="flex flex-col text-left p-4">
                                              <div
                                                  className="overflow_css_card_206 flex-grow flex-shrink-0 text-base font-semibold mb-1"
                                                  style={{color: '#142F43'}}>{blog?.title}
                                              </div>
                                              <div className="flex flex-row items-center gap-1  overflow_css">
                                                  <div
                                                      className=" text-base opacity-60"
                                                      style={{color: '#142F43'}}> {blog?.release_time}
                                                  </div>
                                              </div>
                                              <div className="border-b border-neutral-200 mt-3">
                                              </div>
                                              <div
                                                  className="font-medium text-base  text-red-600 opacity-80 mt-3 text-center">
                                                  <span className="">Xem thêm</span>
                                              </div>
                                          </div>
                                      </Card>
                                  </div>
                              </>
                          ))
                      }

                  </div>
              </div>
          </MainLayOut>
      </>
  )
}

export default Blog
