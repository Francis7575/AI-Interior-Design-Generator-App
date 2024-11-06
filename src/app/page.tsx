import Image from "next/image";
import Link from "next/link";
import { CloudUpload, Palette, Download, MessagesSquare, ChevronRight } from 'lucide-react'

export default function Home() {
  const homeInfo = [
    { icon: <CloudUpload />, title: 'Upload', about: 'Upload Your Room Picture' },
    { icon: <Palette />, title: 'Select Design', about: 'Select Design and Room Type' },
    { icon: <Download />, title: 'Ready to Download', about: 'Your Room / Home Interior Design is Ready' },
    { icon: <MessagesSquare />, title: '24/7 Support', about: 'Contact us 24 hours a day, 7 days a week' }
  ]

  return (
    <section className="mt-12">
      <div className="flex flex-col items-center px-4">
        <h1 className="font-bold text-[2.25rem] lg:text-[2.8rem] text-center flex flex-col">
          <span>AI Room and Home</span>
          <span className="gradient-text">Interior Design</span>
        </h1>
        <p className="text-center text-lightblue text-[1.2rem] mt-4 md:mt-6 font-semibold">
          Transform Your Space with AI: Effortless Room & Home Interior Design at Your Fingertips!
        </p>
        <Link href="/dashboard" className="mt-4 hover:opacity-70 md:mt-6 text-white py-3 px-4 max-w-[155px] w-full rounded-md gradient-bg flex items-center justify-between">
          Get started
          <ChevronRight />
        </Link>
      </div>
      <div className="flex justify-center mt-10 px-4 md:gap-6 lg:gap-[5.2rem] md:mt-20">
        <Image src={'/original-image.png'} height={100} width={100} alt="Original Image" className="w-full max-w-[400px] rounded-lg" />
        <Image src={'/arrow.png'} height={100} width={100} alt="" />
        <Image src={'/AI-image.png'} height={100} width={100} alt="AI Image" className="w-full max-w-[400px] rounded-lg" />
      </div>
      <div className="mt-14 px-4 flex flex-col lg:items-center lg:justify-center lg:flex-row gap-8 lg:gap-[4rem] pb-[2.5rem]">
        {homeInfo.map((item, idx) => (
          <div key={idx} className="p-4 rounded-md font-medium hover:bg-secondlightblue cursor-pointer">
            <div className="bg-blue p-3 inline-block rounded-lg mb-[1.25rem]">
              <span className="text-white">{item.icon}</span>
            </div>
            <h3 className="text-[1.125rem]">{item.title}</h3>
            <p className="text-lightblue">{item.about}</p>
            <Link href="/" className="text-blue align-middle font-medium flex items-center gap-4">
              Learn more
              <span><ChevronRight size={18} /></span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
