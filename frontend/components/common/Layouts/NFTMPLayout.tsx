import { useState, useEffect, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchInput from "@components/ui/SearchInput"
import SiteLayout from "./SiteLayout"
const NFTMPLayout:FC = ({ children }) => {
    let navItems = [
        {title: 'Explore', link: '/nftmpsite/explore'},
        {title: 'My Profile', link: '/nftmpsite/profile'},
        {title: 'Following', link: '/nftmpsite/following'},
        {title: 'Activity', link: '/nftmpsite/activity'},
        {title: 'How it works', link: '/nftmpsite/howitwork'},
        {title: 'Community', link: '/nftmpsite/community'},
        {title: 'Create', link: '/nftmpsite/create'}
    ]
    const router = useRouter()
    return (
        <SiteLayout>
            <div className="px-10 mt-5 w-full flex items-center text-black dark:text-white">
                <div className='w-full flex items-center gap-x-5'>
                    <SearchInput />
                    {navItems.map((item, idx) => {
                        return <div key={`nav_${idx}`} className='font-semibold flex items-center text-md cursor-pointer'>
                            <Link href={item.link}>
                                <span className={`${router.pathname === item.link ? ' text-dark_18e9d9' : ''}`}>{item.title}</span>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
            {children}
        </SiteLayout>
    )
}

export default NFTMPLayout