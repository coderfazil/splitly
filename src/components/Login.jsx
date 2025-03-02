import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css"; // Import module CSS

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })).then((res) => {
            if (!res.error) navigate("/dashboard");
        });
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className={styles.inputField} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className={styles.inputField} 
                />
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className={styles.button}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p className={styles.redirectText}>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;
