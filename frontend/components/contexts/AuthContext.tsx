import { LS_ACCOUNT_KEY } from '@components/contant'
import { createContext, FC, useContext, useEffect, useState } from 'react'


interface AuthContextType {
    authLogined: boolean,
    authAddress: string,
    authChainId: number,
    authProvider: any,
    authLogin: (address: string, chainId: number, provider: any) => void,
    // login: () => void,
    authLogout: () => void
}
const authDefaultContext: AuthContextType = {
    authLogined: false,
    authAddress: '',
    authChainId: -1,
    authProvider: null,
    authLogin: () => {},
    authLogout: () => {}
}

const AuthContext = createContext<AuthContextType>(authDefaultContext)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider:FC = ({children}) => {
    const [authLogined, setAuthLogined] = useState(false)
    const [authAddress, setAuthAddress] = useState('')
    const [authChainId, setAuthChainId] = useState(-1)
    const [authProvider, setAuthProvider] = useState(null)
    const authLogin = (address: string, chainId: number, provider: any) => {
        setAuthLogined(true)
        setAuthAddress(address)
        setAuthChainId(chainId)
        setAuthProvider(provider)
        window.localStorage.setItem(LS_ACCOUNT_KEY, JSON.stringify({authAddress: address, authChainId: chainId, authLogined: true}))
    }
    const authLogout = () => {
        setAuthLogined(false)
        setAuthAddress('')
        setAuthChainId(-1)
        setAuthProvider(null)
    }
    const value = {
        authLogined,
        authAddress,
        authChainId,
        authProvider,
        authLogin,
        authLogout
    }

    useEffect(() => {
        var defaultVal = window.localStorage.getItem(LS_ACCOUNT_KEY)
        if (defaultVal) {
            defaultVal = JSON.parse(defaultVal)
            console.log(defaultVal)
            setAuthLogined(defaultVal?.authLogined)
            setAuthAddress(defaultVal?.authAddress)
            setAuthChainId(defaultVal?.authChainId)
        }
    }, [])
    return (
        <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
    )
} 