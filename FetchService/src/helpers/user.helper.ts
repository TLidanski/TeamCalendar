export default class UserHelper {
    constructor() {}

    public extractUsersFromLeaves = (leaves: any[]) => {
        let usersObj: any = {};
        for (const leave of leaves) {
            const userId: string = leave.organizer.params['X-CONFLUENCE-USER-KEY'];
            if (!(userId in usersObj)) {
                usersObj[userId] = {
                    id: userId,
                    name: leave.organizer.params.CN,
                    email: leave.organizer.val.split(':')[1]
                };
            }
        }

        return Object.values(usersObj);
    }
}