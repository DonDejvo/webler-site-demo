import UserMinimal from "./UserMinimal";

class Conversation {
    id: string;
    title: string;
    isGroup: boolean;
    participants: UserMinimal[];
    ownerId: string;

    constructor(id: string, title: string, isGroup: boolean, ownerId: string) {
        this.id = id;
        this.title = title;
        this.isGroup = isGroup;
        this.ownerId = ownerId;
        this.participants = [];
    }
}

export default Conversation