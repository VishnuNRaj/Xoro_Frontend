import React, { memo } from 'react'
import { useEssentials } from '../../Functions/CommonFunctions'

interface ButtonProps {
  text: string,
  route: string,
}

const getButtonColor = (route: string) => {
  return window.location.pathname === route ? 'electric-violet' : ''
}

const Buttons: React.FC<ButtonProps> = memo(({ text, route }) => {
  const { navigate } = useEssentials()
  return (
    <div className="w-full h-12 px-2">
      <button onClick={() => navigate(route)} className={` w-full rounded-lg h-full text-white ${getButtonColor(route)} hover:bg-violet-700`}>{text}</button>
    </div>
  )
})

export default Buttons