import { Button, message } from "antd";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/config";
import handleAPI from "../../../apis/handleApi";
import { GOOGLE_LOGIN } from "../../../constants/endpoint";
import { AuthResponse } from "../../../interfaces/user";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../redux/reducers/authReducer";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "user@example.com",
});

interface Props {
  isRemember?: boolean;
}
const SocialLogin = ({ isRemember }: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const google = await signInWithPopup(auth, provider);
      if (google) {
        const { email, displayName, photoURL } = google.user;
        const res = (await handleAPI(
          GOOGLE_LOGIN,
          { email, name: displayName, photoURL },
          "post"
        )) as unknown as AuthResponse;
        !!res.data.token && dispatch(addAuth({ ...res.data, isRemember }));
        message.success(res.message);
      }
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        message.warning("Sign-in popup was closed. Please try again.");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleLoginWithGoogle}
      style={{
        width: "100%",
      }}
      size="large"
      icon={
        <img
          width={24}
          height={24}
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      }
    >
      Continue with Google
    </Button>
  );
};

export default SocialLogin;
