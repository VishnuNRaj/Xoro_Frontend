// import React from 'react'
import fction from '../../WebPush'

function Notification() {
  return (
    <div className='w-full border-2 p-1 border-gray-400 h-[90vh]'>
        <button className='bg-blue-600 w-20 rounded-full h-8 text-white text-sm font-semibold' onClick={fction} ><i className='fa fa-bell'></i> Allow </button>
    </div>
  )
}

export default Notification