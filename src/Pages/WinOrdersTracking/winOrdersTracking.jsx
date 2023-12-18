
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { tabData1} from "../../Utils/constant.js";
import {Box, Tab,} from "@mui/material";
import { useState} from "react";
import TabItem from "../../Components/TabItem/TabItem.jsx";
import ListAuctionWinning from "../../Components/ListAuctionWinning/listAuctionWinning.jsx";
import ListDeliveryWait from "../../Components/ListDeliveryWait/listDeliveryWait.jsx";
import ListCompletion from "../../Components/ListCompletion/ListCompletion.jsx";
import ListCancel from "../../Components/ListCancel/ListCancel.jsx";
import SideBar from "../../Components/SideBar/index.jsx";

const WinOrdersTracking = () => {

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="wrapper" >
                <SideBar></SideBar>
                <div className="home-right ">
                    <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">Quản Lý Đơn Thắng Đấu giá</div>
                    <div className="border-b border-neutral-700 " ></div>
                    <div className="flex items-center font-normal justify-center pt-10 flex-wrap  ">

                        {
                            value && <TabContext value={value}>
                                <Box>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">

                                        <Tab
                                            label={
                                                <TabItem data={tabData1[0]} count={tabData1[0].count}></TabItem>}
                                            value='1'
                                            sx={{
                                                "&.Mui-selected": {
                                                    margin: "0",
                                                    padding: "0",
                                                    borderBottom: "none",
                                                    textTransform: "none",
                                                    color: "gray",
                                                    backgroundColor: "rgb(226 232 240)"
                                                },
                                                "&:not(.Mui-selected)": {
                                                    margin: "0", padding: "0", borderBottom: "0", textTransform: "none"
                                                },
                                            }}
                                        />
                                        <Tab
                                            label={
                                                <TabItem data={tabData1[1]} count={tabData1[1].count}></TabItem>}
                                            value='2'
                                            sx={{
                                                "&.Mui-selected": {
                                                    margin: "0",
                                                    padding: "0",
                                                    borderBottom: "none",
                                                    textTransform: "none",
                                                    color: "gray",
                                                    backgroundColor: "rgb(226 232 240)"
                                                },
                                                "&:not(.Mui-selected)": {
                                                    margin: "0", padding: "0", borderBottom: "0", textTransform: "none"
                                                },
                                            }}
                                        />
                                        <Tab
                                            label={
                                                <TabItem data={tabData1[2]} count={tabData1[2].count}></TabItem>}
                                            value='3'
                                            sx={{
                                                "&.Mui-selected": {
                                                    margin: "0",
                                                    padding: "0",
                                                    borderBottom: "none",
                                                    textTransform: "none",
                                                    color: "gray",
                                                    backgroundColor: "rgb(226 232 240)"
                                                },
                                                "&:not(.Mui-selected)": {
                                                    margin: "0", padding: "0", borderBottom: "0", textTransform: "none"
                                                },
                                            }}
                                        />
                                        <Tab
                                            label={
                                                <TabItem data={tabData1[3]} count={tabData1[3].count}></TabItem>}
                                            value="4"
                                            sx={{
                                                "&.Mui-selected": {
                                                    margin: "0",
                                                    padding: "0",
                                                    borderBottom: "none",
                                                    textTransform: "none",
                                                    color: "gray",
                                                    backgroundColor: "rgb(226 232 240)"
                                                },
                                                "&:not(.Mui-selected)": {
                                                    margin: "0", padding: "0", borderBottom: "0", textTransform: "none"
                                                }
                                            }}
                                        />
                                    </TabList>
                                </Box>

                                <TabPanel  value='1' sx={{width: '96%'}}>
                                    <ListAuctionWinning/>
                                </TabPanel>
                                <TabPanel value='2' sx={{width: '96%'}}>
                                    <ListDeliveryWait/>
                                </TabPanel>
                                <TabPanel value='3' sx={{width: '96%'}}>
                                    <ListCompletion/>
                                </TabPanel>
                                <TabPanel value='4' sx={{width: '96%'}}>
                                    <ListCancel/>
                                </TabPanel>
                            </TabContext>
                        }
                    </div>
                </div>
            </div>

        </>
    )
};

export default WinOrdersTracking;
