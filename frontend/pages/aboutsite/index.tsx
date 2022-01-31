import dynamic from 'next/dynamic'
import AboutLayout from "@components/common/Layouts/AboutLayout"
import SiteLayout from '@components/common/Layouts/SiteLayout'

export default function AboutSite() {
    return (
        <SiteLayout>
            <AboutLayout>
                <div className='text-white'>About Page</div>
            </AboutLayout>
        </SiteLayout>
        
        
    )
}

// AboutSite.getLayout = function getLayout(page) {
//     return (
//         <AboutLayout>
//             {page}
//         </AboutLayout>
//     )
// }
