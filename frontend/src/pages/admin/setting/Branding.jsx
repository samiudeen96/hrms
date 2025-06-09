import React from 'react'
import Title from '../../../components/Title'

const Branding = () => {
  return (
    <div className='shadow bg-surface p-5 rounded'>

      <form>
        <Title title={"Basic Information"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Color */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primary_color"
                className="h-12 w-12 p-1 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="#000000"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="secondary_color"
                className="h-12 w-12 p-1 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="#ffffff"
                className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Font Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Font
            </label>
            <select
              name="font"
              className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none border border-gray-300"
            >
              <option value="sans">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="mono">Monospace</option>
              <option value="poppins">Poppins</option>
              <option value="inter">Inter</option>
            </select>
          </div>

          {/* Theme Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Theme
            </label>
            <select
              name="theme"
              className="w-full bg-background sm:p-[10px] p-4 rounded-sm focus:outline-none border border-gray-300"
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">🖥️ System Default</option>
            </select>
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <button className='px-10 py-2 bg-primary text-white rounded-sm'>Submit</button>
        </div>
      </form>

    </div>
  )
}

export default Branding