import React, { FC } from 'react'
import {
    BsSunFill,
    BsFillMoonStarsFill,
} from '@components/icon/IconImage'
import { useTheme } from '@components/contexts/ThemeContext'


const ThemeToggle:FC = ({}) => {
    const {theme, toggleTheme} = useTheme()
    return (
        <>
            <div id="theme-toggle" className="w-12 h-6 rounded-l-full rounded-r-full relative cursor-pointer shadow-lg
                            bg-[#E8EBF1]">
                <div className={`absolute top-0 w-6 h-6 rounded-full flex items-center justify-center shadow-card transition-all duration-1000 ease-in-out 
                                ${!theme ? 'right-0' : ' left-0'}
                                bg-white dark:bg-dark_0fc9f2`}></div>
                <div className="absolute top-0 left-0 w-6 h-6 flex justify-center items-center">
                   <BsSunFill className={`${!theme ? 'text-c_BCC3CF' : 'text-cyan-500'}`} onClick={toggleTheme}/>
                </div>
                <div className="absolute top-0 right-1 flex flex-col h-full">
                    <div className="my-auto">
                        <BsFillMoonStarsFill className={`${!theme ? 'text-white' : 'text-c_BCC3CF'}`} onClick={toggleTheme}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(ThemeToggle)