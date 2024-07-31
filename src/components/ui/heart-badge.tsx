import { Heart } from '@phosphor-icons/react/dist/ssr';

const HeartBadge = () => {
  return (
    <div className="bg-white/20 p-[0.6rem] rounded-full backdrop-blur-lg webkit-header-blur">
      <Heart size={20} weight="fill" />
    </div>
  );
};

export default HeartBadge;
