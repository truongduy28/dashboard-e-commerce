import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { User } from "iconsax-react";
import { forwardRef, useRef, useState } from "react";
import handleAPI from "../../apis/handleApi";
import { colors } from "../../constants/appInfos";
import { ADD_SUPPLIER } from "../../constants/endpoint";
import { SupplierResponse } from "../../interfaces/supplier";
import { uploadFile } from "../../utils/file";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isTaking, setIsTaking] = useState(false);

  const handleSubmit = async (value: any) => {
    setIsLoading(true);
    try {
      if (file) {
        const photoUrl = await uploadFile(file);
        value.photoUrl = photoUrl;
      }
      value.isTaking = isTaking ? 1 : 0;

      const res = (await handleAPI(
        ADD_SUPPLIER,
        value,
        "post"
      )) as unknown as SupplierResponse;
      console.log(res);
      if (res.data) {
        message.success(res.message);
        onOk();
      }
    } catch (error) {
      console.log("Error when add new supplier: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      onOk={form.submit}
      onCancel={onClose}
      title="Add Supplier"
    >
      <Form
        disabled={isLoading}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      >
        <AvatarFormPartial ref={inpFileRef} file={file} onChange={setFile} />
        <Form.Item
          label="Supplier name"
          name="name"
          rules={[{ required: true, message: "Please enter supplier name" }]}
        >
          <Input size="large" placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item
          label="Product"
          name={"product"}
          rules={[{ required: true, message: "Please enter product name" }]}
        >
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
          <TypeFormPartial
            isTaking={isTaking}
            onChange={() => setIsTaking(!isTaking)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierForms;

const TypeFormPartial = ({
  isTaking,
  onChange,
}: {
  isTaking: boolean;
  onChange: () => void;
}) => {
  return (
    <>
      <div className="mb-2">
        <Button type={isTaking ? "default" : "primary"} onClick={onChange}>
          Not taking return
        </Button>
      </div>
      <div>
        <Button type={isTaking ? "primary" : "default"} onClick={onChange}>
          Taking return
        </Button>
      </div>
    </>
  );
};

const AvatarFormPartial = forwardRef(
  (
    { file, onChange }: { file: any; onChange: (val: any) => void },
    ref: any
  ) => {
    return (
      <>
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
            <Button onClick={() => ref.current.click()} type="link">
              Browse image
            </Button>
          </div>
        </label>
        <div className="d-none">
          <input
            ref={ref}
            type="file"
            name="inpFile"
            id="inpFile"
            accept="image/*"
            onChange={(val: any) => onChange(val.target.files[0])}
          />
        </div>
      </>
    );
  }
);
