import RewardCard from '@/components/reusable-components/RewardCard';
import award1 from '@/assets/award1.png';
import award2 from '@/assets/award2.png';
import award3 from '@/assets/award3.png';
import { Reveal } from '@/components/animations/Reveal';

const RewardProgram = () => {
  const rewards = [
    {
      id: 1,
      img: award1,
      title: 'Claim Reward',
      desc: 'Unlock exclusive benefits with a single click. Our streamlined process allows you to claim your rewards quickly and effortlessly.',
    },
    {
      id: 2,
      img: award2,
      title: 'Earn $MRT Token',
      desc: 'Participate in our activities and earn $MRT Tokens as you engage. From completing tasks to joining events, every action you take brings you closer to more rewards',
    },
    {
      id: 3,
      img: award3,
      title: 'Redeem Rewards',
      desc: 'Turn your $MRT Tokens into real value. Redeeming your rewards is straightforward, ensuring you get what you want, when you want it.',
    },
  ];
  return (
    <section
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/blur-green.png)',
        backgroundPosition: 'center',
      }}
      className="bg-cover bg-no-repeat relative min-h-screen"
    >
      <div className="z-[8] relative pxpx mx-2xl py-28">
        <div className="lg:w-[50%]">
          <Reveal y={100}>
            <h2 className="font-bold text-[32px] lg:text-[48px] leading-[1.15]">
              Unlock Your Potential with Our Reward Program
            </h2>
          </Reveal>
          <Reveal y={100}>
            <p className="text-muted mt-6">
              Earn, claim, and redeem amazing rewards effortlessly. Discover how
              you can maximize your benefits and enjoy exclusive perks today!
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col lg:flex-row md:justify-center md:items-center lg:justify-start lg:items-start gap-[2rem] mt-24">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              img={reward.img}
              title={reward.title}
              desc={reward.desc}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[7]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-[5]"></div>
    </section>
  );
};

export default RewardProgram;
