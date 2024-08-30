
import dynamic from 'next/dynamic'
const DeleteAccnt = dynamic(() => import('../../../components/profile-page/DeleteAccnt'))



export default function page ()  {
    return <DeleteAccnt/>
}

