import dynamic from 'next/dynamic'
import DexLayout from "@components/common/Layouts/DexLayout"
import SiteLayout from '@components/common/Layouts/SiteLayout'

export default function DexSite() {
    return (
        <SiteLayout>
            <DexLayout>
                <div className='text-white'>Dex Page</div>
            </DexLayout>
        </SiteLayout>
        
    )
}
