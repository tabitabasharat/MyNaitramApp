import dynamic from 'next/dynamic'
const AllNaitramEvents = dynamic(() => import('../../components/homepage/sections/AllNaitramEvents'),{
  ssr:false
})




export default function page ()  {
    
    return <AllNaitramEvents/>;
  };
  
