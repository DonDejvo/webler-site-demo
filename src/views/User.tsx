import UserConversation from "./UserConversation";

class User {

    uid: string;

    username: string;

    usernameLowercase: string;

    bio: string;

    avatarUrl: string;

    conversations: UserConversation[];

    constructor(uid: string, username: string) {
        this.uid = uid;
        this.username = username;
        this.usernameLowercase = username.toLowerCase();
        this.bio = "Member of Webler";
        this.avatarUrl = "";
        this.conversations = [];
    }
}

export default User;