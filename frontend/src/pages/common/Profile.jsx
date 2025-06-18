import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import { IoCameraOutline } from 'react-icons/io5';

const Profile = () => {
  const { registeredInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (registeredInfo && registeredInfo.user) {
      setFormData({
        profile_picture: registeredInfo.profile_picture || "",

        firstName: registeredInfo.user.firstName || registeredInfo.emp_code || "",
        lastName: registeredInfo.user.lastName || "",
        email: registeredInfo.user.email || "",
        emp_code: registeredInfo.emp_code || "",

        address: registeredInfo.address || "",
        city: registeredInfo.city || "",
        country: registeredInfo.country || "",
        nationality: registeredInfo.nationality || "",

        phone: registeredInfo.phone || "",
        emg_contact: registeredInfo.emg_contact || "",
      });
    }
  }, [registeredInfo]);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        profile_picture: file
      }));
    }
  };

  const handleDelete = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      profile_picture: ''
    }));
    fileInputRef.current.value = null;
  };

  if (!formData) return <div>Loading...</div>;


  return (
    <div>
      <form>
        <div className='wrapper'>
          <h4 className='font-semibold mb-1'>General Information</h4>

          <div className="flex items-center gap-4">
            <div className="relative">
              <label className='label'>Profile picture</label>
              <div className="bg-gray-200 rounded-full border-3 border-primary w-20 h-20 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => fileInputRef.current.click()}>
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="object-cover w-full h-full" />
                ) : (
                  <BiUser className="w-8 h-8 text-white" />
                )}
              </div>
              <div
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer"
              >
                <IoCameraOutline className="w-4 h-4 text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <p className='text-sm font-semibold mb-[-1px]'>{formData.firstName} {formData.lastName}</p>
              {/* <p className='text-xs'>{loggedData?.role}</p> */}
              {previewImage ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="border border-gray-300 text-sm px-2 py-1 rounded mt-2 hover:border-red-500 hover:text-red-500"
                >
                  Remove picture
                </button>
              ) : (
                ""
              )}

            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-5">
            <div>
              <label className='label'>First Name</label>
              <input
                type="text"
                className='input'
                name='name'
                value={formData.firstName}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>Last Name</label>
              <input
                type="text"
                className='input'
                name='lastName'
                value={formData.lastName}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>Email Address</label>
              <input
                type="email"
                className='input'
                name='email'
                value={formData.email}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>Employee Id</label>
              <input
                type="text"
                className='input'
                name='emp_code'
                value={formData.emp_code}
                onChange={onChangeHandler}
                disabled
              />
            </div>

          </div>
        </div>
        <div className='wrapper mt-4'>
          <h4 className='font-semibold mb-1'>Address Details</h4>
          <div className="grid grid-cols-4 gap-5 ">
            <div>
              <label className='label'>Address</label>
              <input
                type="text"
                className='input'
                name='address'
                value={formData.address}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>City</label>
              <input
                type="text"
                className='input'
                name='city'
                value={formData.city}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>Country</label>
              <input
                type="text"
                className='input'
                name='country'
                value={formData.country}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>Nationality</label>
              <input
                type="text"
                className='input'
                name='nationality'
                value={formData.nationality}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>

        <div className='wrapper mt-4'>
          <h4 className='font-semibold mb-1'>Contact Details</h4>
          <div className="grid grid-cols-4 gap-5 ">
            <div>
              <label className='label'>Contact</label>
              <input
                type="text"
                className='input'
                name='phone'
                value={formData.phone}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className='label'>Emergency Contact</label>
              <input
                type="text"
                className='input'
                name='emg_contact'
                value={formData.emg_contact}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Profile