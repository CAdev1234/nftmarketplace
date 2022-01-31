import React, { FC, useState } from "react";
import {
    FaCaretDown,
    FaCaretUp,
    BsGenderMale,
    BsGenderFemale,
} from  '../icon/IconImage'
import ClickOutside from "../ui/click-outside/click-outside";



// option data type: string or object

// in object case
// {
//     title: '',
//     ...

// }

// if object includes image
// {
//     title: '',
//     img: '',
//     ...
// }

type SelectInputProps = {
    option_li: any, 
    className?: string, 
    option_board_class?: string, 
    enable_img?: boolean, 
    img_class?: string, 
    option_class?: string, 
    default_option: any, 
    enable_underline?: boolean,
    data_type?: any, 
    returnVal: (item: any) => void
}

const SelectInput:FC<SelectInputProps> = ({
    option_li, 
    className, 
    option_board_class, 
    enable_img, 
    img_class, 
    option_class, 
    default_option, 
    enable_underline,
    data_type, 
    returnVal
}) => {
    const [enableSelect, setEnableSelect] = useState(false)
    const [currentVal, setCurrentVal] = useState(default_option)

    const updateCurrentVal = (index: number) => {
        let item = option_li[index]
        setCurrentVal(item)
        setEnableSelect(false)
        typeof(item) === 'string' ? returnVal(item) : returnVal(item.title)
    }
    
    return <ClickOutside active={enableSelect} onClick={() => setEnableSelect(false)}>
                <div>
                    <div className={`relative cursor-pointer ${className}`} onClick={() => {setEnableSelect(!enableSelect)}}>
                        <div className="flex items-center relative w-full">
                            {data_type === undefined &&
                                <div className={`flex items-center`}>
                                    <img src={currentVal.img} className={`${img_class} ${enable_img ? 'block' : 'hidden'}`}></img>
                                    <div className={currentVal === default_option ? `text-[#00080D] dark:text-cyan-500` : ''}>{typeof(currentVal) === 'string' ? currentVal : currentVal.title}</div>
                                </div>
                            }
                            {data_type !== undefined && data_type === 'gender' &&
                                <div className={`flex items-center`}>
                                    <BsGenderFemale className={`${img_class} ${currentVal.title === 'Female' ? 'block' : 'hidden'}`} />
                                    <BsGenderMale className={`${img_class} ${currentVal.title === 'Male' ? 'block' : 'hidden'}`} />
                                    <div className={currentVal === default_option ? `text-[#00080D]` : ''}>{currentVal.title}</div>
                                </div>
                            }
                            <div className="absolute top-0 right-0 flex flex-col h-full">
                                <div className="my-auto">
                                    {!enableSelect && <FaCaretDown />}
                                    {enableSelect && <FaCaretUp />}
                                </div>
                            </div>
                        </div>
                        {enableSelect && 
                            <div className={`absolute left-0 w-full shadow-xl ${option_board_class}`}>
                                <div className="max-h-80 overflow-y-auto text-[#00080D] dark:text-cyan-500">
                                    {option_li.map((item:any, index: number) => {
                                        return <div key={`index_${index}`} 
                                                    onClick={() => {updateCurrentVal(index)}}> 
                                                    {
                                                        typeof(item) === 'string' && data_type === undefined &&
                                                        <div className={`py-2 flex items-center justify-center border-[#00080D] cursor-pointer ${option_class} hover:opacity-75`}>
                                                            {item}
                                                        </div>
                                                    }
                                                    {
                                                        typeof(item) !== 'string' && enable_img !== true && data_type === undefined &&
                                                        <div className={`py-2 flex items-center justify-center border-[#00080D] cursor-pointer ${option_class} hover:opacity-75`}>
                                                            {item.title}
                                                        </div>
                                                    }
                                                    {
                                                        typeof(item) !== 'string' && enable_img === true && data_type === undefined &&
                                                        <div className={`py-2 flex items-center border-[#00080D] cursor-pointer ${option_class}`}>
                                                            <img src={item.img} className={`ml-2 ${img_class}`}></img>
                                                            <div className={` hover:opacity-75`}>
                                                                {item.title}
                                                            </div>
                                                        </div>
                                                        
                                                    }
                                                    {
                                                        typeof(item) !== 'string' && data_type === 'gender' &&
                                                        <div className={`py-2 flex items-center border-[#00080D] cursor-pointer ${option_class}`}>
                                                            <BsGenderFemale className={`ml-3 ${img_class} ${item.title === 'Female' ? 'block' : 'hidden'}`}/>
                                                            <BsGenderMale className={`ml-3 ${img_class} ${item.title === 'Male' ? 'block' : 'hidden'}`} />
                                                            <div className={` hover:opacity-75`}>
                                                                {item.title}
                                                            </div>
                                                        </div>
                                                    }
                                                    {index !== option_li.length - 1 && enable_underline && 
                                                        <div className="h-px bg-transparent mx-5"></div>    
                                                    }
                                                </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>        
                </div>
            </ClickOutside>

            
}

export default React.memo(SelectInput)