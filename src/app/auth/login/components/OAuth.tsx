import { faMicrosoft } from "@fortawesome/free-brands-svg-icons/faMicrosoft";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";

const OAuth = () => (
  <div className="flex flex-col gap-5">
    <Button
      className="flex flex-row gap-3 !bg-red-500 !rounded-lg !normal-case"
      variant="contained"
      size="large">
      <FontAwesomeIcon icon={faGoogle} />
      Google
    </Button>

    <Button
      className="flex flex-row gap-3 !rounded-lg !normal-case"
      variant="contained"
      size="large">
      <FontAwesomeIcon icon={faMicrosoft} />
      Microsoft
    </Button>
  </div>
);

export { OAuth };
