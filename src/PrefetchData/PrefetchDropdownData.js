import { useEffect } from "react";
import { useQueryClient } from "react-query";

import * as Functions from './DataLoadFunctions'
import * as Names from '../Constants/ReactQueryConsts'

export default function PrefetchDropdownData() {
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.prefetchQuery(Names.HIGH_SCHOOL, Functions.fetchHighSchools);
        queryClient.prefetchQuery(Names.COLLEGES, Functions.fetchColleges);
        queryClient.prefetchQuery(Names.STREAMS, Functions.fetchStreams);
    }, [queryClient]);
}