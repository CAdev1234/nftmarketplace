import { FC } from "react"

interface GradientBtnProps {
    txt: string,
    onClick?: () => void,
}
const GradientBtn:FC<GradientBtnProps> = ({txt, onClick}) => {
    return <>
        <button className="bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 rounded-full text-white font-semibold flex flex-col
                            transform hover:scale-105 ease-out duration-700"
            onClick={onClick}>{txt}</button>
    </>
}

export default GradientBtn