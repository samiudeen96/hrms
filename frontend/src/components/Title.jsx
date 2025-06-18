
import React from 'react'

const Title = ({ title }) => {
    return (
        <div className='mb-3'>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <div className='w-8 h-[3px] rounded-full bg-[#f7b35b]'></div>
        </div>
    )
}

export default Title