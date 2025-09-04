import Image from "next/image";
import meImage from "@/assets/images/me.jpg";

export function ProfileImage() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 size-30 overflow-hidden rounded-full border-4 border-gray-200">
        <Image
          src={meImage}
          alt="Muhammad Ahmed Shehzad"
          className="size-full object-cover"
          width={80}
          height={80}
          priority
        />
      </div>
    </div>
  );
}
