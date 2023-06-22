class User {

    username: string;

    nationality: string | null;

    bio: string;

    profileUrl: string | null;

    constructor(username: string) {
        this.username = username;
        this.nationality = null;
        this.bio = "Member of Webler";
        this.profileUrl = null;
    }
}

export default User;