'use client';

import {
  Calendar,
  CirclesFour,
  Funnel,
  MapPin,
  Coins,
  CaretDown,
  CurrencyDollar,
} from '@phosphor-icons/react/dist/ssr';
import { Checkbox } from '../ui/checkbox';
import { DatePicker } from './DatePicker';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const FilterSideBar = () => {
  return (
    <div className="">
      <div className="flex md:flex-col lg:flex-row justify-between gap-1 lg:gap-0">
        <div className="flex gap-[0.5rem]">
          <Funnel size={22} weight="bold" className="text-primary" />
          <p className="text-[20px]">Filters</p>
        </div>
        <p className="font-bold underline">Reset filters</p>
      </div>
      {/* EVENT TIME */}

      <div className="mt-6 flex flex-col gap-[0.6rem]">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Calendar size={20} weight="bold" className="text-primary" />
            <p>Event Time</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Today
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            This Week
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            This Month
          </label>
        </div>
        <DatePicker />
      </div>
      <hr className="opacity-20 h-px mt-6" />
      {/* LOCATIONS */}
      <div className="flex flex-col gap-[0.6rem]">
        <div className="flex justify-between mt-6">
          <div className="flex gap-3">
            <MapPin size={20} weight="bold" className="text-primary" />
            <p>Locations</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            All Locations
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            London
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Atlanta
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            New York
          </label>
        </div>{' '}
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Malta
          </label>
        </div>
        <Button
          variant="ghost"
          className="w-fit flex gap-[0.5rem] items-center ml-4"
        >
          See more <CaretDown size={17} weight="bold" />
        </Button>
      </div>
      <hr className="opacity-20 h-px mt-4" />

      {/* CATEGORY */}
      <div className="flex flex-col gap-[0.6rem]">
        <div className="flex justify-between mt-6">
          <div className="flex gap-3">
            <CirclesFour size={20} weight="bold" className="text-primary" />
            <p>Category</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            All Category
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Shows
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Dj
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Party
          </label>
        </div>{' '}
        <Button
          variant="ghost"
          className="w-fit flex gap-[0.5rem] items-center ml-4"
        >
          See more <CaretDown size={17} weight="bold" />
        </Button>
      </div>
      <hr className="opacity-20 h-px mt-4" />

      {/* PRICE RANGE */}
      <div className="flex flex-col gap-2">
        <div className="flex mt-6">
          <div className="flex gap-3">
            <Coins size={20} weight="bold" className="text-primary" />
            <p>Price Range</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Input
              type="number"
              placeholder="MIN"
              className="pl-7 placeholder:text-white/40"
            />
            <CurrencyDollar
              size={18}
              weight="bold"
              className="absolute left-2 top-[0.6rem]"
            />
          </div>
          <div className="relative">
            {' '}
            <Input
              type="number"
              placeholder="MAX"
              className="pl-7 placeholder:text-white/40"
            />
            <CurrencyDollar
              size={18}
              weight="bold"
              className="absolute left-2 top-[0.6rem]"
            />
          </div>
        </div>
        <Button variant="secondary" className="w-full mt-2">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterSideBar;
