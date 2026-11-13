import { getSessionUser } from "../../../../utils/auth";
import AuthScene from "../../components/AuthScene";
import JoinInvitation from "./JoinInvitation";

export default async function InvitationPage({ params }: { params: { inviteId: string } }) {
  const user = await getSessionUser();

  return (
    <AuthScene>
      <JoinInvitation inviteId={params.inviteId} signedIn={!!user} />
    </AuthScene>
  );
}
