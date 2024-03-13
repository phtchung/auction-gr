import { Button, Result } from 'antd';
import {useNavigate} from "react-router-dom";
import MainLayOut from "../Layout/mainLayout.jsx";
const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <MainLayOut>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={() => navigate('/reqOrderTracking')} >Trang chủ</Button>}
        />
        </MainLayOut>
    )

};
export default PageNotFound;
