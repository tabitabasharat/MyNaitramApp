import Image from 'next/image';
import aboutImg from '@/assets/about-img.png';
import aboutMobile from '@/assets/about-mobile.png';
import { Reveal } from '@/components/animations/Reveal';
import { FadeReveal } from '@/components/animations/FadeReveal';

const About = () => {
  return (
    <section
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/about-bg.png)',
        backgroundPosition: 'center',
      }}
      className="bg-cover bg-no-repeat relative min-h-screen place-items-center"
    >
      <div className="flex flex-col-reverse px-[24px] lg:flex-row justify-between items-center h-full px-[0px] sm:pxpx mx-2xl relative gap-16">
        <FadeReveal>
          <div className="w-[450px] z-[6] hidden lg:block">
            <Image
              src={aboutImg}
              width={1000}
              height={1000}
              placeholder="blur"
              alt="About-IMG"
            />
          </div>
        </FadeReveal>

        <FadeReveal>
          <div className="sm:w-[350px] w-full z-[6] lg:hidden">
            <Image
              src={aboutMobile}
              width={1000}
              height={1000}
              placeholder="blur"
              alt="About-IMG"
            />
          </div>
        </FadeReveal>
        <div className="z-[8] lg:w-[60%]">
          <Reveal y={100} width="100%">
            <h1 className="font-bold text-[32px] lg:text-[48px] leading-[1.1] text-center lg:text-start w-[90%] lg:w-full mx-auto lg:mx-0">
              Experience More, Earn More 🤑
            </h1>
          </Reveal>
          <Reveal y={100}>
            <p className="mt-4 text-muted text-center lg:text-start md:w-[60%] lg:w-[90%] xl:w-[80%] md:mx-auto lg:mx-0">
              We believe in rewarding fans for their dedication. With our
              platform, attendees not only enjoy unforgettable events but also
              earn exclusive perks and rewards along the way. From VIP access to
              meet-and-greets, every ticket purchased through NAITRAM unlocks a
              world of opportunities for our valued fans.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[7]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-[5]"></div>
    </section>
  );
};

export default About;
