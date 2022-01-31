import { createContext, FC, useContext, useState } from 'react'


interface AuthContextType {
    logined: boolean,
    address: string,
    chainId: number,
    provider: any,
    login: (address: string, chainId: number, provider: any) => void,
    logout: () => void
}

const authDefaultContext: AuthContextType = {
    logined: false,
    address: '',
    chainId: -1,
    provider: null,
    login: () => {},
    logout: () => {}
}

const AuthContext = createContext<AuthContextType>(authDefaultContext)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider:FC = ({children}) => {
    const [logined, setLogined] = useState(false)
    const [address, setAddress] = useState('')
    const [chainId, setChainId] = useState(-1)
    const [provider, setProvider] = useState(null)
    const login = (address: string, chainId: number, provider: any) => {
        setLogined(true)
        setAddress(address)
        setChainId(chainId)
        setProvider(provider)
    }
    const logout = () => {
        setLogined(false)
        setAddress('')
        setChainId(-1)
        setProvider(null)
    }
    const value = {
        logined,
        address,
        chainId,
        provider,
        login,
        logout
    }
    return (
        <AuthContext.Provider
            value={value}
        >{children}</AuthContext.Provider>
    )
} 