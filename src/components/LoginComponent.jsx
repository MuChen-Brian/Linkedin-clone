import React, { useState } from "react";
import { LoginAPI, GoogleSingAPI } from "../api/AuthAPI";
import Linkedin from "../assets/linkedin.png";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from 'react-toastify';


export default function LoginComponent() {
    let navigate = useNavigate();
    /* 邮箱登录验证是否成功 */
    const [credentails, setCredentials] = useState({});
    const login = async () => {
        try {
            let res = await LoginAPI(credentails.email, credentails.password);
            toast.success("登录成功！", { autoClose: 1000, draggable: false, pauseOnFocusLoss: false });
            localStorage.setItem('userEmail', res.user.email)
            navigate("/home");
        } catch (err) {
            toast.error("输入错误,请重新输入！", { autoClose: 1000, draggable: false, pauseOnFocusLoss: false });
        }
    };
    /* Google登录 */
    const googleSignIn = () => {
        GoogleSingAPI()
    }
    return (
        <div className="login-main">
            {/* logo */}
            <img src={Linkedin} className="login-linkedinLogo" />
            <div className="login-wrapper">
                {/* 登陆标题 */}
                <div className="login-wrapper-inner">
                    <h1 className="heading">登 录</h1>
                    <p className="sub-heading">您专属的职场社区</p>
                    {/* 账号密码框 */}
                    <div className="auth-inputs">
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
                                    login()
                                }
                            }}
                            type="password"
                            className="common-input"
                            placeholder="密码"
                        />
                    </div>
                    {/* 登录按钮 */}
                    <button
                        onClick={login}
                        className="login-btn"
                    >
                        登 录
                    </button>
                    {/* 分割线 */}
                    <hr className="hr-text" data-content="or" />
                    <div className="google-btn-container">
                        {/* <GoogleButton label='使用Google登录' className="google-btn"
                            onClick={googleSignIn}
                        /> */}
                        {/* 注册按钮 */}
                        <p className="go-to-signup">
                            LinkedIn新用户?{" "}
                            <span className="join-now" onClick={() => { navigate("/register") }}>
                                注 册
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
