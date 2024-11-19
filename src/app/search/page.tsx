
import dynamic from 'next/dynamic'
const SearchEvents = dynamic(() => import('../../components/search-page/SearchEvents'))




export default function page ()  {
  return <SearchEvents />;
};


