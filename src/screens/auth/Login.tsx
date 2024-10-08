import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { appInfo } from "../../constants/appInfos";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import { addAuth, AuthState } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import handleAPI from "../../apis/handleApi";
import { LOGIN } from "../../constants/endpoint";
import { RegisterResponse } from "../../interfaces/user";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const handleLogin = async (value: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = (await handleAPI(
        LOGIN,
        value,
        "post"
      )) as unknown as RegisterResponse;
      message.success(res.message);
      res.data.token && dispatch(addAuth({ ...res.data, isRemember }));
    } catch (error) {
      message.error((error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        {/* Logo section */}
        <div className="text-center">
          <img
            className="mb-3"
            src={appInfo.logo}
            alt=""
            style={{
              width: 48,
              height: 48,
            }}
          />
          <Title level={2}>Log in to your account</Title>
          <Paragraph type="secondary">
            Welcome back! please enter your details
          </Paragraph>
        </div>

        {/* Form section */}
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email!!!",
              },
              {
                type: "email",
                message: "Please enter a valid email!!!",
              },
            ]}
          >
            <Input
              allowClear
              maxLength={100}
              type="email"
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!!!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!!!",
              },
            ]}
          >
            <Input
              allowClear
              type="password"
              min={8}
              max={100}
              placeholder="Enter your password"
            />
          </Form.Item>
        </Form>

        {/* Options section */}
        <div className="row mb-4">
          <div className="col">
            <Checkbox onChange={(e) => setIsRemember(e.target.checked)}>
              Remember for 30 days
            </Checkbox>
          </div>
          <div className="col text-right">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        {/* Social login */}
        <SocialLogin />

        {/* Login button */}
        <div className="mt-4 mb-3">
          <Button
            loading={isLoading}
            onClick={() => form.submit()}
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
          >
            Login
          </Button>
        </div>

        {/* Sign up link */}
        <div className="mt-3 text-center">
          <Space>
            <Text>Don't have an acount? </Text>
            <Link to={"/sign-up"}>Sign up</Link>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default Login;
