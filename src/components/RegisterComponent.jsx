import React, { useState } from "react";
import { RegisterAPI, GoogleSingAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import Linkedin from "../assets/linkedin.png";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import "../Sass/RegisterComponent.scss"
import { toast } from 'react-toastify';

export default function RegisterComponent() {
    let navigate = useNavigate();
    /* 创建邮箱注册验证是否成功 */
    const [credentails, setCredentials] = useState({});
    const register = async () => {
        try {
            let res = await RegisterAPI(credentails.email, credentails.password);
            toast.success("用户创建成功", { position: "top-center", autoClose: 1000, pauseOnHover: false, draggable: false, pauseOnFocusLoss: false });
            /* 将name,email传给服务器 */
            postUserData({
                name: credentails.name,
                email: credentails.email,
                imageLink: 'https://s1.ax1x.com/2023/09/08/pP6MSeS.jpg'
            });
            navigate("/home");
            localStorage.setItem("userEmail", res.user.email)
        } catch (err) {
            toast.error("该邮箱已被注册！", { position: "top-center", autoClose: 1000, draggable: false, pauseOnFocusLoss: false });
        }
    };

    /* Google登录 */
    const googleSignIn = () => {
        let response = GoogleSingAPI()
        console.log(response);
    }

    return (
        <div className="register-main">
            {/* logo */}
            <img src={Linkedin} className="register-linkedinLogo" />
            <div className="register-wrapper">
                <h1 className="heading">成就职业人生</h1>
                <div className="register-wrapper-inner">

                    {/* 用户名账号密码框 */}
                    <div className="auth-inputs">
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentails, name: event.target.value })
                            }
                            type="text"
                            className="common-input"
                            placeholder="请输入你的名字"
                        />
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentails, email: event.target.value })
                            }
                            type="email"
                            className="common-input"
                            placeholder="请输入电子邮箱"
                        />
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentails, password: event.target.value })
                            }
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    register()
                                }
                            }
                            }
                            type="password"
                            className="common-input"
                            placeholder="请输入6位密码以上"
                        />
                    </div>
                    {/* 协议 */}
                    <p className="rule">点击“同意并加入”，即表示您同意遵守Linkedin的<a href="https://www.linkedin.com/legal/user-agreement?trk=registration-frontend_join-form-user-agreement">《用户协议》</a>
                        <a href="https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy">《隐私政策》</a>
                        及
                        <a href="">《Cookie 政策》</a>
                        。
                    </p>

                    {/* 注册按钮 */}
                    <button onClick={register} className="register-btn">
                        同意并加入
                    </button>
                    {/* 分割线 */}
                    <hr className="hr-text" data-content="or" />
                    <div className="google-btn-container">
                        {/* <GoogleButton label='使用Google登录' className="google-btn"
                            onClick={googleSignIn}
                        /> */}
                        {/* 登录按钮 */}
                        <p className="go-to-signup">
                            已有Linkedin帐号？{" "}
                            <span className="join-now" onClick={() => { navigate("/") }}>
                                登 录
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
