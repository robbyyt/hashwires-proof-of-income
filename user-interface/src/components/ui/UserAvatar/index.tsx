import { FC } from "react";
import { classNames } from "../../../utils/styles";
import type { AvatarSize } from "./types";

interface UserAvatarProps {
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const getAvatarSizeClass = (size?: AvatarSize) => {
  switch (size) {
    case "small":
      return "h-8 w-8";
    case "medium":
      return "h-10 w-10";
    case "large":
      return "h-12 w-12";
    default:
      return "h-8 w-8";
  }
};

const UserAvatar: FC<UserAvatarProps> = ({
  src,
  size,
  className = "",
  ...props
}) => {
  return (
    <img
      className={classNames(
        "rounded-full",
        getAvatarSizeClass(size),
        className
      )}
      src={
        src ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
      alt="user-avatar"
      {...props}
    />
  );
};

export default UserAvatar;
