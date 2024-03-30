import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import {NormalRoutes, UserRoutes} from "./Routes/Routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Pages/Context/RequireAuth.jsx";
import 'react-multi-carousel/lib/styles.css';
import {useEffect, useMemo} from "react";

function App() {
    const queryClient = new QueryClient();
    const userId  = useMemo(() => localStorage.getItem("id"), []);
    useEffect(() => {

        const eventSource = new EventSource('http://localhost:8088/events');

        // có blog được tạo
        eventSource.addEventListener('newBlog', function(event) {
            console.log(event)
            const newBlogData = JSON.parse(event.data);
            console.log('New blog created:', newBlogData);
            toast(`blog ten la vua duoc tao`  )
        });

        // yêu câầu request được phee duyệt
        eventSource.addEventListener(`approveProduct_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`yêu cầu của b vuừa được phê duyệt`  )
        });

        // thoog báo đấu giá thành coonng cho người bán
        eventSource.addEventListener(`auctionSuccess_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        // tb cho người thaắng đấu giá
        eventSource.addEventListener(`buySuccess_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //tb update status đơn hanngf
        eventSource.addEventListener(`updateStatus_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify khi người bán gửi request yêu cầu đấu giá
        eventSource.addEventListener(`sendRequest_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });


        //notify từ chối yêu cầu người dùng từ quản trị viên
        eventSource.addEventListener(`rejectProduct_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify yêu cầu trả đơn hàng của ngưởi thắng đấu giá
        eventSource.addEventListener(`returnProductWinner_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify nhận được yêu cầu trả hàng của ng bán
        eventSource.addEventListener(`returnProductSeller_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify thông báo được duyệt yêu cầu trả hàng cho ng thắng
        eventSource.addEventListener(`acceptReturnWinner_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify nhận được yêu cầu trả hàng của ng bán
        eventSource.addEventListener(`returnProductSeller_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify thông báo từ chối yêu cầu trả hàng cho ng thắng
        eventSource.addEventListener(`denyReturnWinner_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        //notify thông báo sp bị từ chối trả lại
        eventSource.addEventListener(`denyReturnSeller_${userId}`, function(event) {
            const data = JSON.parse(event.data);
            console.log(data)
            toast(`${data.content}` )
        });

        // này là nghe 1 s kiện riêng cho từng user , user nào thì nhét vào là được
        eventSource.addEventListener(`notification-${userId}`, function(event) {
            console.log(event)
            const newBlogData = JSON.parse(event.data);
            toast(`blog ten la vua ${newBlogData.title} duoc tao`  )
        });

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer style={{fontSize:13}}/>
            <BrowserRouter>
                <Routes>
                    {NormalRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                    {UserRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<RequireAuth>{route.element}</RequireAuth>}
                        ></Route>
                    ))}

                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
