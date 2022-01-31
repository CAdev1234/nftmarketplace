import SiteLayout from '@components/common/Layouts/SiteLayout'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const Layout = SiteLayout
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
