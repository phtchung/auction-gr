import SideBar from "../../Components/SideBar/index.jsx";
import "./home.css"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {pending, tabData} from "../../Utils/constant.js";
import {Box, Tab,
} from "@mui/material";
import { useState} from "react";
import TabItem from "../../Components/TabItem/TabItem.jsx";
import ListApprove from "../../Components/ListApprove/ListApprove.jsx";
import ListPending from "../../Components/ListPending/ListPending.jsx";
import ListBidding from "../../Components/ListBidding/ListBidding.jsx";
import ListSuccess from "../../Components/ListSuccess/ListSuccess.jsx";
import ListFailure from "../../Components/ListFailure/ListFailure.jsx";
import ListConfirm from "../../Components/ListConfirm/ListConfirm.jsx";
import ListDeparture from "../../Components/ListDeparture/ListDeparture.jsx";
import ListCompletion from "../../Components/ListCompletion/ListCompletion.jsx";
import ListCancel from "../../Components/ListCancel/ListCancel.jsx";
import ListReject from "../../Components/ListReject/ListReject.jsx";
import Header from "../../Components/Header/header.jsx";

const ReqOrderTracking = () => {

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <>
        <Header/>
     <div className="wrapper" >
         <SideBar></SideBar>
         <div className="home-right ">
             <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">Quản Lý Đơn Bán</div>
             <div className="border-b border-neutral-700 " ></div>
             <div className="flex items-center font-normal justify-center pt-10 flex-wrap  ">

                 {
                     value && <TabContext value={value}>
                         <Box>
                             <TabList onChange={handleChange} aria-label="lab API tabs example">
                                 <Tab
                                     key={tabData[0].value}
                                     wrapped
                                     label={
                                         <TabItem data={pending} count={pending.count}></TabItem>
                                     }
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
                                             margin: "0", padding: "0", borderBottom: "0", textTransform: "none",
                                         },
                                     }}
                                 />
                                 <Tab
                                     label={
                                         <TabItem data={tabData[0]} count={tabData[0].count}></TabItem>}
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
                                         <TabItem data={tabData[1]} count={tabData[1].count}></TabItem>}
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
                                         <TabItem data={tabData[2]} count={tabData[2].count}></TabItem>}
                                     value='4'
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
                                         <TabItem data={tabData[3]} count={tabData[3].count}></TabItem>}
                                     value="5"
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
                         <Box>
                             <TabList onChange={handleChange} aria-label="lab API tabs example">
                                 <Tab
                                     label={
                                         <TabItem data={tabData[4]} count={tabData[4].count}></TabItem>
                                     }
                                     value="6"
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
                                         <TabItem data={tabData[5]} count={tabData[5].count}></TabItem>}
                                     value="7"
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
                                         <TabItem data={tabData[6]} count={tabData[6].count}></TabItem>}
                                     value="8"
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
                                         <TabItem data={tabData[7]} count={tabData[7].count}></TabItem>}
                                     value="9"
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
                                         <TabItem data={tabData[8]} count={tabData[8].count}></TabItem>}
                                     value="10"
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
                             </TabList>
                         </Box>
                         <TabPanel  value='1' sx={{width: '96%'}}>
                             <ListPending/>
                         </TabPanel>
                         <TabPanel value='2' sx={{width: '96%'}}>
                             <ListApprove/>
                         </TabPanel>
                         <TabPanel value='3' sx={{width: '96%'}}>
                             <ListBidding/>
                         </TabPanel>
                         <TabPanel value='4' sx={{width: '96%'}}>
                             <ListSuccess/>
                         </TabPanel>
                         <TabPanel value='5' sx={{width: '96%'}}>
                             <ListFailure/>
                         </TabPanel>
                         <TabPanel value='6' sx={{width: '96%'}}>
                             <ListConfirm/>
                         </TabPanel>
                         <TabPanel value='7' sx={{width: '96%'}}>
                             <ListDeparture/>
                         </TabPanel>
                         <TabPanel value='8' sx={{width: '96%'}}>
                             <ListCompletion/>
                         </TabPanel>
                         <TabPanel value='9' sx={{width: '96%'}}>
                             <ListCancel/>
                         </TabPanel>
                         <TabPanel value='10' sx={{width: '96%'}}>
                             <ListReject/>
                         </TabPanel>

                     </TabContext>
                 }


             </div>

         </div>
     </div>

    </>
  )
};

export default ReqOrderTracking;
