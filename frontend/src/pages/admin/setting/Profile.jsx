import React, { useState } from 'react'
import Title from '../../../components/Title'

const Profile = () => {

  const [formData, setFormData] = useState({
    logo: ''
  })

  return (
    <div className='shadow bg-surface p-5 rounded'>
      {/* <h3 className='font-semibold'>Add a user for a new role</h3>
       */}



      <form >

        <div>
          <Title title={"Basic Information"} />
          <div className='grid grid-cols-3 gap-5'>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Company Logo <sup className="text-red-400">*</sup>
              </label>

              <div className="relative">
                <input
                  type="file"
                  name="logo"
                  id="logoUpload"
                  accept="image/*"
                  // onChange={onChangeHandler}
                  className="w-full bg-background sm:p-[4px] p-4 rounded text-sm text-gray-700 file:bg-gray-100 file:border-0 file:px-4 file:cursor-pointer file:py-2 file:rounded-sm file:text-gray-700 file:font-medium hover:file:bg-gray-200 focus:outline-none"
                />
              </div>
            </div>



            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Company Name<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter company name"
                name="name"
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Description<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter description"
                name="name"
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Founded Date<sup className='text-red-400'>*</sup></label>
              <input
                type="date"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter description"
                name="name"
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

          </div>
        </div>

        <div className='mt-8'>
          <Title title={"Contact Information"} />
          <div className='grid grid-cols-3 gap-5'>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Email Address<sup className='text-red-400'>*</sup></label>
              <input
                type="email"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter email address"
                name="name"
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Phone Number<sup className='text-red-400'>*</sup></label>
              <input
                type="tel"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter phone number"
                name="phone"
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Website<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter website url"
                name="phone"
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Address<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter address"
                name=""
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Country<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter country"
                name=""
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">State<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter state"
                name=""
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">City<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter city"
                name=""
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Postal Code<sup className='text-red-400'>*</sup></label>
              <input
                type="text"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
                placeholder="Enter postal code"
                name=""
              // value={formData.name}
              // onChange={onChangeHandler}
              />
            </div>

          </div>
        </div>

        <div className='mt-8'>
          <Title title={"Legal & Compliance"} />
          <div className='grid grid-cols-3 gap-5'>
            {/* Company Registration No. */}
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Company Registration No.
              </label>
              <input
                type="text"
                name="registration_no"
                placeholder="Enter company registration number"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
              />
            </div>

            {/* Tax Identification No. */}
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Tax Identification No.
              </label>
              <input
                type="text"
                name="tax_id"
                placeholder="Enter tax identification number"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
              />
            </div>

            {/* GST/VAT No. */}
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                GST/VAT No.
              </label>
              <input
                type="text"
                name="gst_vat"
                placeholder="Enter GST or VAT number"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
              />
            </div>

            {/* Upload Certificates */}
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Upload Certificates
              </label>
              {/* <input
                type="file"
                name="certificates"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
              /> */}
              <div className="relative">
                <input
                  type="file"
                  name="certificates"
                  accept=".pdf,.jpg,.jpeg,.png"
                  // onChange={onChangeHandler}
                  className="w-full bg-background sm:p-[4px] p-4 rounded text-sm text-gray-700 file:bg-gray-100 file:border-0 file:px-4 file:cursor-pointer file:py-2 file:rounded-sm file:text-gray-700 file:font-medium hover:file:bg-gray-200 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <button className='px-10 py-2 bg-primary text-white rounded-sm'>Submit</button>
        </div>

      </form>
    </div>
  )
}

export default Profile