import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUserGraduate, FaUserTie } from 'react-icons/fa';
import { MdPassword, MdLocationCity } from 'react-icons/md';
import './signup.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        role: 'client' // Default role is client
    });
    const [errors, setErrors] = useState({});
    const [authMode, setAuthMode] = useState('login-client'); // 'login-client', 'login-student', 'new-client', 'new-student', 'existing-client'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        if (authMode.includes('new')) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
            if (!formData.phone) newErrors.phone = 'Phone number is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const role = authMode.includes('student') ? 'student' : 'client';
            const isNewUser = authMode.includes('new');
            console.log('Form submitted:', { ...formData, role, isNewUser });
            // Add your authentication logic here
        }
    };

    const renderModeSelection = () => {
        if (isLogin) {
            return (
                <div className="mode-selection">
                    <h3>Login as:</h3>
                    <div className="mode-options">
                        <button
                            type="button"
                            className={`mode-option ${authMode === 'login-client' ? 'active' : ''}`}
                            onClick={() => setAuthMode('login-client')}
                        >
                            <FaUserTie className="option-icon" />
                            Client
                        </button>
                        <button
                            type="button"
                            className={`mode-option ${authMode === 'login-student' ? 'active' : ''}`}
                            onClick={() => setAuthMode('login-student')}
                        >
                            <FaUserGraduate className="option-icon" />
                            Student
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="mode-selection">
                    <h3>Sign up as:</h3>
                    <div className="mode-options">
                        <button
                            type="button"
                            className={`mode-option ${authMode === 'new-client' ? 'active' : ''}`}
                            onClick={() => setAuthMode('new-client')}
                        >
                            <FaUserTie className="option-icon" />
                            New Client
                        </button>
                        <button
                            type="button"
                            className={`mode-option ${authMode === 'new-student' ? 'active' : ''}`}
                            onClick={() => setAuthMode('new-student')}
                        >
                            <FaUserGraduate className="option-icon" />
                            New Student
                        </button>
                        <button
                            type="button"
                            className={`mode-option ${authMode === 'existing-client' ? 'active' : ''}`}
                            onClick={() => setAuthMode('existing-client')}
                        >
                            <FaUserTie className="option-icon" />
                            Existing Client
                        </button>
                    </div>
                </div>
            );
        }
    };

    const getSubmitButtonText = () => {
        if (isLogin) {
            return authMode === 'login-client' ? 'Login as Client' : 'Login as Student';
        } else {
            if (authMode === 'new-client') return 'Sign Up as New Client';
            if (authMode === 'new-student') return 'Sign Up as New Student';
            if (authMode === 'existing-client') return 'Continue as Existing Client';
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'login' : ''}`}
                        onClick={() => {
                            setIsLogin(true);
                            setAuthMode('login-client');
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'signup' : ''}`}
                        onClick={() => {
                            setIsLogin(false);
                            setAuthMode('new-client');
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="auth-content">
                    <h2 className="auth-title">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    {renderModeSelection()}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && authMode !== 'existing-client' && (
                            <div className="input-group">
                                <div className="input-icon">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>
                        )}

                        <div className="input-group">
                            <div className="input-icon">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <FaLock />
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>

                        {!isLogin && authMode !== 'existing-client' && (
                            <>
                                <div className="input-group">
                                    <div className="input-icon">
                                        <MdPassword />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="form-input"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                                </div>

                                <div className="input-group">
                                    <div className="input-icon">
                                        <FaPhone />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                                </div>

                                {authMode === 'new-client' && (
                                    <div className="input-group">
                                        <div className="input-icon">
                                            <MdLocationCity />
                                        </div>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address (Optional)"
                                            className="form-input"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
                            </>
                        )}

                        <button
                            type="submit"
                            className="submit-button"
                        >
                            {getSubmitButtonText()}
                        </button>
                    </form>

                    <p className="auth-switch">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setAuthMode(isLogin ? 'new-client' : 'login-client');
                            }}
                            className="auth-switch-button"
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;