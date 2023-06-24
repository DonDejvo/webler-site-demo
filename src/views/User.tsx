class User {

    username: string;

    nationality: string | null;

    bio: string;

    avatarUrl: string;

    constructor(username: string) {
        this.username = username;
        this.nationality = null;
        this.bio = "Member of Webler";
        this.avatarUrl = "";
    }
}

export default User;