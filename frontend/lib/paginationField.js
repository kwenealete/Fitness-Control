import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
    return {
        keyArgs: false, // notifies apollo we'll take care ourself
        read(existing = [], { args, cache }) {
            console.log({ existing, args, cache });
            const { skip, first } = args;

            // Getting number of measurements from the cache to show on page
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allMeasurementsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);

            //check if there are existing measurements
            const measurements = existing.slice(skip, skip + first).filter(x => x);

            //if there are measurements; and it isn't enough to satisfy 
            // the number requested, and we're on the last page, then we just take it
            if(measurements.length && measurements.length !== first && page === pages) {
                return measurements;
            }
            
            if(measurements.length !== first) {
                //no measurements, then we need to fetch them from the network
                return false;
            }

            //if measurements are returned, then no need to go to the network as they're present in the cache
            if(measurements.length) {
                console.log(`There are ${measurements.length} measurements in the cache! visit apollo`);
                return measurements;                
            }

            return false; //falls back to the netwotk if neither works
            
        },

        merge(existing, incoming, { args }) {
            const { skip, first } = args;

            //runs when apollo client comes back with measurements from the network
            console.log(`Merging measurements from network ${incoming.length}`);
            const merged = existing ? existing.slice(0) : [];
            for(let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip];
            }
            console.log(merged);
            //Returning merged measurements from the cahce
            return merged;
            
            
             
        }
    };
}