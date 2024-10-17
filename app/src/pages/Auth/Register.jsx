import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "+255",
    password: "",
    confirm: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handling form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(" ");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => setLoginForm(!loginForm);

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (formData.password !== formData.confirm) {
      setLoading(false);
      setErrors({ error: "Passwords do not match" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:10000/auth/v2/register",
        formData
      );
      if (res.data.success === true) {
        setMessage(res.data.message);
        setSuccess(true);
        setFormData({
          username: "",
          email: "",
          phone: "+255",
          password: "",
          confirm: "",
        });
      } else {
        setLoading(false);
        setMessage(res.data.message);
        setErrors(res.data.errors);
      }
    } catch (error) {
      setLoading(false);
      setErrors({
        api: "Registration failed. Please try again.",
        error: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // handle login
  const hanldeLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const loginCredentials = {
        username: formData.username,
        password: formData.password,
      };
      const res = await axios.post(
        "http://localhost:10000/auth/v2/login",
        loginCredentials
      );

      if (res.data.success === true) {
        setMessage(res.data.message);
        setSuccess(true);
        localStorage.setItem("smartId", res.data.id);
        localStorage.setItem("smartUsername", res.data.username);
        localStorage.setItem("smartToken", res.data.token);
        window.location.reload();
      } else {
        setLoading(false);
        setMessage(res.data.message);
        setErrors(res.data.errors);
      }
    } catch (error) {
      setLoading(false);
      setErrors({
        api: "Login failed. Please try again.",
        error: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark">
      <div className="w-[80%] md:w-[40%] lg:w-[35%] h-auto bg-accent-darkGray dark:bg-primary-glass mx-auto rounded-md">
        <form
          onSubmit={loginForm ? hanldeLogin : handleSubmit}
          className="w-full h-full flex flex-col items-center justify-center p-4"
        >
          <span className="mb-4 text-xl font-bold text-primary-light dark:text-accent-gray">
            {loginForm ? "Login" : "Create Account"}
          </span>
          {/* username */}
          <div className="relative w-full mt-2 md:mt-4">
            <label
              className="block text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none bg-accent-grayShade border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
              id="username"
              name="username"
              type="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username or email"
              autoFocus={true}
            />
          </div>

          {!loginForm && (
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none bg-accent-grayShade border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="username"
                name="username"
                type="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                autoFocus={true}
              />
            </div>
          )}

          {!loginForm && (
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="appearance-none bg-accent-grayShade border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your contact"
              />
            </div>
          )}

          {/* email */}
          {!loginForm && (
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none bg-accent-grayShade border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          )}

          {/* password */}
          <div className="relative w-full mt-2 md:mt-4">
            <label
              className="block text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
              htmlFor="password"
            >
              Enter password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none bg-accent-grayShade border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
            />
            <div
              className="absolute top-2/3 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* confirm password */}
          {!loginForm && (
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="confirm"
              >
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm"
                placeholder="Confirm password"
                value={formData.confirm}
                onChange={handleChange}
                className="appearance-none bg-accent-grayShade border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
              />
              <div
                className="absolute top-2/3 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          )}

          {/* submit button */}
          <button
            type="submit"
            className={`w-full mt-6 px-4 py-2 text-accent-darkGray dark:text-accent-gray flex items-center justify-center text-center bg-primary dark:bg-accent-darkGray rounded-lg hover:opacity-85 transition ease-in-out duration-700 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Validating..." : "Login"}
          </button>

          {!loginForm && (
            <button
              type="submit"
              className={`w-full mt-6 px-4 py-2 text-accent-darkGray dark:text-accent-gray flex items-center justify-center text-center bg-primary dark:bg-accent-darkGray rounded-lg hover:opacity-85 transition ease-in-out duration-700 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          )}
        </form>
        <div className="text-center my-4 flex flex-col">
          {errors.error && (
            <p className="error text-red-500 text-sm py-2">{errors.error}</p>
          )}
          <span className="text-accent-gray">
            {!loginForm ? "Already have an account?" : "Dont have an account?"}
            <span
              onClick={toggleForm}
              className="text-primary pl-1 cursor-pointer hover:text-accent-gray transition ease-in-out duration-700"
            >
              {!loginForm ? "Login" : "Create Account"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
