import { Avatar, Button, Form, Input, Modal, Select, Typography } from "antd";
import { User } from "iconsax-react";
import { useRef, useState } from "react";
import { colors } from "../../constants/appInfos";

const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
}

const SupplierForms = ({ onClose, onOk, visible }: Props) => {
  const [form] = Form.useForm();
  const inpFileRef = useRef<any>();
  const [file, setFile] = useState<any>(null);

  const handleSubmit = (value: any) => {
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      onOk={onOk}
      onCancel={onClose}
      title="Add Supplier"
    >
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      >
        <label
          className="row text-center justify-content-center mb-4"
          htmlFor="inpFile"
        >
          {file ? (
            <Avatar size={100} src={URL.createObjectURL(file)} />
          ) : (
            <Avatar size={100}>
              <User size={60} color={colors.gray600} />
            </Avatar>
          )}

          <div className="pl-2 my-auto">
            <Paragraph className="text-muted m-0">Drag image here</Paragraph>
            <Paragraph className="text-muted mb-0">Or</Paragraph>
            <Button onClick={() => inpFileRef.current.click()} type="link">
              Browse image
            </Button>
          </div>
        </label>
        <Form.Item label="Supplier name" name="name">
          <Input size="large" placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item label="Product" name={"product"}>
          <Input size="large" placeholder="Enter product name" allowClear />
        </Form.Item>
        <Form.Item name={"categories"} label="Categories">
          <Select
            options={[
              { value: 1, label: "Category 1" },
              { value: 2, label: "Category 2" },
            ]}
            size="large"
            placeholder="Select categories"
          />
        </Form.Item>
        <Form.Item label="Buying price" name="price">
          <Input
            size="large"
            type="number"
            placeholder="Enter buying price"
            allowClear
          />
        </Form.Item>
        <Form.Item label="Contact number" name={"contact"}>
          <Input size="large" placeholder="Enter contact number" allowClear />
        </Form.Item>
        <Form.Item label="Type">
          <TypeFormPartial />
        </Form.Item>
      </Form>
      <div className="d-none">
        <input
          ref={inpFileRef}
          type="file"
          name="inpFile"
          id="inpFile"
          accept="image/*"
          onChange={(val: any) => setFile(val.target.files[0])}
        />
      </div>
    </Modal>
  );
};

export default SupplierForms;

const TypeFormPartial = () => {
  const [isTalking, setIsTalking] = useState(false);
  console.log(isTalking);
  const onChange = () => {
    setIsTalking(!isTalking);
  };

  return (
    <>
      <div className="mb-2">
        <Button type={isTalking ? "default" : "primary"} onClick={onChange}>
          Not talking return
        </Button>
      </div>
      <div>
        <Button type={isTalking ? "primary" : "default"} onClick={onChange}>
          Talking return
        </Button>
      </div>
    </>
  );
};
