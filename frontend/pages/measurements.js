import { useRouter } from 'next/dist/client/router';
import Measurements from '../components/Measurements';
import  Pagination  from '../components/Pagination';


export default function MeasurementPage() {
    const { query } = useRouter();
    const page = parseInt(query.page);
    return (
        <div>
            <Pagination page={page || 1} />
            <Measurements page={page || 1} />
            <Pagination page={page || 1} />
        </div>
    );
}