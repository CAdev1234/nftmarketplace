import dynamic from 'next/dynamic'
import ChartLayout from "@components/common/Layouts/ChartLayout"
import SiteLayout from '@components/common/Layouts/SiteLayout'

export default function ChartSite() {
    return (
        <SiteLayout>
            <ChartLayout>
                <div className='text-white'>Chart Page</div>
            </ChartLayout>
        </SiteLayout>
    )
}

