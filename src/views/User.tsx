class User {

    uid: string;

    username: string;

    usernameLowercase: string;

    nationality: string | null;

    bio: string;

    avatarUrl: string;

    constructor(uid: string, username: string) {
        this.uid = uid;
        this.username = username;
        this.usernameLowercase = username.toLowerCase();
        this.nationality = null;
        this.bio = "Member of Webler";
        this.avatarUrl = "";
    }
}

export default User;