export function CreatePage() {

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6 font-display bg-[#FDF6E3]">
      <div className="m-4 font-display font-bold text-[36px]">Create Post:-</div>
      <hr className="my-2 h-px border-t-4 border-black bg-black" />
      
      <textarea 
        className="focus:outline-none m-2 border-4 border-black rounded-lg p-4 min-h-[200px] text-lg" 
        placeholder="Share your thoughts"
      />
      
      <div className="flex justify-end mx-2 mt-2">
        <button 
          className="px-8 py-3 border-4 border-black bg-[#A8E6CF] font-bold text-xl rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#86d7b5] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          POST
        </button>
      </div>
    </div>
  );
}
