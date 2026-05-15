import Navbar from "@/app/Components/Navbar"
import Footer from "@/app/Components/Footer"
import Calculator from "@/app/Components/Calculator/LongVideoEarnings/Calculator"
import HeadingOne from "@/app/Components/Calculator/LongVideoEarnings/HeadingOne"
import HowTo from "@/app/Components/Calculator/LongVideoEarnings/HowTo"
import Table from "@/app/Components/Calculator/LongVideoEarnings/Table"
import LanguageTable from "@/app/Components/Calculator/LongVideoEarnings/LanguageTable"
import NicheTable from "@/app/Components/Calculator/LongVideoEarnings/NicheTable"
import VidLengthTable from "@/app/Components/Calculator/LongVideoEarnings/VidLengthTable"
import Faq from "@/app/Components/Calculator/LongVideoEarnings/Faq"

export const metadata = {
    title: "YouTube Long Video Earnings Calculator",
    description: "Calculate your YouTube long video earnings with our easy-to-use calculator.",
    keywords: [
        "YouTube earnings calculator",
        "YouTube long video revenue calculator",
        "how much more do long youtube videos make",
        "highest paying niches for long youtube videos",
        "youtube long video rpm by country",
        "us audience vs india audience youtube payout calculator",
        "youtube rpm ranked by country and language",
    ]
}

function page() {
    return (
        <div>
            <Navbar />
            <HeadingOne />
            <Calculator />
            <HowTo />
            <Table />
            <LanguageTable />
            <NicheTable />
            <VidLengthTable />
            <Faq />
            <Footer />
        </div>
    )
}

export default page