import { FC } from 'react'
import dynamic from 'next/dynamic'
import NFTMPLayout from "@components/common/Layouts/NFTMPLayout"

const NFTCommunityPage:FC = () => {
    return <>
        <NFTMPLayout>
            <div className='text-white'>Community page</div>
        </NFTMPLayout>
    </>
}

export default NFTCommunityPage
