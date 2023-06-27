import UserMinimal from "./UserMinimal";

class Message {
    id: string;
    user: UserMinimal;
    text: string;
    timestamp: number;

    constructor(id: string, user: UserMinimal, text: string, timestamp: number) {
        this.id = id;
        this.user = user;
        this.text = text;
        this.timestamp = timestamp;
    }
}

export default Message