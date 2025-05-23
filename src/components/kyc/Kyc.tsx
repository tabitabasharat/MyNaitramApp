"use client";

import { useState, useEffect, useRef } from "react";
import "../homepage/sections/viewevents.css";
import IndividualInfo from "./IndividualInfo";
import Business from "./Business";
import Representative from "./Representative";
import Owners from "./Owners";
import Executive from "./Executive";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserByID } from "@/lib/middleware/profile";

import { kycSubmition, updateKYCStatusss } from "@/lib/middleware/kyc";

import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import ScreenLoader from "@/components/loader/Screenloader";

import { KycSubmmitModal } from "../EventSubmmitModal/EventSubmmitModal";

const eventImages = [
  { id: 1, title: "Individual" },
  { id: 2, title: "Business" },
  { id: 3, title: "Representative" },
  { id: 4, title: "Owners" },
  { id: 5, title: "Executive" },
];

const Kyc = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedEventId, setSelectedEventId] = useState<number>(1);
  const [individualFormData, setIndividualFormData] = useState<any>({});
  const [businessFormData, setBusinessFormData] = useState<any>({});
  const [representingFormData, setRepresentiData] = useState<any>({});
  const [ownerFormData, setOwnerFormData] = useState<any>({});
  const [excecutiveData, setExecutiveData] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [formFullData, setFormFullData] = useState<any>({});
  const [datalength, setDataLength] = useState<number>(0);
  const isFirstRender = useRef(true);
  const [successCount, setSuccessCount] = useState(0);
  const [isKycUpdated, setKycUpdated] = useState(false);
  const [isKycModalOpen, setisKycModalOpen] = useState(false);

  // //////////Getting user Data to see kyc

  const myProfile = useAppSelector((state) => state?.getUserDetail?.userProfile?.data);

  console.log("my Profile info is", myProfile);

  const userLoading = useAppSelector((state) => state?.getUserDetail);

  useEffect(() => {
    if (myProfile) {
      setLoader(false);
      console.log("KYC satatus is as ===> ", myProfile?.kyc);
      setKycUpdated(myProfile?.kyc);
    }
  }, [myProfile]);

  useEffect(() => {
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(getUserByID(userid));
  }, []);

  //////////////////////////////////////////////////

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the first render
      isFirstRender.current = false;
      return;
    }

    // Only trigger when formFullData.executives updates after the first render
    if (formFullData.executives) {
      handleKYCSubmition();
    }
  }, [formFullData.executives]);

  useEffect(() => {
    if (successCount === 5) {
      // setLoader(true);
      const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
      try {
        const data = {
          userID,
        };
        dispatch(updateKYCStatusss(data)).then((res: any) => {
          if (res?.payload?.status === 200) {
            setLoader(false);
            console.log("Profile res", res?.payload?.data);
            dispatch(getUserByID(userID));
            SuccessToast("KYC Form Submitted successfully");
            router.push("/management");
          } else {
            setLoader(false);
            console.log(res?.payload?.message);
            ErrorToast(res?.payload?.message);
          }
        });
      } catch (error) {
        setLoader(false);
        console.error("Error:", error);
      }
    }
  }, [successCount, selectedEventId, datalength]);

  const handleSelect = (id: number, data: any) => {
    setSelectedEventId(id);

    switch (Object.keys(data)[0]) {
      case "IndividualData":
        console.log("IndividualData passed back");
        setIndividualFormData(formFullData?.individuals);
        setDataLength(datalength - 1);
        break;
      case "BusinessData":
        console.log("BusinessData passed back");
        setBusinessFormData(formFullData?.businesses);
        setDataLength(datalength - 1);
        break;
      case "RepresentativeData":
        console.log("Representative Data passed back");
        setRepresentiData(formFullData?.representives);
        setDataLength(datalength - 1);
        break;
      case "OwnerData":
        console.log("OwnerData passed back");
        setOwnerFormData(formFullData?.owners);
        setDataLength(datalength - 1);
        break;
      default:
        if (datalength === 5) {
          console.log("Overall Data is as ==> ", formFullData);
          console.log("Data Length Completed Broooo...!");
          handleKYCSubmition();
          //   return;
        } else {
          if (id === 2) {
            setDataLength(datalength + 1);
            setFormFullData((prev: any) => {
              return {
                ...prev,
                individuals: data,
              };
            });
          } else if (id === 3) {
            setDataLength(datalength + 1);
            setFormFullData((prev: any) => {
              return {
                ...prev,
                businesses: data,
              };
            });
          } else if (id === 4) {
            setDataLength(datalength + 1);
            setFormFullData((prev: any) => {
              return {
                ...prev,
                representives: data,
              };
            });
          } else if (id === 5) {
            setDataLength(datalength + 1);
            setFormFullData((prev: any) => {
              return {
                ...prev,
                owners: data,
              };
            });
          } else {
            setDataLength(datalength + 1);
            setFormFullData((prev: any) => {
              return {
                ...prev,
                executives: data,
              };
            });
          }
        }
        break;
    }
  };

  const handleKYCSubmition = async () => {
    setLoader(true);
    try {
      console.log("sdgsdhjsgdhjgd ===> ", formFullData.executives);

      for (const key in formFullData) {
        console.log("Ticket creation APi data is =======> ", formFullData[key]);
        dispatch(kycSubmition(formFullData[key])).then((res: any) => {
          // setLoader(false);
          if (res?.payload?.status === 201) {
            setSuccessCount((prevCount) => prevCount + 1);
            localStorage.removeItem("exeData");
          } else {
            // ErrorToast(res?.payload?.message);
            ErrorToast("KYC Form Submitted Failed");
            setSuccessCount(0);
            setSelectedEventId(1);
            setDataLength(0);
            return;
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
      setLoader(true);
    }
  };

  return (
    <section className="min-h-screen bg-cover bg-no-repeat bg-reward">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <div className="lg:pt-[134px] lg:pb-[116px] pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
        <h1 className="text-[24px] md:text-[36px] font-extrabold mb-[20px] md:mb-[24px]">KYC</h1>
        {isKycUpdated ? (
          <KycSubmmitModal onClose={() => setisKycModalOpen(false)} open={() => setisKycModalOpen(true)} />
        ) : (
          <div className="flex gap-[30px] flex-col md:gap-[70px]">
            <div className="w-full flex whitespace-nowrap overflow-y-auto scrollbar-hide flex-nowrap md:gap-[12px] gap-[5px] events">
              {eventImages.map((event) => (
                <div
                  key={event.id}
                  // onClick={() => handleSelect(event.id)}
                  className={`relative flex flex-col items-center justify-center w-[130px] md:items-start pt-[3px] rounded-[44px] md:rounded-lg md:w-[240px] md:px-[12px] px-[31.5px] md:py-[16.5px] cursor-pointer duration-300 ${
                    selectedEventId === event.id
                      ? "gradient-slate text-[#13FF7A] font-extrabold md:text-base text-sm gradient-border-rounded"
                      : "gradient-slate font-normal md:text-base text-sm border-muted"
                  }`}
                >
                  <p className="md:m-0 my-[12px] font-normal md:text-base text-sm">{event.title}</p>
                </div>
              ))}
            </div>

            <div>
              {selectedEventId === 1 && <IndividualInfo onNextBtnClicked={handleSelect} pageData={individualFormData} />}
              {selectedEventId === 2 && <Business onNextBtnClicked={handleSelect} PageData={businessFormData} />}
              {selectedEventId === 3 && <Representative onNextBtnClicked={handleSelect} PageData={representingFormData} />}
              {selectedEventId === 4 && <Owners onNextBtnClicked={handleSelect} PageData={ownerFormData} />}
              {(selectedEventId === 5 || selectedEventId === 6) && <Executive onNextBtnClicked={handleSelect} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Kyc;
