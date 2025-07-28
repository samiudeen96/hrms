import React from 'react'
import Title from '../../../components/Title'

const Branding = () => {
  return (
    <div className='wrapper'>

      <form>
        <Title title={"Basic Information"} />
        <div className="grid grid-cols-1 md:grid-cols-1 space-y-4 w-fit">
          {/* Primary Color */}
          <div>
            <label className="label">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primary_color"
                className="h-10 w-12 p-1 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="#000000"
                className="input"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="label">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="secondary_color"
                className="h-10 w-12 p-1 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="#ffffff"
                className="input"
              />
            </div>
          </div>

          {/* Tertiary Color */}
          <div>
            <label className="label">
              Tertiary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="secondary_color"
                className="h-10 w-12 p-1 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="#ffffff"
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Font Select */}
          <div>
            <label className="label">
              Font
            </label>
            <select
              name="font"
              className="input "
            >
              <option value="sans">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="mono">Monospace</option>
              <option value="poppins">Poppins</option>
              <option value="inter">Inter</option>
            </select>
          </div>

          {/* Theme Select */}
          <div >
            <label className="label">
              Theme
            </label>
            <select
              name="theme"
              className="input"
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">🖥️ System Default</option>
            </select>
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <button className='button_primary'>Save Changes</button>
        </div>
      </form>

    </div>
  )
}

export default Branding

// import React, { useState } from 'react';
// import { SketchPicker } from 'react-color';

// const Branding = () => {
//   const [formData, setFormData] = useState({
//     tenant_id: '',
//     theme_name: 'default',
//     primary_color: '#000000',
//     secondary_color: '#ffffff',
//     background_color: '#f8f9fa',
//     font_family: 'Arial, sans-serif',
//     logo_url: '',
//     favicon_url: '',
//     dark_mode: false,
//     custom_css: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleColorChange = (name, color) => {
//     setFormData({ ...formData, [name]: color.hex });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave?.(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Tenant Theme Settings</h2>

//       <div>
//         <label className="block font-medium">Tenant ID</label>
//         <input
//           name="tenant_id"
//           type="number"
//           value={formData.tenant_id}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Theme Name</label>
//         <input
//           name="theme_name"
//           type="text"
//           value={formData.theme_name}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {['primary_color', 'secondary_color', 'background_color'].map((colorKey) => (
//           <div key={colorKey}>
//             <label className="block font-medium capitalize">{colorKey.replace('_', ' ')}</label>
//             <SketchPicker
//               color={formData[colorKey]}
//               onChangeComplete={(color) => handleColorChange(colorKey, color)}
//             />
//           </div>
//         ))}
//       </div>

//       <div>
//         <label className="block font-medium">Font Family</label>
//         <input
//           name="font_family"
//           type="text"
//           value={formData.font_family}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Logo URL</label>
//         <input
//           name="logo_url"
//           type="text"
//           value={formData.logo_url}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Favicon URL</label>
//         <input
//           name="favicon_url"
//           type="text"
//           value={formData.favicon_url}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded"
//         />
//       </div>

//       <div className="flex items-center space-x-2">
//         <input
//           name="dark_mode"
//           type="checkbox"
//           checked={formData.dark_mode}
//           onChange={handleChange}
//         />
//         <label className="font-medium">Dark Mode</label>
//       </div>

//       <div>
//         <label className="block font-medium">Custom CSS</label>
//         <textarea
//           name="custom_css"
//           rows="4"
//           value={formData.custom_css}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded"
//         />
//       </div>

//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Save Theme
//       </button>
//     </form>
//   );
// }

// export default Branding