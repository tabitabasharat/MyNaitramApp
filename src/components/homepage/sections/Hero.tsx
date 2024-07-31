import { Button } from '@/components/ui/button';
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import heroImg from '@/assets/hero-img.png';
import thumb from '@/assets/thumbs.png';
import star from '@/assets/star.png';
import { FadeReveal } from '@/components/animations/FadeReveal';
import { Reveal } from '@/components/animations/Reveal';

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/hero-bg.png)',
        backgroundPosition: 'center',
      }}
      className="min-h-screen lg:h-screen bg-cover bg-no-repeat relative overflow-clip  pt-[10rem] lg:pt-0"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center h-full pxpx mx-2xl relative">
        <div className="lg:w-1/2 xl:w-[40%] z-[8] flex flex-col justify-center items-center lg:justify-start lg:items-start gap-[3rem]">
          <div>
            <Reveal y={100} width="100%">
              <h1 className="font-bold text-[38px] lg:text-[64px] leading-[1.1] text-center lg:text-start">
                Revolutionize Your Experience
              </h1>
            </Reveal>
            <Reveal y={100} width="100%">
              <p className="mt-4 text-muted text-center lg:text-start md:w-[60%] lg:w-full md:mx-auto lg:mx-0">
                Discover a new way to engage with events through Naitram,
                enhance your experience from start to finish. Whether you're
                attending a conference, festival, or corporate gathering
              </p>
            </Reveal>
          </div>
          <Reveal y={100} width="100%">
            <div className="flex flex-col md:flex-row gap-[0.8rem] w-full md:w-fit md:mx-auto lg:mx-0">
              <Button variant="secondary">Learn More</Button>
              <Button className="flex items-center gap-[0.5rem]">
                <DownloadSimple size={20} weight="bold" />
                Download App
              </Button>
            </div>
          </Reveal>
        </div>
        <FadeReveal extraStyle="z-[5] w-[500px] scale-[2] lg:scale-[3] translate-y-[30%]">
          <Image
            src={heroImg}
            className=""
            width={1000}
            height={1000}
            placeholder="blur"
            alt="Hero-IMG"
          />
        </FadeReveal>
        <FadeReveal extraStyle="absolute bottom-0 lg:bottom-[8%] right-[14%] z-[8] w-[110px] lg:w-[130px]">
          <Image src={thumb} width={500} height={500} alt="Hero-IMG" />
        </FadeReveal>
        <FadeReveal extraStyle="absolute bottom-[15%] lg:bottom-[27%] left-[5%] lg:left-auto lg:right-[37%] z-[8] w-[100px]">
          <Image src={star} width={500} height={500} alt="Hero-IMG" />
        </FadeReveal>
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[7]"></div>
    </section>
  );
};

export default Hero;
