import { CaretDown, FadersHorizontal } from '@phosphor-icons/react/dist/ssr';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MobileFilter = () => {
  return (
    <div className="flex justify-between mb-1">
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Filter" />
          <FadersHorizontal size={20} weight="fill" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="filter_one">Filter One</SelectItem>
            <SelectItem value="filter_two">Filter Two</SelectItem>
            <SelectItem value="filter_three">Filter Three</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Date" />
          <CaretDown size={20} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="filter_one">Today</SelectItem>
            <SelectItem value="filter_two">This Week</SelectItem>
            <SelectItem value="filter_three">This Month</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileFilter;
