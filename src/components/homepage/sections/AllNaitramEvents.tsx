import FilterSideBar from '@/components/organisms/FilterSideBar';
import AllEventsGrid from '@/components/reusable-components/AllEventsGrid';
import MobileAllEventsList from '@/components/reusable-components/MobileAllEventsList';
import { events } from '@/lib/dummyData';

const AllNaitramEvents = () => {
  return (
    <section className="min-h-screen pxpx mx-2xl pb-20">
      <h2 className="font-bold text-[32px] lg:text-[48px] mb-[2rem] 2xl:mt-10">
        🗓 All Naitram Events
      </h2>

      <div className="hidden md:flex justify-between gap-10">
        <FilterSideBar />
        {/* All Naitram Events */}
        <AllEventsGrid events={events} />
      </div>

      {/* MOBILE */}
      <div className="md:hidden justify-between gap-10">
        <MobileAllEventsList events={events} />
      </div>
    </section>
  );
};

export default AllNaitramEvents;
