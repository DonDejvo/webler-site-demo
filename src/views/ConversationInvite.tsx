import UserConversation from "./UserConversation";
import UserMinimal from "./UserMinimal"

class ConversationInvite {
    id: string;
    inviter: UserMinimal;
    conversation: UserConversation;
    constructor(id: string, conversation: UserConversation, inviter: UserMinimal) {
        this.id = id;
        this.inviter = inviter;
        this.conversation = conversation;
    }
}

export default ConversationInvite