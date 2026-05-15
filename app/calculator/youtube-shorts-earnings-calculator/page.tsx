import React from 'react'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import Calcluator from '@/app/Components/Calculator/ShortsEarnings/Calculator'
import Slider from '@/app/Components/Calculator/ShortsEarnings/Slider'
import Table from '@/app/Components/Calculator/ShortsEarnings/Table'
import HowTo from '@/app/Components/Calculator/ShortsEarnings/HowTo'
import Faq from '@/app/Components/Calculator/ShortsEarnings/Faq'
import HeaderOne from '@/app/Components/Calculator/ShortsEarnings/HeaderOne'
import HeaderTwo from '@/app/Components/Calculator/ShortsEarnings/HeaderTwo'
import Link from '@/app/Components/Calculator/ShortsEarnings/Link'

export const metadata = {
    title: "YouTube Shorts Earnings Calculator",
    description: "Calculate your YouTube shorts earnings with our easy-to-use calculator.",
    keywords: [
        "YouTube shorts earnings calculator",
        "youtube shorts rpm ranked country-wise",
        "How is Shorts revenue estimated",
        "How much youtube shorts pays per 1000 views",
        "How much youtube shorts pays per million views",
        "youtube shorts ad revenue calculator"
    ]
}

function page() {
    return (
        <div>
            <Navbar />
            <HeaderOne />
            <Calcluator />
            <Link />
            <HeaderTwo />
            <Slider />
            <Table />
            <HowTo />
            <Faq />
            <Footer />
        </div>

    )
}

export default page