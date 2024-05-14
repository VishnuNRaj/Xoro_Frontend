import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

interface ButtonProps {
  text: string,
  route: string,
}

const getButtonColor = (route: string) => {
  return window.location.pathname === route ? 'electric-violet' : ''
}

const Buttons: React.FC<ButtonProps> = memo(({ text, route }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-12">
      <button onClick={() => navigate(route)} className={` w-full h-full text-white ${getButtonColor(route)} hover:bg-violet-700`}>{text}</button>
    </div>
  )
})

export default Buttons