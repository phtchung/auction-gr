import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import USER from "../../Services/userService.jsx";
import {toast} from "react-toastify";
import {useAuthContext} from "../Context/AuthContext.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const Login = () => {
    const location = useLocation();
    const {currentUser, setCurrentUser} = useAuthContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const queryClient = useQueryClient();

    const {mutate, isError, isPending, error} = useMutation({
        mutationFn: async ({email, password}) => {
            try {
                const res = await USER.login({email, password})
                const data = res.data

                return data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (data) => {
            if (data) {
                localStorage.setItem("data", JSON.stringify(data));
                setCurrentUser(data)
            }
            const accessToken = data?.accessToken;
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
            const id = data?.id;
            if (id) {
                localStorage.setItem("id", id);
            }
            toast.success("Đăng nhập thành công");
            queryClient.invalidateQueries({queryKey: ["authUser"]});
        },
    });
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // page won't reload
        mutate(formData);
    };

    return (
        <>
            <div
                className="font-[sans-serif] text-gray-800  max-w-5xl flex items-center mx-auto rounded-xl p-4">
                <div
                    className="grid md:grid-cols-4 items-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] md:my-20 md:py-32 rounded-xl overflow-hidden">
                    <a href="/" className="h-full w-full md:col-span-2">
                        <img className="w-full h-full " src="https://storage.googleapis.com/auction_gr/signup.jpg" alt=""/>
                    </a>

                    <form className="md:col-span-2 w-full mx-auto flex-col flex  py-4 px-6 sm:px-16"
                          onSubmit={handleSubmit}>
                        <div className="">
                            <h3 className="text-2xl text-orange-500 font-bold">Đăng nhập</h3>
                        </div>
                        <div className='flex flex-row mb-6  md:mx-16 gap-2 mt-2'>
                            <p className='text-black text-sm'>Bạn chưa có tài khoản?</p>
                            <Link to='/signup'>
                                <div
                                    className="text-sm hover:text-orange-600 font-semibold rounded text-black  focus:outline-none">
                                    Đăng ký
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
                                    <input name="password" type="password" required
                                           onChange={handleInputChange}
                                           value={formData.password}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Mật khẩu"/>
                                </div>
                            </div>
                        </div>
                        <div className="!mt-6">
                            <button
                                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-orange-500 hover:bg-orange-600 focus:outline-none">
                                {isPending ? "Đăng nhập..." : "Đăng nhập "}
                            </button>
                            {isError ?
                                <p className='text-red-500 font-semibold mt-2 text-sm '>{error.response.data.error}</p> :
                                <div className="h-7 w-20 content-none"></div>}
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};
export default Login;
