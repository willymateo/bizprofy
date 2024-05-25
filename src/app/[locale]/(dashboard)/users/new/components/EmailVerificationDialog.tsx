import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { EMAIL_VERIFICATION_MINUTES_TO_EXPIRE } from "../../../../../../constants";

type Props = {
  isOpen: boolean;
  email: string;
};

const EmailVerificationDialog = ({ isOpen, email }: Props) => {
  const t = useTranslations();
  const router = useRouter();

  const goToGeneralUsersSection = () => router.push("/users");

  return (
    <Dialog open={isOpen} onClose={goToGeneralUsersSection}>
      <DialogTitle>{t("User created successfully")}</DialogTitle>

      <DialogContent className="flex flex-col gap-5">
        <DialogContentText>
          {t(
            "We've sent a verification link to {email} Please contact the new user to check their inbox and verify their account",
            {
              email,
            },
          )}
          .
        </DialogContentText>

        <h4 className="p-0 text-md">{t("Important note")}:</h4>

        <div className="flex flex-col gap-3">
          <Alert severity="info">
            {t("The link will be available for {minutes} minutes only", {
              minutes: EMAIL_VERIFICATION_MINUTES_TO_EXPIRE,
            })}
            .
          </Alert>
          <Alert severity="info">{t("Don't forget to check the junk or spam folder")}.</Alert>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={goToGeneralUsersSection} variant="contained">
          {t("Ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EmailVerificationDialog };
