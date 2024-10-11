import { QueryClient } from "@tanstack/react-query";
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
import { forwardRef, useEffect, useRef, useState } from "react";
import { colors } from "../../constants/appInfos";
import {
  useAddSupplier,
  useUpdateSupplier,
} from "../../hooks/tanstackquery/useSupplier";
import { ISupplier, SupplierResponse } from "../../interfaces/supplier";
import { uploadFile } from "../../utils/file";

const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  supplier: ISupplier | undefined;
}

const SupplierForms = ({ onClose, onOk, visible, supplier }: Props) => {
  const queryClient = new QueryClient();

  // API: Add new supplier
  const addApi = useAddSupplier();
  // API: Update supplier
  const updateApi = useUpdateSupplier(supplier?._id || "");
  // API: Switch API
  const { mutate, isPending: isLoading } = supplier ? updateApi : addApi;

  const [form] = Form.useForm();
  const inpFileRef = useRef<any>();
  const [file, setFile] = useState<any>(null);
  const [isTaking, setIsTaking] = useState(false);

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);
      setIsTaking(supplier.isTaking === 1);
    }
  }, [form, supplier]);

  const handleSubmit = async (value: ISupplier) => {
    try {
      if (file) {
        const photoUrl = await uploadFile(file);
        value.photoUrl = photoUrl;
      }
      value.isTaking = isTaking ? 1 : 0;

      mutate(value, {
        onSuccess: (res: SupplierResponse) => {
          queryClient.invalidateQueries({ queryKey: ["get-suppliers"] }); // TODO: refetch list not working
          message.success(res.message);
          onOk();
        },
      });
    } catch (error) {
      console.log("Error when add new supplier: ", error);
    }
  };

  const closeModal = () => {
    form.resetFields();
    setFile(null);
    setIsTaking(false);
    onClose();
  };

  return (
    <Modal
      open={visible}
      onClose={closeModal}
      onOk={form.submit}
      onCancel={closeModal}
      title={`${supplier ? "Update" : "Add"} Supplier`}
    >
      <Form
        disabled={isLoading}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      >
        <AvatarFormPartial
          ref={inpFileRef}
          file={file}
          onChange={setFile}
          url={supplier?.photoUrl || ""}
        />
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
        <Form.Item label="Email" name={"email"}>
          <Input
            size="large"
            placeholder="Enter product email"
            allowClear
            type="email"
          />
        </Form.Item>
        <Form.Item label="On the way" name={"active"}>
          <Input
            size="large"
            placeholder="Enter product active on the way"
            allowClear
            type="number"
          />
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
    {
      url,
      file,
      onChange,
    }: { url: string; file: any; onChange: (val: any) => void },
    ref: any
  ) => {
    return (
      <>
        <label
          className="row text-center justify-content-center mb-4"
          htmlFor="inpFile"
        >
          {file || url ? (
            <Avatar size={100} src={file ? URL.createObjectURL(file) : url} />
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
