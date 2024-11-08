import React, { useState } from 'react';
import axios from 'axios';
import { FaLock, FaUser, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const UserSignupForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',  // Added confirmPassword field
    phone: '',
    address: '',
    pincode: '',
    gender: '', // Added gender field
    age: '',    // Added age field
    favorites: '', // Added favorites field (optional)
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Check for required fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.address || !formData.pincode || !formData.gender || !formData.age) {
      enqueueSnackbar('All fields are required!', { variant: 'error' });
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar('Passwords do not match!', { variant: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/register', formData);
      enqueueSnackbar('User registration completed successfully', { variant: 'success' });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Error submitting form.', { variant: 'error' });
      }
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-lg mt-10 max-w-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">User Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* phone Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">phone</label>
          <div className="flex items-center">
            <FaPhone className="text-gray-500 mr-2" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <div className="flex items-center">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Pincode Input */}
        <div className="mb-4">
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
          <div className="flex items-center">
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Gender Input */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex items-center">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Age Input */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Favorites Input */}
        <div className="mb-4">
          <label htmlFor="favorites" className="block text-sm font-medium text-gray-700">Favorites</label>
          <input
            type="text"
            id="favorites"
            name="favorites"
            value={formData.favorites}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className="ml-2">
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="flex items-center">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
              required
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="ml-2">
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
        </div>
      </form>
    </div>
  );
};

export default UserSignupForm;