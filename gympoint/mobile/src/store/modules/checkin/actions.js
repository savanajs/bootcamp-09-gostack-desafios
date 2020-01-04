export function selectCheckinByStudentRequest(query) {
    return {
        type: '@checkin/SELECT_CHECKINS_REQUEST',
        payload: query,
    };
}

export function saveCheckinByStudentRequest(query) {
    return {
        type: '@checkin/SAVE_CHECKIN_REQUEST',
        loading: true,
        payload: query,
    };
}

export function selectCheckinsSuccess(checkins) {
    return {
        type: '@checkin/SELECT_CHECKINS_SUCCESS',
        payload: { checkins },
    };
}

export function checkinFailure() {
    return {
        type: '@checkin/CHECKIN_FAILURE',
    };
}
