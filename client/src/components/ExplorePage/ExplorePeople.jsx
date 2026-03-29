import { Circle, UserPlus, User } from "lucide-react"

export function ExplorePeople(){
  const peopleData = [
    { 
      id: 1, 
      name: "AdiStarc", 
      followers: "172K", 
      bgColor: "bg-[#F3E8FF]" 
    },
    { 
      id: 2, 
      name: "ShubhMitch", 
      followers: "89K", 
      bgColor: "bg-[#FFE5E5]" 
    },
    { 
      id: 3, 
      name: "Natasha", 
      followers: "670K", 
      bgColor: "bg-[#E2F0CB]" 
    },
    { 
      id: 4, 
      name: "Samriddhi", 
      followers: "1.4M", 
      bgColor: "bg-[#FFE1D1]" 
    }
  ];

  return (
    <div className="m-4 mb-2">
      <div className="flex items-center gap-3 mb-4">
        <User className="h-[40px] w-[40px]" strokeWidth={2.5}/>
        <div className="text-[32px] font-bold">Discover People:-</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
        {peopleData.map((person) => (
          <div key={person.id} className={`border-[5px] rounded-[30px] flex items-center justify-between border-black ${person.bgColor} p-4`}>
            <div className="flex items-center gap-4">
              <div className="bg-black text-white rounded-full p-2">
                <Circle className="h-[40px] w-[40px]" />
              </div>
              <div>
                <h3 className="text-[24px] font-black leading-tight">{person.name}</h3>
                <p className="text-md font-bold text-gray-700">{person.followers} followers</p>
              </div>
            </div>
            <button className="bg-black text-white p-3 rounded-full flex items-center gap-2 font-bold px-5">
              <UserPlus className="h-5 w-5" /> Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}