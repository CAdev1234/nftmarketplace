import dynamic from 'next/dynamic'
import FaqLayout from "@components/common/Layouts/FAQLayout"

export default function FAQSite() {
    return (
        <FaqLayout>
            <div className="mt-20 px-10 py-20 text-white bg-white bg-opacity-10 backdrop-blur-sm">FAQ Page</div>
        </FaqLayout>
    )
}

