import SiteLayout from '@components/common/Layouts/SiteLayout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <SiteLayout>
        <div className='text-white'>Home Page</div>
        
      </SiteLayout>
    </>
  )
}

export default Home
