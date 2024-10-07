import { Button } from "antd";
import { useState } from "react";

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithGoogle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
