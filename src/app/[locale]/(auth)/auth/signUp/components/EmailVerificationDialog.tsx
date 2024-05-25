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
};

const EmailVerificationDialog = ({ isOpen }: Props) => {
  const t = useTranslations();
  const router = useRouter();

  const goToLogin = () => router.push("/auth/login");

  return (
    <Dialog open={isOpen} onClose={goToLogin}>
      <DialogTitle>{t("Account created successfully")}</DialogTitle>

      <DialogContent className="flex flex-col gap-5">
        <DialogContentText>
          {t(
            "Congratulations! We have sent a verification link to your email Please check your inbox to verify your account",
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
          <Alert severity="info">{t("Don't forget to check your junk or spam folder")}.</Alert>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={goToLogin} variant="contained">
          {t("Ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EmailVerificationDialog };
