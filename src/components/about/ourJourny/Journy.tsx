import Nine from "./Nine";

const Journy = () => {
  return (
    <section className="pt-[80px] pb-[40px] ">
      <h2 className="md:text-6xl text-[30px] font-[600] text-center text-white mb-[20px]">Our Journey</h2>
      <div className="md:flex d-none">
        <ul className="flex flex-col md:w-[60%] w-[100%] items-center justify-between">
          <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px] text-[#009540]">2019</a></li>
          <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px]">2021</a></li>
          <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px]">2022</a></li>
          <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px]">2023/24</a></li>
        </ul>
        <div>
            <Nine />
        </div>
      </div>
    </section>
  );
};
export default Journy;
