import dynamic from 'next/dynamic'
import NFTMPLayout from "@components/common/Layouts/NFTMPLayout"

import {
    CameraImg,
    ThreeDImg,
    ArtImg,
    CartoonImg,
    DomainImg,
    GameImg,
    MemeImg,
    MusicImg,
    PixelArtImg,
    VideoImg,

    walletImg,
    collectImg,
    nftImg,
    saleImg
} from '@components/icon/IconImage'
import MyKeenSlider from '@components/ui/KeenSlider';
import GradientBtn from '@components/ui/GradientBtn';
import MyImage from '@components/ui/MyImage';
import SiteLayout from '@components/common/Layouts/SiteLayout';


const NFTMPSite = () => {
    let categories = [
        {title: 'Photography', img: CameraImg},
        {title: '3D', img: ThreeDImg},
        {title: 'Art', img: ArtImg},
        {title: 'Cartoon', img: CartoonImg},
        {title: 'Domain', img: DomainImg},
        {title: 'Game', img: GameImg},
        {title: 'Memes', img: MemeImg},
        {title: 'Music', img: MusicImg},
        {title: 'Pixel Art', img: PixelArtImg},
    ]

    let how_li = [
        {title: "Set up your wallet", detail: "Create your Binance Smart Chain (BEP-20) wallet on Metamask then connect your wallet to our website to get started.", img: walletImg},
        {title: "Create Your Collection", detail: "Get creative and make your own collection of NFTs—be it art, music, photos, or any other digital assets. The sky’s the limit!", img: collectImg},
        {title: "Add your NFTs", detail: "Add your NFTs to the expanding digital asset collections on the blockchain by minting them on our marketplace.", img: nftImg},
        {title: "List them for sale", detail: "Start trading your NFTs. Buy, sell, and auction your favorite collections on the most innovative NFT marketplace on BSC.", img: saleImg},
    ]

    let topTrendingEle = [0,1,2,3,4,5,56,6,67,7,7,7].map((item, idx) => {
        return <div className="keen-slider__slide" key={`item_${idx}`}>
            <div className=' bg-white bg-opacity-10 backdrop-blur-sm px-10 py-20 rounded-xl aspect-[3/4]'></div>
        </div>
    })

    let collectionWeek = [0,1,2,3,4,5].map((item, idx) => {
        return <div className="keen-slider__slide" key={`item_${idx}`}>
            <div className=' bg-white bg-opacity-10 backdrop-blur-sm px-10 py-20 rounded-xl aspect-[5/2]'></div>
        </div>
    })

    let topCollectors = [
        {username: 'Art_Geek', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_9635aae9.jpg'},
        {username: 'The Collector', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_c9be8980.gif'},
        {username: 'Flashing Mutant Apes', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_0a68d147.gif'},
        {username: 'the RJPjr', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_ee24ea4f.jpeg'},
        {username: 'Glowpunks', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_57391389.gif'},
        {username: 'Artfaces', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_f6d9865d.gif'},
        {username: 'Liama Palloza', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_b05d3411.jpg'},
        {username: 'Joetorious', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_5aac3506.gif'},
        {username: 'MetaAndroid', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_9635aae9.jpg'},
        {username: '0x34d...9324', items: 90, img: 'https://apix.empiretoken.world//profilepics/img_ee24ea4f.jpeg'},
    ]

    let upcommingFeature = [
        {title: 'Ethereum Chain', img: '', detail: 'We are currently working on launching the empire marketplace on Ethereum chain. Ethereum network will bring in a whole new sets of investors to empire'},
        {title: 'Solana Chain', img: '', detail: 'As we move forward with launching empire marketplace on different chains. Solana chain will be a great addition to it.'},
        {title: 'Launchpad', img: '', detail: 'Launchpad will help projects to fair launch their bulk NFTs through our markeplace.'},
    ]

    return (
        <NFTMPLayout>
            <div className="flex flex-col text-black dark:text-white">

                <div className="flex flex-col mt-12 px-10">
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Categories</span>
                    <div className="grid grid-cols-3 gap-4 mt-10">
                        {categories.map((item, idx) => {
                            return <div key={`category_${idx}`} className="relative w-full aspect-video cursor-pointer">
                                <MyImage src={item.img} className="w-full h-full rounded-xl shadow-lg" layout='fill' placeholder="blur" />
                                <span className='absolute bottom-5 left-5 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-3xl text-white font-bold'>{item.title}</span>
                            </div>
                        })}
                    </div>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>How To Create And Sell Your NFTs</span>
                    <div className='grid grid-cols-4 gap-x-10'>
                        {how_li.map((item, idx) => {
                            return <div key={`how_to_${idx}`} className="flex flex-col gap-y-5 bg-white shadow-lg dark:bg-slate-700 bg-opacity-50 backdrop-blur-sm p-5 rounded-lg">
                                <div className='relative w-20 h-20 p-5 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col'>
                                    <MyImage src={item.img} className="absolute w-full h-full" />
                                </div>
                                <span className='font-semibold text-2xl text-center'>{item.title}</span>
                                <span className='font-semibold text-md text-center'>{item.detail}</span>
                            </div>
                        })}
                    </div>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Featured Partnerships</span>
                    <span className='text-center text-xl font-bold'>New Partnerships Coming Soon...</span>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Top Trending Items</span>
                    <div>
                        <MyKeenSlider renderEle={topTrendingEle} numView={5} />
                    </div>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10 w-8/12 mx-auto'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Collection of The Week</span>
                    <div className='w-full'>
                        <MyKeenSlider renderEle={collectionWeek} numView={1} />
                    </div>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Upcoming Features</span>
                    <div className='grid grid-cols-3 gap-x-10'>
                        {upcommingFeature.map((item, idx) => {
                            return <div key={`upcomming_${idx}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex flex-col rounded-t-2xl px-5'>
                                <span className='text-white font-bold text-3xl mx-auto py-3'>Now Live</span>
                                <div className='flex flex-col bg-slate-800 rounded-t-2xl'>
                                    <span className='text-2xl text-dark_18e9d9 font-bold text-center mt-5'>{item.title}</span>
                                    <span className=' mt-3 text-white font-semibold text-lg text-center px-5'>{item.detail}</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10 w-full mx-auto'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Top Collectors</span>
                    <div className='w-full grid grid-cols-3 gap-5'>
                        {topCollectors.map((item, idx) => {
                            return <div key={`topcollector_${idx}`} className="flex items-center">
                                <div className='relative bg-dark_18e9d9 w-20 h-20 rounded-full p-1'>
                                    <img src={item.img} className="w-full h-full rounded-full"></img>
                                    <div className='absolute -top-1 -right-1 bg-dark_18e9d9 w-7 h-7 rounded-full flex justify-center items-center text-slate-700 font-bold'>{item.items}</div>
                                </div>
                                <span className='ml-5 text-white font-semibold text-xl'>{item.username}</span>
                            </div>
                        })}
                    </div>
                </div>

                <div className='flex flex-col mt-10 pt-5 px-10 gap-y-10'>
                    <span className='text-center text-4xl font-bold text-white dark:text-dark_18e9d9'>Live Auction</span>
                    <div>
                        <MyKeenSlider renderEle={topTrendingEle} numView={5} />
                    </div>
                </div>

                <div className="flex flex-col mt-10 py-10 gap-y-10 bg-[url('https://nft.empiretoken.world/static/media/newsletter.61526137.png')] bg-cover">
                    <span className='text-center text-3xl font-medium text-white'>Are You Looking For Partnership?</span>
                    <div className='flex flex-col'>
                        <div className='mx-auto'>
                            <GradientBtn txt="View Our Packages" onClick={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
        </NFTMPLayout>
    )
}
// NFTMPSite.layout = NFTMPLayout
// NFTMPSite.getLayout = function getLayout(page) {
//     return (
//         <NFTMPLayout>{page}</NFTMPLayout>
//     )
// }
export default NFTMPSite
