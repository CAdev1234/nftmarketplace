import Image from 'next/image'
import { 
    BsTwitter,
    BsInstagram,
    FaDiscord,
    FaTelegramPlane 
} from "@components/icon/IconImage"

const Footer = () => {
    let cate_li = [
        {title: 'Option 1', link: ''},
        {title: 'Option 2', link: ''},
        {title: 'Option 3', link: ''},
        {title: 'Option 4', link: ''},
        {title: 'Option 5', link: ''},
        {title: 'Option 6', link: ''},
    ]
    let page_li = [
        {title: 'About us', link: ''},
        {title: 'Terms of use', link: ''},
        {title: 'Privacy Policy', link: ''},
        {title: 'Disclaimer', link: ''},
        {title: 'Methodology', link: ''},
        {title: 'Careers', link: ''},
    ]
    let support_li = [
        {title: 'Request Form', link: ''},
        {title: 'Contact Support', link: ''},
        {title: 'FAQ', link: ''},
        {title: 'Glossary', link: ''},
    ]
    return (
        <>
            <div className="w-full text-black dark:text-white flex flex-col text-sm font-normal pt-12 sm:pt-20 shadow-lg bg-white bg-opacity-50 backdrop-blur-md dark:bg-slate-700 dark:bg-opacity-50">
                <div className="pb-14
                                px-10
                                block md:flex">
                    <div className="flex flex-col
                                    max-w-none md:max-w-md lg:max-w-lg xl:max-w-xl
                                    text-left">
                        <div className="font-semibold leading-normal
                                        text-base md:text-xl lg:text-xl xl:text-[22px]">Quis nostrud exercitation ullamco</div>
                        <div className="font-semibold
                                        text-2xl md:text-3xl lg:text-3xl xl:text-4xl
                                        leading-normal md:leading-normal lg:leading-normal xl:leading-normal">Lorem ipsum dolor sit amet.</div>
                        <div className="font-normal mt-1
                                        text-xs md:text-sm">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</div>
                        
                    </div>

                    <div className="grid grid-cols-3 flex-1 w-full
                                    mt-20 md:mt-0">
                        <div className="flex flex-col mr-auto
                                        ml-0 sm:ml-auto">
                            <div className="leading-snug font-semibold
                                            text-sm md:text-lg lg:text-xl xl:text-22px">Category 1</div>
                            {cate_li.map((item, index) => {
                                return <div key={`category_${index}`} className="mt-5 transform hover:scale-110 ease-out duration-700 cursor-pointer text-xs sm:text-sm ">{item.title}</div>
                            })}
                        </div>

                        <div className="flex flex-col mx-auto">
                            <div className="leading-snug font-semibold
                                            text-sm md:text-lg lg:text-xl xl:text-22px">Company</div>
                            {page_li.map((item, index) => {
                                return <div key={`page_${index}`} className="mt-5">
                                            <div className="transform hover:scale-110 ease-out duration-700 cursor-pointer
                                                            text-xs sm:text-sm">{item.title}</div>        
                                            <div className={`text-c_E5BE3D leading-normal font-normal ${item.title === 'Careers' ? 'block' : 'hidden'}
                                                            text-10px sm:text-xs`}>We are hiring!</div>
                                        </div>
                            })}
                        </div>

                        <div className="flex flex-col mx-auto">
                            <div className="leading-snug font-semibold
                                            text-sm md:text-lg lg:text-xl xl:text-22px">Support</div>
                            {support_li.map((item, index) => {
                                return <div key={`support_${index}`} 
                                            className="mt-5 transform hover:scale-110 ease-out duration-700 cursor-pointer 
                                                        text-xs sm:text-sm">{item.title}</div>
                            })}
                        </div>
                    </div>
                </div>

                <div className="block sm:hidden">
                    <div className="text-center">Follow us on</div>
                    <div className="flex items-center justify-center py-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2
                                        ">
                            <BsTwitter className=" text-c_1564C0 dark:text-white"/>
                        </div>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ml-8 cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2">
                            <BsInstagram className=" text-c_1564C0 dark:text-white"/>
                        </div>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ml-8 cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2">
                            <FaTelegramPlane className="text-c_1564C0 dark:text-white"/>
                        </div>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ml-8 cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2">
                            <FaDiscord className="text-c_1564C0 dark:text-white"/>
                        </div>
                    </div>
                </div>
                
                <div className="bg-dark_18e9d9 dark:bg-dark_0fc9f2 h-0.5 w-full"></div>

                <div className="py-5 items-center
                                block sm:flex
                                px-10">
                    <div className="text-center sm:text-left">© 2021 Ruat. All rights reserved</div>
                    <div className="ml-auto items-center
                                    hidden sm:flex">
                        <div className="">Follow us on</div>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2
                                        ml-auto sm:ml-9">
                            <BsTwitter className=" text-c_1564C0 dark:text-black"/>
                        </div>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center ml-4 cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2">
                            <BsInstagram className=" text-c_1564C0 dark:text-black"/>
                        </div>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center ml-4 cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2">
                            <FaTelegramPlane className="text-c_1564C0 dark:text-black"/>
                        </div>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center ml-4 cursor-pointer transform hover:scale-110 ease-out duration-700
                                        bg-white dark:bg-dark_0fc9f2">
                            <FaDiscord className="text-c_1564C0 dark:text-black"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer