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
    });
    const { currentUser, setCurrentUser } = useAuthContext();
    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, name, password,phone }) => {
            try {
                const res = await USER.register({ email, username, name, password,phone })
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
            toast.success("Account created successfully");

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });
    console.log(mutate)
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // page won't reload
        console.log('alo')
        mutate(formData);
    };

    return (
        <>
            <div
                className="font-[sans-serif] text-gray-800 bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
                <div
                    className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                    <div
                        className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                        <div>
                            <h4 className="text-white text-lg font-semibold">Đăng kí</h4>
                            <p className="text-[13px] text-white mt-2">Welcome to our registration page! Get started by
                                creating your account.</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
                            <p className="text-[13px] text-white mt-2">Our registration process is designed to be
                                straightforward and secure. We prioritize your privacy and data security.</p>
                        </div>
                    </div>
                    <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold">Đăng kí</h3>
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
                                    <input name="password" type="password" required
                                           onChange={handleInputChange}
                                           value={formData.password}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Enter password"/>
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <input name="confirmpassword" type="password" required
                                           onChange={handleInputChange}
                                           value={formData.password}
                                           className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-orange-400"
                                           placeholder="Confirm password"/>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                       className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                <label htmlFor="remember-me" className="ml-3 block text-sm">
                                    I accept the <a
                                    className="text-blue-600 font-semibold hover:underline ml-1">Terms and
                                    Conditions</a>
                                </label>
                            </div>
                        </div>
                        <div className="!mt-10">
                            <button
                                    className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                                {isPending ? "Loading..." : "Đăng kí"}
                            </button>
                            {isError && <p className='text-red-500 text-sm '>{error.response.data.error}</p>}
                        </div>

                    </form>
                    <div className='flex flex-col  gap-2 mt-4'>
                        <p className='text-black text-sm'>Already have an account?</p>
                        <Link to='/login'>
                            <button type="button"
                                    className=" py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                                Đăng nhập
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
