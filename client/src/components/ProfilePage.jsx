import { ProfileHeader } from "./ProfilePage/ProfileHeader";
import { ProfileTabs } from "./ProfilePage/ProfileTabs";
import { ProfileActivity } from "./ProfilePage/ProfileActivity";

export function ProfilePage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 md:p-8 bg-[#FDF6E3]">
      <div className="max-w-4xl mx-auto w-full pb-10">
        <div className="font-display font-bold text-[36px] mb-4">My Profile:-</div>
        <hr className="my-4 h-px border-t-4 border-black bg-black" />
        
        <ProfileHeader />
        <ProfileTabs />
        <ProfileActivity />
      </div>
    </div>
  );
}
