import EditProfile from "@/components/buttons/EditProfile";
import FollowBtn from "@/components/buttons/FollowBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  isCurrentUser: boolean,
  isFollowed?: boolean
}

function ProfileHeader({
  accountId,
  name,
  username,
  imgUrl,
  bio,
  isCurrentUser,
  isFollowed = false
}: Props) {

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar className="h-28 w-28 rounded-full">
            <AvatarImage src={imgUrl} alt="User Image" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <h2 className='text-left font-inter text-foreground font-bold text-[24px]'>
              {name}
            </h2>
            <p className='text-card-foreground font-inter text-[16px]'>@{username}</p>
          </div>
        </div>
        <div>
          {isCurrentUser && <EditProfile />}
          {!isCurrentUser && <FollowBtn user_id={accountId} is_followed={isFollowed} />}

        </div>
      </div>

      <p className='mt-6 mb-12 max-w-lg text-[16px] font-inter text-foreground font-normal'>{bio}</p>
    </div>
  );
}

export default ProfileHeader;
