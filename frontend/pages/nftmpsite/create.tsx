import { useState, useReducer, FC } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import NFTMPLayout from "@components/common/Layouts/NFTMPLayout"
import {
    EtherLogo,
    BnbLogo,
    SolanaLogo,
    SingleTypeImg,
    MultiTypeImg
} from '@components/icon/IconImage'
import GradientBtn from "@components/ui/GradientBtn";


type StateType = {
    enableChooseChain: boolean,
    enableChooseType: boolean,
}

type ActionType = 
| {
    type: 'SET_CHOOSE_CHAIN',
    enableChooseChain: StateType['enableChooseChain'],
    enableChooseType: StateType['enableChooseType']
}
| {
    type: 'SET_CHOOSE_TYPE',
    enableChooseChain: StateType['enableChooseChain'],
    enableChooseType: StateType['enableChooseType']
}

function reducer(state: StateType, action: ActionType) {
    switch(action.type) {
        case 'SET_CHOOSE_CHAIN':
            return {
                ...state,
                enableChooseChain: true,
                enableChooseType: false
            }
        case 'SET_CHOOSE_TYPE':
            return {
                ...state,
                enableChooseChain: false,
                enableChooseType: true
            }
    }
}


const NFTCreatePage:FC = () => {
    let coin_list = [
        {title: 'Ethereum', icon: <EtherLogo />, chainId: 1},
        {title: 'BSC', icon: <BnbLogo />, chainId: 56},
        {title: 'Solana', icon: <SolanaLogo />, chainId: 245022926},
    ]
    let initialState = {
        enableChooseChain: true,
        enableChooseType: false,        
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return <>
        <NFTMPLayout>
            {/* choose blockchain part */}
            <div className="flex flex-col mx-auto mb-10 px-10 text-blackn dark:text-white max-w-6xl">
                <span className="mt-24 text-center text-4xl font-bold text-white dark:text-dark_18e9d9">Choose Blockchain</span>
                <p className=" mt-5 text-xl text-center">Choose the most suitable blockchain for your needs. <br />You need to sign in for creation</p>
                <div className="grid grid-cols-3 gap-x-10 mt-10">
                    {coin_list.map((item, idx) => {
                        return <div key={`cointype_${idx}`} className="relative flex flex-col py-20 px-5 gap-y-10 w-full bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-lg">
                            <div className="mx-auto flex flex-col justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-2">
                                {item.icon}
                            </div>
                            <span className="text-center text-3xl font-bold">{item.title}</span>
                            <div className="flex flex-col mx-auto justify-center">
                                <GradientBtn onClick={() => { }} txt='Create' />
                            </div>
                            <span className='absolute top-4 right-4 bg-gray-500 w-10 h-10 rounded-full'>Sign In</span>
                        </div>
                    })}
                </div>
            </div>

            {/* choose type */}
            {state.enableChooseType &&
                <div className="flex flex-col mx-auto mb-10 px-10 text-blackn dark:text-white max-w-4xl">
                    <span className="mt-24 text-center text-4xl font-bold text-white dark:text-dark_18e9d9">Choose Type</span>
                    <p className=" mt-5 text-xl text-center">Choose “Single” for one of a kind or “Multiple” if you want to sell one collectible multiple times</p>
                    <div className="grid grid-cols-2 gap-x-10 mt-10">
                        <div className="flex flex-col pt-20 pb-10 px-5 gap-y-5 w-full bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-lg">
                            <div className="mx-auto flex flex-col justify-center">
                                <Image src={SingleTypeImg} />
                            </div>
                            <span className="text-center text-3xl font-bold">Single</span>
                            <p className='text-center'>If you want to highlight the uniqueness and individuality of your item</p>
                            <div className="flex flex-col mx-auto mt-5 justify-center">
                                <GradientBtn onClick={() => { }} txt='Create' />
                            </div>
                        </div>
                        <div className="flex flex-col pt-20 pb-10 px-5 gap-y-5 w-full bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-lg">
                            <div className="mx-auto flex flex-col justify-center">
                                <Image src={MultiTypeImg} />
                            </div>
                            <span className="text-center text-3xl font-bold">Multiple</span>
                            <p className='text-center'>If you want to share your item with a large number of community members</p>
                            <div className="flex flex-col mx-auto mt-5 justify-center">
                                <GradientBtn onClick={() => { }} txt='Create' />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </NFTMPLayout>
    </>
}


export default NFTCreatePage
