import { ThemeProvider } from "@components/contexts/ThemeContext"
import { AuthProvider } from "@components/contexts/AuthContext"
import { FC } from "react"
import Footer from "@components/common/Footer"
import Header from "@components/common/Header/"

const SiteLayout : FC = ({ children }) => {
    return <>
        <div className='min-h-screen flex flex-col bg-red-100 dark:bg-slate-800'>
            <ThemeProvider>
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </ThemeProvider>
        </div>
    </>
}

export default SiteLayout