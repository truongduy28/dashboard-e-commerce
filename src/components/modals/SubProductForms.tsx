import {
  ColorPicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { AggregationColor } from "antd/es/color-picker/color";
import { useState } from "react";
import { useCreateSubProduct } from "../../hooks/tanstackquery/useProduct";
import { IProduct, SubProductPayload } from "../../interfaces/product";
import { uploadFile } from "../../utils/file";
import { sanitizePayload } from "../../utils/formater";

interface Props {
  visible: boolean;
  onClose: () => void;
  product: IProduct | undefined;
}
const SubProductForms = ({ onClose, visible, product }: Props) => {
  // API: Create sub product
  const { mutate, isPending } = useCreateSubProduct();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const isLoading = isUploading || isPending;

  const handleClose = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const handleSubmit = async (value: SubProductPayload) => {
    value.color =
      typeof value.color === "string"
        ? value.color
        : (value.color as unknown as AggregationColor)?.toHexString();

    let urls: string[] = [];
    if (fileList && fileList.length > 0) {
      setIsUploading(true);
      const files: File[] = fileList.map((item) => {
        return new File([], item.name, {
          type: item.type,
          lastModified: item.lastModified,
        });
      });
      const uploadPromises = files.map(async (file) => {
        const url = await uploadFile(file, "sub-products");
        return url;
      });
      urls = await Promise.all(uploadPromises);
      setIsUploading(false);
    }

    value.images = urls;
    value.productId = product?._id as string;
    mutate(sanitizePayload(value), {
      onSuccess: (data) => {
        message.success(data.message);
        handleClose();
      },
    });
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const items = newFileList.map((item) =>
      item.originFileObj
        ? {
            ...item,
            url: item.originFileObj
              ? URL.createObjectURL(item.originFileObj)
              : "",
            status: "done",
          }
        : { ...item }
    );

    setFileList(items);
  };

  return (
    <Modal
      title="Add Sub Product"
      open={visible}
      onCancel={handleClose}
      onOk={form.submit}
    >
      <Typography.Title level={5}>{product?.title}</Typography.Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        size="large"
        form={form}
        disabled={isLoading}
      >
        <Form.Item name="color" label="Color">
          <ColorPicker format="hex" onChange={(a) => console.log(a)} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "type device size",
            },
          ]}
          name="size"
          label="Size"
        >
          <Input allowClear />
        </Form.Item>

        <div className="row">
          <div className="col">
            <Form.Item name={"qty"} label="Quantity">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name={"price"} label="Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name={"discount"} label="Discount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Upload
            multiple
            fileList={fileList}
            accept="image/*"
            listType="picture-card"
            onChange={handleChange}
          >
            Upload
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubProductForms;
