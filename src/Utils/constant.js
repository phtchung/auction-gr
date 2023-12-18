

export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const columns = [
    { id: 'time', name: 'Time' },
    { id: 'id', name: 'Request ID' },
    { id: 'name', name: 'Product Name' },
    { id: 'reserve', name: 'Reserve Price' },
    { id: 'sale', name: 'Sale Price' },
    { id: 'rank', name: 'Rank' },
]
export const rows = [
    { id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, sale: 100000,time:'23/07/09 09:05:00', rank:'S',status:1 },
    { id: 2, name: 'John Doe', reserve: 25000, sale: 100000,time:'23/07/09 09:05:00', rank:'S',status:1 },
    { id: 3, name: 'John Doe', reserve: 25000, sale: 100000,time:'23/07/09 09:05:00', rank:'S',status:1 },
    { id: 4, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1 },
    { id: 5, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1 },
    { id: 6, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1 },
    { id: 7, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1},
    { id: 8, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1 },
    { id: 9, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1},
    { id: 10, name: 'Jane Doe', reserve: 30000, sale: 150000,time:1000, rank:'S',status:1 },

];

export const columns1 = [
    { id: 'time', name: 'Thời gian gửi' },
    { id: 'id', name: 'Mã yêu cầu' },
    { id: 'name', name: 'Tên sản phẩm' },
    { id: 'reserve', name: 'Giá khởi điểm' },
    { id: 'bidding_time', name: 'Thời gian đấu giá' },
    { id: 'rank', name: 'Chất lượng' },

]

export const rows1 = [
    { id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, bidding_time: 100000,time:'23/07/09 09:05:00', rank:'S',status:2 },
    { id: 2, name: 'John Doe', reserve: 25000, bidding_time: 100000,time:'23/07/09 09:05:00', rank:'S' },
    { id: 3, name: 'John Doe', reserve: 25000, bidding_time: 100000,time:'23/07/09 09:05:00', rank:'S' },
    { id: 4, name: 'Jane Doe', reserve: 30000, bidding_time: 150000,time:1000, rank:'S' },
    { id: 5, name: 'Jane Doe', reserve: 30000, bidding_time: 150000,time:1000, rank:'S' },
    { id: 6, name: 'Jane Doe', reserve: 30000, bidding_time: 150000,time:1000, rank:'S' },
    { id: 7, name: 'Jane Doe', reserve: 30000, bidding_time: 150000,time:1000, rank:'S' },
];

export const colSuccess = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'reserve', name: 'Giá khởi điểm'},
    { id: 'winning_price', name: 'Giá trúng thầu' },
    { id: 'bidding_time', name: 'Thời gian đấu giá' },
    { id: 'winning_time', name: 'Thời gian thắng' },

]

export const rowsSuccess = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029 Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00',status:5 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00' },

];

export const tabData = [
    { value: '2', name: 'Approved',top:'Approved', count: 3, color:'bg-orange-400' },
    { value: '3', name: 'Bidding',top:'Bidding', count: 4, color:'bg-lime-500' },
    { value: '4', name: 'Success',top:'Success', count: 5, color:'bg-green-700' },
    { value: '5', name: 'Failure',top:'Failure', count: 6, color:'bg-fuchsia-700' },
    { value: '6', name: 'Confirm ',top:'Confirm ', count: 2, color:'bg-yellow-300' },
    { value: '7', name: 'Delivery start',top:'Departure', count: 3, color:'bg-indigo-800' },
    { value: '8', name: 'Completed',top:'Completion', count: 2, color:'bg-emerald-800' },
    { value: '9', name: 'Cancel',top:'Cancel', count: 2, color:'bg-red-600' },
];

export const tabData1 = [
    { value: '1', name: 'Auction winning',top:'Win', count: 3, color:'bg-yellow-500' },
    { value: '2', name: 'Delivery wait',top:'Wait', count: 4, color:'bg-indigo-800' },
    { value: '3', name: 'Completed',top:'Completed', count: 5, color:'bg-emerald-800' },
    { value: '4', name: 'Cancel',top:'Cancel', count: 6, color:'bg-red-600' },
];

export const colFailure = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'reserve', name: 'Giá khởi điểm'},
    { id: 'bidding_time', name: 'Thời gian đấu giá' },
    { id: 'finish_time', name: 'Thời gian kết thúc' },

]

export const rowFailure = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029 Đồng hồ Rolex A14-5029', reserve: 25000,bidding_time:'23/07/09 09:05:00', finish_time:'23/07/09 11:05:00',status:10 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000,bidding_time:'23/07/09 09:05:00', finish_time:'23/07/09 11:05:00' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000,bidding_time:'23/07/09 09:05:00', finish_time:'23/07/09 11:05:00' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000,bidding_time:'23/07/09 09:05:00', finish_time:'23/07/09 11:05:00' },

];


export const colConfirm = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'reserve', name: 'Giá khởi điểm'},
    { id: 'winning_price', name: 'Giá trúng thầu' },
    { id: 'shipping_fee', name: 'Phí vận chuyển' },
    { id: 'total_price', name: 'Tổng tiền' },

]

export const rowConfirm = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,shipping_fee: 30.000 , total_price:370000,status:6 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,shipping_fee: 30.000 , total_price:370000 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,shipping_fee: 30.000 , total_price:370000 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,shipping_fee: 30.000 , total_price:370000 },

];

export const colDeparture = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'total_price', name: 'Tổng tiền' },
    { id: 'phone_number', name: 'Số điện thoại' },
    { id: 'address', name: 'Địa chỉ' },

]

export const rowDeparture = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000, phone_number: '0975689210', address:'Số 7 phường Phúc La Hà Đông Hà Nội',status:7 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000, phone_number: '0975689210', address:'Số 7 phường Phúc La Hà Đông Hà Nội' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000, phone_number: '0975689210', address:'Số 7 phường Phúc La Hà Đông Hà Nội' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000, phone_number: '0975689210', address:'Số 7 phường Phúc La Hà Đông Hà Nội' },

];

export const colCompletion = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'total_price', name: 'Tổng tiền' },
    { id: 'completed_time', name: 'Thời gian nhận' },

]

export const rowCompletion = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,completed_time:'2023-10-10 19:07:35',status:8 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000, completed_time:'2023-10-10 19:07:35'},
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,completed_time:'2023-10-10 19:07:35' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,completed_time:'2023-10-10 19:07:35' },

];

export const colCancel = [
    { id: 'request_time', name: 'Thời gian gửi' },
    { id: 'request_id', name: 'Mã yêu cầu' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'reserve', name: 'Giá khởi điểm' },
    { id: 'action_by', name: 'Tác nhân'},
    { id: 'reason', name: 'Lí do' },

]

export const rowCancel = [
    { request_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000,request_time:'23/07/09 09:05:00', action_by:'Admin',reason:'Giá không phù hợp ',status:11 },
    { request_id: 2, name: 'John Doe', reserve: 25000,reason:'Giá không phù hợp ',request_time:'23/07/09 09:05:00', action_by:'User' },
    { request_id: 3, name: 'John Doe', reserve: 25000,reason:'Giá không phù hợp ',request_time:'23/07/09 09:05:00', action_by:'User' },
    { request_id: 4, name: 'Jane Doe', reserve: 30000,reason:'Giá không phù hợp ',request_time:1000, action_by:'S' },
    { request_id: 5, name: 'Jane Doe', reserve: 30000,reason:'Giá không phù hợp ',request_time:1000, action_by:'S' },

];


//winning auctionm
export const colAuctionWin = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'reserve', name: 'Giá khởi điểm'},
    { id: 'winning_price', name: 'Giá trúng thầu' },
    { id: 'bidding_time', name: 'Thời gian đấu giá' },
    { id: 'winning_time', name: 'Thời gian thắng' },

]

export const rowAuctionWin = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029 Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00',status:4 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00' },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', reserve: 25000, winning_price: 100000,bidding_time:'23/07/09 09:05:00', winning_time:'23/07/09 09:05:00' },

];

export const colDlvWait = [
    { id: 'product_id', name: 'Mã sản phẩm' },
    { id: 'name', name: 'Tên sản phẩm'},
    { id: 'total_price', name: 'Tổng tiền'},
    { id: 'address', name: 'Địa chỉ' },
    { id: 'dlv_state', name: 'Trạng thái đơn' },

]

export const rowDlvWait = [
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,address:'Số 1 Trần Đại Nghĩa Hai Bà Trưng',dlv_state:6,status:5 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,address:'Số 1 Trần Đại Nghĩa Hai Bà Trưng',dlv_state:7,status:6},
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,address:'Số 1 Trần Đại Nghĩa Hai Bà Trưng',dlv_state:8 },
    { product_id: 1, name: 'Đồng hồ Rolex A14-5029', total_price:370000,address:'Số 1 Trần Đại Nghĩa Hai Bà Trưng',dlv_state:8 },

];

export const pending = { value: '1', name: 'Pending',top:'Pending', count: 2, color:'bg-cyan-400' }


export const numberToString = (state) => {
    switch (state) {
        case 1:
            return 'Pending';
        case 2:
            return 'Approved';
        case 3:
            return 'Bidding';
        case 4:
            return 'Bidding';
        case 5:
            return 'Success';
        case 6:
            return 'Confirm';
        case 7:
            return 'Delivery start';
        case 8:
            return 'Completed';
        case 10:
            return 'Failure';
        case 11:
            return 'Cancel';
        default:
            return null;
    }
};
