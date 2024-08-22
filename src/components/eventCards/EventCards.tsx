import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScaleReveal } from "../animations/ScaleReveal";
import event12 from "../../../public/event12.png";
import fallbackImage from "../../assets/event-video.png";

const EventCards = ({
  img,
  title,
  // eventid,
  eventId,
  height = "345px",
  width = "100%",
}: {
  img: string;
  title: string;
  height?: string;
  width?: string;
  eventId: any;
}) => {
  // const imageUrl = img?.startsWith("http" || "https") ? img : event12;
  const imageUrl = img?.startsWith("http") || img?.startsWith("https") ? img : event12;
  console.log("image src is", imageUrl);
return (
    <ScaleReveal extraStyle="w-full">
      {/* <Link href={`/events`} className="w-full"> */}
      <Link
        href={eventId ? `/specific-event/${eventId}` : "/events"}
        className="w-full"
      >
        <div
          style={{ height, width }}
          className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242]"
        >
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1200, 1800)
            )}`}
            alt="event-img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
            <p className="font-bold text-white text-xl">{title}</p>
            <HeartBadge />
          </div>
        </div>
      </Link>
    </ScaleReveal>
)
}
export default EventCards;