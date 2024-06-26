import {useQuery} from "@tanstack/react-query";
import {useCallback, useState} from "react";

import type {Staff} from "@shared/types";

import {axiosInstance} from "@/axiosInstance";
import {filterByTreatment} from "@/components/staff/utils";
import {queryKeys} from "@/react-query/constants";

async function getStaff(): Promise<Staff[]> {
    const {data} = await axiosInstance.get('/staff');
    return data;
}

export function useStaff() {
    // for filtering staff by treatment
    const [filter, setFilter] = useState("all");

    const selectFn = useCallback((data: Staff[]) => {
        if (filter === "all") return data;
        return filterByTreatment(data, filter)
    }, [filter])

    const fallback: Staff[] = [];

    const {data: staff = fallback} = useQuery({
        queryKey: [queryKeys.staff],
        queryFn: getStaff,
        select: selectFn
    })

    return {staff, filter, setFilter};
}
