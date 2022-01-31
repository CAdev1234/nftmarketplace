import { createContext, FC, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    theme: boolean,
    toggleTheme: () => void
}
const defaultTheme: ThemeContextType = {
    // if theme is true, current theme is light, else current theme is dark
    theme: true,
    toggleTheme: () => {}
}

const ThemeContext = createContext<ThemeContextType>(defaultTheme)
export function useTheme() {
    return useContext(ThemeContext)
}

export const ThemeProvider:FC = ({ children }) => {
    const [theme, setTheme] = useState(true)
    const toggleTheme = () => {
        if (theme) {
            window.localStorage.setItem('theme', 'dark')
        }else {
            window.localStorage.setItem('theme', 'light')
        }
        setTheme(!theme)
        const root = window.document.documentElement
        root.classList.remove(theme ? 'light' : 'dark')
        root.classList.value = theme ? 'dark' : 'light'
    }
    const value = {
        theme,
        toggleTheme
    }

    useEffect(() => {
        var defaultVal = window.localStorage.getItem('theme')
        const root = window.document.documentElement
        if (defaultVal) {
            root.classList.value = defaultVal
        }else {
            root.classList.value = 'light'
            window.localStorage.setItem('theme', 'light')
        }
    }, [])

    return (
        <ThemeContext.Provider 
            value={value}
        >{children}</ThemeContext.Provider>
    );
}




