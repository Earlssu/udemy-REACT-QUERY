import {queryKeys} from "@/react-query/constants";

export const generateUserKey = (userId: number, userToken: string) => {
    // deliberately exclude the userToken to keep the key consistent for userId
    return [queryKeys.user, userId];
}

export const generateUserAppointmentsKey = (userId: number, userToken: string) => {
    return [queryKeys.appointments, queryKeys.user, userId, userToken];
}