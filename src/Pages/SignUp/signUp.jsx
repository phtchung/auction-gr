import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import USER from "../../Services/userService.jsx";
import {useAuthContext} from "../Context/AuthContext.jsx";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        name: "",
        phone:"",
        password: "",
        confirm_password:"",
    });
    const { currentUser, setCurrentUser } = useAuthContext();
    const queryClient = useQueryClient();

    const { mutate, isError , isPending, error } = useMutation({
        mutationFn: async ({ email, username, name, password,phone, confirm_password }) => {
            try {
                console.log( confirm_password)
                const res = await USER.register({ email, username, name, password,phone,confirm_password })
                const data = res.data
                console.log(data);

                return data;
            } catch (error) {
                console.log(error.response.data);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log(data)
            if(data){
                localStorage.setItem("data", JSON.stringify(data));
                setCurrentUser(data)
            }
            const accessToken =data?.accessToken;
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
            const id = data?.id;
            if (id) {
                localStorage.setItem("id", id);
            }
            toast.success("Đăng ký tài khoản thành công");

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });
    const handleInputChange = (e) => {
        console.log(e.target.name,e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // page won't reload
        mutate(formData);
    };

    return (
        <>
            <div
                className="font-[sans-serif] text-gray-800  max-w-5xl flex items-center mx-auto md:my-20 rounded-xl  p-4">
                <div
                    className="grid md:grid-cols-4 items-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">

                    <a href="/" className="h-full w-full md:col-span-2">
                        <img className="w-full h-full " src="/../../src/assets/signupimg.png" alt=""/>
                    </a>

                    <form className="md:col-span-2 w-full mx-auto flex-col flex  py-6 px-6 sm:px-16"
                          onSubmit={handleSubmit}>
                        <div className="">
                            <h3 className="text-2xl text-orange-500 font-bold">Đăng ký</h3>
                        </div>
                        <div className='flex flex-row mb-6  md:mx-16 gap-2 mt-2'>
                            <p className='text-black text-sm'>Bạn đã có tài khoản?</p>
                            <Link to='/login'>
                                <div
                                    className="text-sm hover:text-orange-600 font-semibold rounded text-black  focus:outline-none">
                                    Đăng nhập
                                </div>
                            </Link>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <div className="relative flex items-center">
                                    <input name="email" type="email" required
                                           onChange={handleInputChange}
                                           value={formData.email}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Email"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                         className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" strokeMiterlimit="10" strokeWidth="40"
                                                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                  data-original="#000000"></path>
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="relative flex items-center">
                                    <input name="username" type="text" required
                                           onChange={handleInputChange}
                                           value={formData.username}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Tên đăng nhập"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                         className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <input name="name" type="text" required
                                           onChange={handleInputChange}
                                           value={formData.name}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Họ Tên"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                         className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <input name="phone" type="number" required
                                           onChange={handleInputChange}
                                           value={formData.phone}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Số điện thoại"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb"
                                         className="w-4 h-4 absolute right-4"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M347.1 24.6c7.7-18.6 28-28.5 47.4-23.2l88 24C499.9 30.2 512 46 512 64c0 247.4-200.6 448-448 448c-18 0-33.8-12.1-38.6-29.5l-24-88c-5.3-19.4 4.6-39.7 23.2-47.4l96-40c16.3-6.8 35.2-2.1 46.3 11.6L207.3 368c70.4-33.3 127.4-90.3 160.7-160.7L318.7 167c-13.7-11.2-18.4-30-11.6-46.3l40-96z"/>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="relative flex items-center">
                                    <input name="password" type="password" required
                                           onChange={handleInputChange}
                                           value={formData.password}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Mật khẩu"/>
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <input name="confirm_password" type="password" required
                                           onChange={handleInputChange}
                                           value={formData.confirm_password}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Xác nhận mật khẩu"/>
                                </div>
                            </div>

                            {/*<div className="flex items-center">*/}
                            {/*    <input id="remember-me" name="remember-me" type="checkbox"*/}
                            {/*           className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>*/}
                            {/*    <label htmlFor="remember-me" className="ml-3 block text-sm">*/}
                            {/*        I accept the <a*/}
                            {/*        className="text-blue-600 font-semibold hover:underline ml-1">Terms and*/}
                            {/*        Conditions</a>*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                        </div>
                        <div className="!mt-6">
                            <button
                                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-orange-500 hover:bg-orange-600 focus:outline-none">
                                {isPending ? "Đang đăng ký..." : "Đăng ký"}
                            </button>
                            {isError ?
                                <p className='text-red-500 font-semibold mt-2 text-sm '>{error.response.data.error}</p> :
                                <div className="h-7 w-20 content-none"></div>}

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
