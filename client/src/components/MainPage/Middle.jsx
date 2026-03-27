import { Circle, Bell, ThumbsUp, ThumbsDown, MessageSquareTextIcon, Share2 } from "lucide-react"
import './RightSide.css';

export function Middle(){
  return (
    <>
        <div className="p-6 pt-1 h-full w-screen overflow-y-auto font-display scroll-left">
          <div className="border-[5px] rounded-[35px] bg-[#FD7EAF] border-black mt-[8px] p-4 font-display">
            <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
              <div className="flex">
                <Circle className="h-[36px] w-[36px] m-2 mb-0"/>
                <p className="font-bold text-[32px] m-2 mt-0 mb-0">AdiStarc</p>
              </div>
              <p className="mt-5 text-[20px]">1hr</p>
            </div>

            <hr className="h-px border-t-0 bg-black"/>

            <div>
              <p className="text-[28px] font-bold">What are your thoughts on pokemon card collectors?</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-6 w-6" />
                  <p className="text-lg font-bold">1.7K</p>
                </div>
                <ThumbsDown className="h-6 w-6" />
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <MessageSquareTextIcon className="h-6 w-6" />
                <p className="text-lg font-bold">100</p>
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <Share2 className="h-6 w-6" />
                <p className="text-lg font-bold">20</p>
              </div>
            </div>
          </div>

          <div className="border-[5px] rounded-[35px] bg-[#A8E6CF] border-black mt-[8px] p-4 font-display">
            <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
              <div className="flex">
                <Circle className="h-[36px] w-[36px] m-2 mb-0"/>
                <p className="font-bold text-[32px] m-2 mt-0 mb-0">ShubMitch</p>
              </div>
              <p className="mt-5 text-[20px]">2hr</p>
            </div>

            <hr className="h-px border-t-0 bg-black"/>

            <div>
              <p className="text-[28px] font-bold">Should I opt for PHD from Germany?</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-6 w-6" />
                  <p className="text-lg font-bold">250</p>
                </div>
                <ThumbsDown className="h-6 w-6" />
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <MessageSquareTextIcon className="h-6 w-6" />
                <p className="text-lg font-bold">19</p>
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <Share2 className="h-6 w-6" />
                <p className="text-lg font-bold">2</p>
              </div>
            </div>
          </div>

          <div className="border-[5px] rounded-[35px] bg-[#C7E9B0] border-black mt-[8px] p-4 font-display">
            <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
              <div className="flex">
                <Circle className="h-[36px] w-[36px] m-2 mb-0"/>
                <p className="font-bold text-[32px] m-2 mt-0 mb-0">DevSanchar</p>
              </div>
              <p className="mt-5 text-[20px]">2hr</p>
            </div>

            <hr className="h-px border-t-0 bg-black"/>

            <div>
              <p className="text-[28px] font-bold">What are the possibilities I will fail in tomorrow exam?</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-6 w-6" />
                  <p className="text-lg font-bold">5.7K</p>
                </div>
                <ThumbsDown className="h-6 w-6" />
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <MessageSquareTextIcon className="h-6 w-6" />
                <p className="text-lg font-bold">1.4K</p>
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <Share2 className="h-6 w-6" />
                <p className="text-lg font-bold">800</p>
              </div>
            </div>
          </div>

          <div className="border-[5px] rounded-[35px] bg-[#FFF0F5] border-black mt-[8px] p-4 font-display">
            <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
              <div className="flex">
                <Circle className="h-[36px] w-[36px] m-2 mb-0"/>
                <p className="font-bold text-[32px] m-2 mt-0 mb-0">ManasviMathur</p>
              </div>
              <p className="mt-5 text-[20px]">10hr</p>
            </div>

            <hr className="h-px border-t-0 bg-black"/>

            <div>
              <p className="text-[28px] font-bold">People are maniac in my society what should I do?</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-6 w-6" />
                  <p className="text-lg font-bold">10K</p>
                </div>
                <ThumbsDown className="h-6 w-6" />
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <MessageSquareTextIcon className="h-6 w-6" />
                <p className="text-lg font-bold">3.7K</p>
              </div>
              <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer">
                <Share2 className="h-6 w-6" />
                <p className="text-lg font-bold">5K</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}