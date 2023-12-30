import {
    Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack,  TextField,
} from "@mui/material";
import { columns, rows} from "../../Utils/constant.js";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import TableData from "../TableData/TableData.jsx";

const ListPending = () => {

    const [open,openchange]=useState(false);
    const [open1,openchange1]=useState(false);

    const [request,setRequest]= useState(null);

    const handleRequest = (key,value) => {
       setRequest({...request,[key]:value})
        console.log(request)
    }
    const rankItems = [
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
    ];

    const openPopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }
    const openPopup1=()=>{
        openchange1(true);
    }
    const closePopup1=()=>{
        openchange1(false);
    }

    return(
        <>
            <div className="border border-gray-300">

                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                    <div className="text-left font-medium  ">
                        List - Pending
                    </div>
                        <div style={{textAlign: 'center'}}>
                            <button onClick={openPopup}
                                    className="p-2 rounded bg-neutral-900  text-white border-gray-400 hover:bg-neutral-600 text-sm  font-medium focus:outline-0">
                                Create Request
                            </button>

                            <Dialog
                                open={open} onClose={closepopup} fullWidth maxWidth="md">
                                <DialogTitle>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-base">Create Request</span>
                                        <div onClick={closepopup}
                                             className="bg-black rounded cursor-pointer text-base text-white hover:bg-neutral-600 border-none font-medium focus:outline-0">
                                            <CloseIcon></CloseIcon>
                                        </div>
                                    </div>

                                    <div className="border-b-2 mt-2  border-gray-300"></div>
                                </DialogTitle>
                                <DialogContent>
                                    <Stack spacing={2} margin={1}>
                                        <div className="text-sm font-semibold">
                                            Product Information
                                        </div>
                                        <div className="flex justify-between items-center gap-6">
                                            <TextField id="filled-basic" fullWidth sx={{maxWidth: 690}}
                                                       color="info"
                                                       onChange={(e) => handleRequest("product_name", e.target.value)}
                                                       label="Product Name" size="small" variant="filled"/>
                                            <FormControl size="small" variant="filled" sx={{minWidth: 200}}>
                                                <InputLabel
                                                    id="demo-simple-select-filled-label">Rank</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                >
                                                    {rankItems.map((item) => (
                                                        <MenuItem key={item.value} value={item.value} onClick={() => handleRequest('rank',item.value)}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <FormControl size="small" variant="filled" sx={{m: 1, maxWidth: 405}}>
                                            <InputLabel
                                                id="demo-simple-select-filled-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                            >
                                                <MenuItem value={10}>S</MenuItem>
                                                <MenuItem value={20}>A</MenuItem>
                                                <MenuItem value={30}>B</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <div className="text-base font-semibold">
                                            Product Price
                                        </div>
                                        <div className="flex justify-between items-center gap-6">
                                            <TextField size="small" id="filled-basic" fullWidth
                                                       color="info"
                                                       label="Sale Price" variant="filled"/>
                                            <TextField size="small" id="filled-basic" fullWidth
                                                       color="info"
                                                       label="Reverse Price" variant="filled"/>
                                            <TextField size="small" id="filled-basic" fullWidth
                                                       color="info"
                                                       label="Step Price" variant="filled"/>
                                            <TextField size="small" id="filled-basic" fullWidth
                                                       color="info"
                                                       label="Shipping Fee" variant="filled"/>
                                        </div>
                                        <div className="text-base font-semibold">
                                            Product Image
                                        </div>
                                        <div className="text-base font-semibold">
                                            Product Description
                                        </div>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            size="small"
                                            label="Description"
                                            variant="filled"
                                            maxRows={8}
                                        />
                                        <div className="flex gap-4 justify-end my-2">
                                            <button onClick={closepopup}
                                                    className="bg-red-500 text-base text-white hover:bg-red-400 border-none font-medium focus:outline-0">
                                                Cancel
                                            </button>
                                            <button
                                                onClick={openPopup1}
                                                className="bg-black text-base text-white hover:bg-neutral-600 border-none font-medium focus:outline-0">
                                                Submit
                                            </button>
                                        </div>
                                    </Stack>
                                </DialogContent>
                            </Dialog>
                        </div>


                </div>

                {/* Dialog confirm */}
                <Dialog
                    open={open1} onClose={closePopup1} maxWidth='xs'>
                    <DialogTitle>
                        <span className="font-semibold text-base">Request Confirm</span>
                        <div className="border-b-2 mt-2  border-gray-300"></div>
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} margin={1}>
                            <div className="flex-col items-center text-center">
                                <TaskAltIcon color="success" fontSize='large'></TaskAltIcon>
                                <div className="text-xl font-semibold mt-3">
                                    Are you sure
                                </div>
                                <div className='text-base'>you want to create a request to sell a product
                                    ?
                                </div>
                            </div>

                            <div className="flex gap-4 justify-end mt-1 ">
                                <button onClick={closePopup1}
                                        className="bg-red-600  text-base text-white hover:bg-red-400 border-none font-medium focus:outline-0">
                                    No
                                </button>
                                <button
                                    onClick={closePopup1}
                                    className="bg-green-800 text-base text-white hover:bg-green-600 border-none font-medium focus:outline-0">
                                    Yes
                                </button>
                            </div>
                        </Stack>
                    </DialogContent>
                </Dialog>

                <div className="border-b-2 border-gray-300 "></div>
                <TableData cols={columns} rows={rows}></TableData>
            </div>
        </>
    )
}

export default ListPending;
