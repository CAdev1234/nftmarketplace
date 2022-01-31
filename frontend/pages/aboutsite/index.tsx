import dynamic from 'next/dynamic'
import AboutLayout from "@components/common/Layouts/AboutLayout"

export default function AboutSite() {
    return (
        <AboutLayout>
            <div className='text-white'>About Page</div>
        </AboutLayout>
        
        
    )
}

// AboutSite.getLayout = function getLayout(page) {
//     return (
//         <AboutLayout>
//             {page}
//         </AboutLayout>
//     )
// }
