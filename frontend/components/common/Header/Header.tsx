import { FC, useCallback, useEffect, useReducer, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from 'ethers'
import WalletLink from "walletlink";
import { useTheme } from '@components/contexts/ThemeContext'
import {
    BsGlobe2,
    BsCurrencyDollar,
    BsList,
    Logo
} from '@components/icon/IconImage'

import SelectInput from "@components/ui/SelectInput"
import ThemeToggle from "@components/ui/ThemeToggle/ThemeToggle"
import ScrollUpBtn from "@components/ui/ScrollUpBtn"
import GradientBtn from "@components/ui/GradientBtn"
import { useAuth } from '@components/contexts/AuthContext'

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: INFURA_ID, // required
        },
    },
    'custom-walletlink': {
        display: {
          logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
          name: 'Coinbase',
          description: 'Connect to Coinbase Wallet (not Coinbase App)',
        },
        options: {
          appName: 'Coinbase', // Your app name
          networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
          chainId: 1,
        },
        package: WalletLink,
        connector: async (_: any, options: any) => {
          const { appName, networkUrl, chainId } = options
          const walletLink = new WalletLink({
            appName,
          })
          const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
          await provider.enable()
          return provider
        },
    },
};

let language_li = ['English', 'Hindi', 'Russian']
let currency_li = ['USD', 'Rupee', 'Ruble']
const initialState = {
    language: language_li[0],
    currency: currency_li[0],
    provider: null,
    web3Provider: null,
    address: '',
    chainId: 0,
}

type StateType = {
    language: string,
    currency: string,
    provider?: any
    web3Provider?: any
    address?: string
    chainId?: number
  }
  
type ActionType =
| {
    type: 'SET_LANGUAGE',
    language: StateType['language']
}
| {
    type: 'SET_CURRENCY',
    currency: StateType['currency']
}
| {
    type: 'SET_WEB3_PROVIDER'
    provider?: StateType['provider']
    web3Provider?: StateType['web3Provider']
    address?: StateType['address']
    chainId?: StateType['chainId']
}
| {
    type: 'SET_ADDRESS'
    address?: StateType['address']
}
| {
    type: 'SET_CHAIN_ID'
    chainId?: StateType['chainId']
}
| {
    type: 'RESET_WEB3_PROVIDER'
}




function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.language
            }
        case 'SET_CURRENCY':
            return {
                ...state,
                currency: action.currency
            }
        case 'SET_WEB3_PROVIDER':
            return {
                ...state,
                provider: action.provider,
                web3Provider: action.web3Provider,
                address: action.address,
                chainId: action.chainId,
            }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address,
            }
        case 'SET_CHAIN_ID':
            return {
                ...state,
                chainId: action.chainId,
            }
        case 'RESET_WEB3_PROVIDER':
            return initialState
        default:
            throw new Error()
    }
  }

let web3Modal: Web3Modal | null;
if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true,
      providerOptions, // required
    })
}


const Header : FC = () => {
    let nav_li = [
        { title: 'DEX', link: '/dexsite' },
        { title: 'NFT Marketplace', link: '/nftmpsite' },
        { title: 'About', link: '/aboutsite' },
        { title: 'Chart', link: '/chartsite' },
        { title: 'FAQs', link: '/faqsite' }
    ]

    const router = useRouter()
    const { theme } = useTheme()
    const { logined, login, logout } = useAuth()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { language, currency, provider, web3Provider, address, chainId } = state

    

    const updateLanguageHandler = (str: string) => {
        dispatch({
            type: 'SET_LANGUAGE',
            language: str
        })
    }

    const updateCurrencyHandler = (str: string) => {
        dispatch({
            type: 'SET_CURRENCY',
            currency: str
        })
    }

    const connectWalletHandler = useCallback(async() => {
        try {
            web3Modal = new Web3Modal({
                network: "mainnet", // optional
                disableInjectedProvider: false,
                cacheProvider: false, // optional
                providerOptions // required
            })
            web3Modal.clearCachedProvider()
            const provider = await web3Modal.connect();
            const web3Provider = new providers.Web3Provider(provider)
            const signer = web3Provider.getSigner()
            const address = await signer.getAddress()
            const network = await web3Provider.getNetwork()
            dispatch({
                type: 'SET_WEB3_PROVIDER',
                provider,
                web3Provider,
                address,
                chainId: network.chainId,
            })
            login(address, network.chainId, provider)
            console.log(web3Provider)
            
            
        } catch (error) {
            console.log(error)
        }
    }, [])

    const disconnectWalletHandler = useCallback(async () => {
            web3Modal = new Web3Modal({
                network: "mainnet", // optional
                disableInjectedProvider: true,
                cacheProvider: false, // optional
                providerOptions // required
            })
            await web3Modal.clearCachedProvider()
            if (provider.disconnect && typeof provider.disconnect === 'function') {
                await provider.disconnect()
            }
            dispatch({
                type: 'RESET_WEB3_PROVIDER',
            })
        },
        [provider]
    )


    // Auto connect to the cached provider
    useEffect(() => {
        if (web3Modal === null) return
        if (web3Modal.cachedProvider) {
            connectWalletHandler()
        }
    }, [connectWalletHandler])


    // A `provider` should come with EIP-1193 events. We'll listen for those events
    // here so that when a user switches accounts or networks, we can update the
    // local React state with that new information.
    useEffect(() => {
        if (!provider) return
        if (provider.on) {
            const handleAccountsChanged = (accounts: any) => {
                // eslint-disable-next-line no-console
                console.log('accountsChanged', accounts)
                dispatch({
                    type: 'SET_ADDRESS',
                    address: accounts[0],
                })
            }

            // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
            const handleChainChanged = (_hexChainId: any) => {
                window.location.reload()
            }

            const handleDisconnect = (error: any) => {
                // eslint-disable-next-line no-console
                console.log('disconnect', error)
                disconnectWalletHandler()
            }

            provider.on('accountsChanged', handleAccountsChanged)
            provider.on('chainChanged', handleChainChanged)
            provider.on('disconnect', handleDisconnect)

            // Subscription Cleanup
            return () => {
                if (provider.removeListener) {
                provider.removeListener('accountsChanged', handleAccountsChanged)
                provider.removeListener('chainChanged', handleChainChanged)
                provider.removeListener('disconnect', handleDisconnect)
                }
            }
        }
    }, [provider, disconnectWalletHandler])

    return (
        <>
            <div className={`sticky top-0 left-0 z-10 flex items-center w-full px-10 bg-white bg-opacity-50 backdrop-blur-md dark:bg-slate-700 dark:bg-opacity-50 shadow-md`}>
                <div className="flex">
                    <Logo color={`${!theme ? '#18e9d9' : '#06b5d4'}`} className="" />
                </div>
                <div className="flex items-center mx-auto gap-x-10">
                    <div className={`font-semibold flex items-center text-lg cursor-pointer ${router.pathname === '/' ? 'text-black dark:text-dark_18e9d9' : 'text-black dark:text-white'}`}>
                        <span className="ml-2 transform hover:scale-110 ease-out duration-700">
                            <Link href='/'>Home</Link>
                        </span>
                        
                    </div>
                    {nav_li.map((item, index) => {
                        return <div key={`menu_${index}`}
                            className={`font-semibold flex items-center text-lg cursor-pointer ${String(router.pathname).includes(item.link) ? 'text-black dark:text-dark_18e9d9' : 'text-black dark:text-white'}`}
                        >
                            <span className="ml-2 transform hover:scale-110 ease-out duration-700">
                                <Link href={item.link}>{item.title}</Link>
                            </span>
                        </div>
                    })}
                </div>

                <div className="items-center pb-6
                          pt-3 sm:pt-6
                          block sm:flex">
                    <div className="flex items-center
                                        px-5 sm:px-6
                                        ml-0 sm:ml-auto
                                        mb-3 sm:mb-0">
                        <div className="flex items-center">
                            <BsGlobe2 className="text-cyan-500 dark:text-dark_18e9d9 ml-1" />
                            <div className="ml-3">
                                <SelectInput
                                    className="text-xs text-cyan-500 dark:text-dark_18e9d9 font-semibold w-16"
                                    option_board_class="bg-[#F8F9FB] dark:bg-gray-900 top-5 z-10"
                                    option_li={language_li}
                                    default_option={language_li[0]}
                                    returnVal={updateLanguageHandler}
                                />
                            </div>
                        </div>
                        <div className="flex items-center
                                            ml-auto sm:ml-8
                                            mr-auto sm:mr-0">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center p-0.5 border border-dark_18e9d9">
                                <BsCurrencyDollar className="text-white dark:text-dark_18e9d9" />
                            </div>
                            <div className="ml-3">
                                <SelectInput
                                    className="text-xs text-cyan-500 dark:text-dark_18e9d9 font-semibold w-16"
                                    option_board_class="bg-[#F8F9FB] dark:bg-gray-900 top-5 z-10"
                                    option_li={currency_li}
                                    default_option={currency_li[0]}
                                    returnVal={updateCurrencyHandler}
                                />
                            </div>
                        </div>
                        <div className="ml-0 sm:ml-10">
                            <ThemeToggle />
                        </div>
                    </div>
                    <div className="h-0.5 w-full
                                        block sm:hidden
                                        bg-[#E8EBF1] dark:bg-dark_0fc9f2"></div>
                    <div className="flex items-center
                                        px-5 sm:px-6
                                        mt-5 sm:mt-0">
                        <div className="rounded-full w-7 h-7 items-center justify-center text-xl cursor-pointer font-bold text-white bg-c_1564C0 dark:bg-dark_0fc9f2
                                            flex sm:hidden">
                            <BsList className="stroke-1" />
                            
                        </div>
                        <div className="block sm:hidden pl-4">
                            <Logo color={`${!theme ? '#0fc9f2' : '#1564c0'}`} className="" />
                        </div>
                        <GradientBtn onClick={() => { connectWalletHandler() }} txt={address ? address : 'Connect Wallet'} />
                    </div>
                </div>
            </div>

            <ScrollUpBtn />


            
        </>
    )
}

export default Header