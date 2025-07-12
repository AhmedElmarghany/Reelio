import Image from "next/image";
import EditProfile from "../buttons/EditProfile";
import FollowBtn from "../buttons/FollowBtn";
import { useState } from "react";

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
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  isCurrentUser,
  isFollowed = false
}: Props) {
  // const [followed, setFollowed] = useState(isFollowed);

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-28 w-28 object-cover'>
            <Image
              src={imgUrl}
              alt='Profile Photo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
        {/* <div className="self-end"> */}
        <div>
            {isCurrentUser && <EditProfile />}
            {!isCurrentUser &&  <FollowBtn user_id={accountId} is_followed={isFollowed}/>}

        </div>
      </div>

      <p className='mt-6 mb-12 max-w-lg text-base-regular text-light-2'>{bio}</p>

      {/* <div className='mt-12 h-0.5 w-full bg-dark-3' /> */}
    </div>
  );
}

export default ProfileHeader;
