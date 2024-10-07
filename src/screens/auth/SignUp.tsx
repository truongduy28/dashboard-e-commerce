import { Link } from "react-router-dom";

import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { appInfo } from "../../constants/appInfos";
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleApi";
import { REGISTER } from "../../constants/endpoint";

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (value: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await handleAPI(REGISTER, value, "post");
      message.success((res as any).message);
    } catch (error) {
      message.error((error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <Title level={2}>Create your account</Title>
        <Paragraph type="secondary">
          Join us! please enter your details
        </Paragraph>
      </div>

      {/* Form section */}
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSignUp}
        disabled={isLoading}
      >
        <Form.Item
          name={"name"}
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name!!!",
            },
            {
              min: 3,
              message: "Name must be at least 3 characters!!!",
            },
          ]}
        >
          <Input maxLength={100} type="text" placeholder="Enter your name" />
        </Form.Item>
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

      {/* Social login */}
      <SocialLogin />

      {/* Sign up button */}
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
          Sign Up
        </Button>
      </div>

      {/* Login link */}
      <div className="mt-3 text-center">
        <Space>
          <Text>Already have an account? </Text>
          <Link to={"/login"}>Log in</Link>
        </Space>
      </div>
    </Card>
  );
};

export default SignUp;
