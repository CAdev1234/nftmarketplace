import { useState, useReducer, FC } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import NFTMPLayout from "@components/common/Layouts/NFTMPLayout"
import {
    EtherLogo,
    BnbLogo,
    SolanaLogo,
    SingleTypeImg,
    MultiTypeImg,
    BsPencilFill,
    FaInfinity,
    MdTimelapse,
} from '@components/icon/IconImage'
import GradientBtn from "@components/ui/GradientBtn";
import { useAuth } from '@components/contexts/AuthContext'
import UploadForm from '@components/ui/UploadForm'


type StateType = {
    enableChooseChain: boolean,
    enableChooseType: boolean,
    enableCreateModal: boolean,
    priceMarketOptionIdx: number
}

type ActionType = 
| {
    type: 'SET_CHOOSE_CHAIN',
}
| {
    type: 'SET_CHOOSE_TYPE',
}
| {
    type: 'SET_CREATE_MODAL',
    enableCreateModal: StateType['enableCreateModal']
}
| {
    type: 'SET_MARKET_PRICE_OPTION_IDX',
    priceMarketOptionIdx: StateType['priceMarketOptionIdx']
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
        case 'SET_CREATE_MODAL':
            return {
                ...state,
                enableCreateModal: action.enableCreateModal
            }
        case 'SET_MARKET_PRICE_OPTION_IDX':
            return {
                ...state,
                priceMarketOptionIdx: action.priceMarketOptionIdx
            }
    }
}


const NFTCreatePage:FC = () => {
    let coin_list = [
        {title: 'Ethereum', icon: <EtherLogo />, chainId: 1},
        {title: 'BSC', icon: <BnbLogo />, chainId: 56},
        {title: 'Solana', icon: <SolanaLogo />, chainId: 245022926},
    ]
    let marketPriceOptions = [
        {title: 'Fixed Price', ele: <BsPencilFill />},
        {title: 'Open for bids', ele: <FaInfinity />},
        {title: 'Timed auction', ele: <MdTimelapse />}
    ]
    let initialState = {
        enableChooseChain: true,
        enableChooseType: false,
        enableCreateModal: false,
        priceMarketOptionIdx: 0,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const {authChainId} = useAuth()
    

    const chooseTypeHandler = () => {
        dispatch({
            type: "SET_CHOOSE_TYPE"
        })
    }

    const createModalHanlder = () => {
        if (state.enableCreateModal) {
            document.querySelector('body')?.setAttribute("style", "overflow: auto")
        }else {
            document.querySelector('body')?.setAttribute("style", "overflow: hidden")
        }
        dispatch({
            type: 'SET_CREATE_MODAL',
            enableCreateModal: !(state.enableCreateModal)
        })
    }

    const selectPriceOptionHandler = (idx: number) => {
        dispatch({
            type: "SET_MARKET_PRICE_OPTION_IDX",
            priceMarketOptionIdx: idx
        })
    }

    return <>
        <NFTMPLayout>
            {/* choose blockchain part */}
            {state.enableChooseChain &&
                <div className="flex flex-col mx-auto mt-20 mb-24 px-10 text-blackn dark:text-white max-w-6xl">
                    <span className="title-4xl text-center">Choose Blockchain</span>
                    <p className=" mt-5 text-xl text-center">Choose the most suitable blockchain for your needs. <br />You need to sign in for creation</p>
                    <div className="grid grid-cols-3 gap-x-10 mt-10">
                        {coin_list.map((item, idx) => {
                            return <div key={`cointype_${idx}`} className="relative flex flex-col py-20 px-5 gap-y-10 w-full bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-lg">
                                <div className="mx-auto flex flex-col justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-2">
                                    {item.icon}
                                </div>
                                <span className="text-center text-3xl font-bold">{item.title}</span>
                                <div className="flex flex-col mx-auto justify-center">
                                    <GradientBtn onClick={() => {chooseTypeHandler()}} txt={`${authChainId === item.chainId ? 'Create' : 'Sign In'}`} />
                                </div>
                                {authChainId === item.chainId &&
                                    <span className='absolute top-2 right-2 px-3 py-1 text-dark_18e9d9 bg-cyan-600 bg-opacity-50 rounded-xl'>Signed in</span>
                                }
                            </div>
                        })}
                    </div>
                </div>
            }
            

            {/* choose type */}
            {state.enableChooseType &&
                <div className="flex flex-col mx-auto mb-24 px-10 text-blackn dark:text-white max-w-4xl">
                    <span className="title-4xl mt-24 text-center">Choose Type</span>
                    <p className=" mt-5 text-xl text-center">Choose “Single” for one of a kind or “Multiple” if you want to sell one collectible multiple times</p>
                    <div className="grid grid-cols-2 gap-x-10 mt-10">
                        <div className="flex flex-col pt-20 pb-10 px-5 gap-y-5 w-full bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-lg">
                            <div className="mx-auto flex flex-col justify-center">
                                <Image src={SingleTypeImg} />
                            </div>
                            <span className="text-center text-3xl font-bold">Single</span>
                            <p className='text-center'>If you want to highlight the uniqueness and individuality of your item</p>
                            <div className="flex flex-col mx-auto mt-5 justify-center">
                                <GradientBtn onClick={() => {createModalHanlder()}} txt='Create' />
                            </div>
                        </div>
                        <div className="flex flex-col pt-20 pb-10 px-5 gap-y-5 w-full bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-lg">
                            <div className="mx-auto flex flex-col justify-center">
                                <Image src={MultiTypeImg} />
                            </div>
                            <span className="text-center text-3xl font-bold">Multiple</span>
                            <p className='text-center'>If you want to share your item with a large number of community members</p>
                            <div className="flex flex-col mx-auto mt-5 justify-center">
                                <GradientBtn onClick={() => {createModalHanlder()}} txt='Create' />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/* create modal */}
            {state.enableCreateModal &&
                <div className='fixed top-0 left-0 bg-black bg-opacity-50 dark:bg-opacity-80 w-full h-screen flex flex-col text-black dark:text-white z-10'>
                    <div className='bg-slate-600 bg-opacity-50 backdrop-blur-sm w-9/12 max-w-2xl max-h-[800px] py-10 px-5 m-auto rounded-xl overflow-y-auto'>
                        <div className='title-4xl'>Create single item on Ethereum</div>
                        <div className='mt-10 text-xl'>Upload file</div>
                        <div className='mt-5'><UploadForm /></div>
                        <div className='mt-10'>
                            <span className='text-xl'>Put on marketplace</span>
                            <div className='mt-5 grid grid-cols-3 gap-x-5'>
                                {marketPriceOptions.map((item, idx) => {
                                    return <div key={`price_item_${idx}`} className={`flex flex-col rounded-xl aspect-square border ${idx === state.priceMarketOptionIdx ? 'border-dark_18e9d9' : 'border-white'} border-dashed cursor-pointer`}
                                        onClick={() => {selectPriceOptionHandler(idx)}}>
                                        <div className='m-auto flex flex-col text-3xl'>
                                            <div className='mx-auto'>{item.ele}</div>
                                            <span className='text-xl mt-3'>{item.title}</span>
                                        </div>
                                        
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='mt-10 flex flex-col'>
                            <span className='text-xl mb-5'>Price</span>
                            <input type='number' className='bg-transparent border-b border-dashed border-white h-[30px] px-2' />
                        </div>

                        <div className='mt-10 flex flex-col'>
                            <span className='text-xl mb-5'>Name</span>
                            <input type='text' className='bg-transparent border-b border-dashed border-white h-[30px] px-2' placeholder='e.g. "Redeemable T-Shirt with logo"' />
                        </div>

                        <div className='mt-10 flex flex-col'>
                            <span className='text-xl mb-5'>Description (Optional)</span>
                            <textarea className='bg-transparent border-b border-dashed border-white overflow-y-hidden px-2' 
                                placeholder='e. g. "After purchasing you will be able to get the real T-Shirt"'
                                rows={4} />
                        </div>
                        
                        <div className='mt-10 flex items-center gap-x-5'>
                            <GradientBtn onClick={() => {}} txt="Create" />
                            <GradientBtn onClick={() => {createModalHanlder()}} txt="Cancel" />
                        </div>
                    </div>
                </div>
            }

        </NFTMPLayout>
    </>
}


export default NFTCreatePage
