import { getServerSession } from "next-auth";

import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { SessionPayload } from "@/services/interfaces";

const getUserSession = async () => {
  const session = await getServerSession(authConfig);
  return session?.user as SessionPayload;
};

export { getUserSession };
