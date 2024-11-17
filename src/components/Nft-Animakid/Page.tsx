import React from 'react';
import './Page.css';

export default function Page() {
  return (
    <>
      <div className="pt-20 animakid_Hero">
        <div 
          className="Animakid_HeroBackground bg-cover bg-no-repeat h-[360px] w-full" 
          style={{ backgroundImage: "url('/Images/Nft_animakid_img/ImagePlaceHolder.png')" }}
        ></div>

        <div className="mt-[-76px] px-[92px] Animakida_Container_LOgo">
          <img src="/Images/Animkiad.svg" alt="Logo" />
          <div className="flex justify-between items-center mt-10 Animkaida_Btn_text_Container">
            <h2 className="text-[20px] font-extrabold leading-[19.6px] Animkai_Text">Animakid</h2>
            <button className="bg-[#00D059] px-8 py-4 rounded-full text-[14px] font-extrabold leading-[19.6px] text-[#030303] Animkaid_Button hidden md:block">
              Go To Event
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[55px] px-[92px] Animakid__HeroSection_container">
          <div className="flex justify-start items-center gap-[30px] Animakid__Container_small_TExt">
            <div>
              <h3 className="text-[32px] font-bold leading-[44.8px] text-white text-left AnimIKaid_15text">
                15<span className="text-[20px] font-bold leading-7 text-white text-left Animakiad_Span_Text">ETH</span>
              </h3>
              <p className="text-[24px] font-normal leading-[38.4px] text-[#BFBFBF] text-left Animakid_PTExt">Total Volume</p>
            </div>
            <div>
              <h3 className="text-[32px] font-bold leading-[44.8px] text-white text-left AnimIKaid_15text">
                0.000<span>1ETH</span>
              </h3>
              <p className="text-[24px] font-normal leading-[38.4px] text-[#BFBFBF] text-left Animakid_PTExt">Floor Price</p>
            </div>
            <div>
              <h3 className="text-[32px] font-bold leading-[44.8px] text-white text-left AnimIKaid_15text">
                1,483 <span>(25%)</span>
              </h3>
              <p className="text-[24px] font-normal leading-[38.4px] text-[#BFBFBF] text-left Animakid_PTExt">Owners (Unique)</p>
            </div>
            <div>
              <h3 className="text-[32px] font-bold leading-[44.8px] text-white text-left AnimIKaid_15text">2</h3>
              <p className="text-[24px] font-normal leading-[38.4px] text-[#BFBFBF] text-left Animakid_PTExt">Listed</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 Animkaid_text_Container_descripition">
            <h2 className="text-[24px] font-bold leading-[38.4px] text-left text-[#00D059] Description_text">Description</h2>
            <div>
              <h3 className="text-[20px] font-bold leading-7 text-left text-white Animakid_jooin_text">Join us for the PIZDEZ Women’s Day Party 2024</h3>
              <p className="text-[16px] font-normal leading-6 text-left text-white mt-2 Join_Us_Animakid">
                Join us for the PIZDEZ Women’s Day Party 2024, an unforgettable celebration of women's achievements and empowerment! Enjoy an electrifying night filled with live music, dancing, and entertainment. Mingle with amazing people in a vibrant atmosphere, and take part in special activities designed to honor and uplift women. Delicious food and drinks will be available, making it a perfect night out. Don’t miss this exciting event—come and celebrate with us!
              </p>
            </div>
            <div className="flex flex-col gap-3 Tim_clende_Svg_container">
              <div className="flex items-center gap-2 animakid_small_Svg_Conatiner">
                <img src="/Images/Nft_animakid_img/Loctaion.svg" alt="Location Icon" />
                <p>DOMA PUB Main floor, Light Street, London</p>
              </div>
              <div className="flex items-center gap-2 animakid_small_Svg_Conatiner">
                <img src="/Images/Nft_animakid_img/clendr.svg" alt="Calendar Icon" />
                <p>Saturday, 5th March 2024 - Sunday, 6th March 2024</p>
              </div>
              <div className="flex items-center gap-2 animakid_small_Svg_Conatiner">
                <img src="/Images/Nft_animakid_img/clock.svg" alt="Clock Icon" />
                <p>5 PM - 12 AM</p>
              </div>
            </div>
          </div>
          <div>
            <img src="/Images/Nft_animakid_img/Icons.svg" alt="Event Icon" />
            <button className="bg-[#00D059] w-full py-4 rounded-full text-[14px] font-extrabold leading-[19.6px] text-[#030303] Animkaid_Button block md:hidden mt-4">
              Go To Event
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-[35px] grid-cols-4 w-full px-[92px] pt-[33px] pb-[173px]">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="relative bg-gradient-to-t from-[#0F0F0F] to-[#1A1A1A] p-[30px_11.5px] flex flex-col gap-[17px] rounded-[8px] overflow-hidden">
            <div className="absolute inset-0 border border-[1px] border-[transparent] rounded-[8px] pointer-events-none" style={{ borderImage: 'linear-gradient(135deg, #13FF7A 0.2%, #002B12 50.2%, #13FF7A 100.2%) 1' }}></div>
            <img src="/Images/Nft_animakid_img/Crads.svg" alt="Card" />
            <div className="px-[12px]">
              <h3 className="text-[18px] font-extrabold leading-[19.15px] text-left text-white">The Orbitians</h3>
              <div className="flex justify-between items-center mt-[20px]">
                <div>
                  <p className="text-[12px] font-normal leading-[13.2px] text-white">Price</p>
                  <p className="flex items-center gap-[5px] text-[14px] font-bold leading-[14px] text-left text-[#00D059]">
                    <img src="/Images/Nft_animakid_img/Price.svg" alt="Price Icon" />0.25 ETH
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-normal leading-[13.2px] text-white">Highest Bid</p>
                  <p className="text-[14px] font-bold leading-[19.6px] text-white">0.33 wETH</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
