import { useQueryClient } from "@tanstack/react-query";
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
import { useEffect, useState } from "react";
import {
  useCreateSubProduct,
  useGetSubProductDetail,
  useUpdateSubProduct,
} from "../../hooks/tanstackquery/useProduct";
import { IProduct, SubProductPayload } from "../../interfaces/product";
import { uploadFile } from "../../utils/file";
import { sanitizePayload } from "../../utils/formater";

interface Props {
  visible: boolean;
  onClose: () => void;
  product: IProduct | undefined;
  subProductId?: string;
}
const SubProductForms = ({
  onClose,
  visible,
  product,
  subProductId,
}: Props) => {
  const isEditMode = !!subProductId;

  const queryClient = useQueryClient();

  // API: Create sub product
  const createApi = useCreateSubProduct();

  // API: Update sub product
  const updateApi = useUpdateSubProduct(subProductId);

  // API: Routing create and update api
  const { mutate, isPending } = isEditMode ? updateApi : createApi;

  // API: Get sub-product detail to update
  const { data: subProduct, isLoading: isSubProductLoading } =
    useGetSubProductDetail(subProductId);

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const isLoading = isUploading || isPending || isSubProductLoading;

  useEffect(() => {
    if (isEditMode && subProduct?.item) {
      form.setFieldsValue(subProduct.item);
      setFileList(subProduct.item.images.map((img: string) => ({ url: img })));
    }
  }, [subProduct, isEditMode]);

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

    setIsUploading(true);
    let urls: string[] = [];
    if (fileList && fileList.length > 0) {
      // TODO: not yet re-check upload files with updating api
      for (const item of fileList) {
        if (item.uid.startsWith("link")) {
          urls.push(item.url as string);
        } else {
          const url = await uploadFile(
            item.originFileObj as File,
            "sub-products"
          );
          urls.push(url);
        }
      }
    }
    setIsUploading(false);
    value.images = urls;
    value.productId = product?._id as string;
    mutate(sanitizePayload(value), {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: isEditMode ? ["get-product-detail"] : ["get-products"],
        });
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
      loading={isLoading}
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
          <ColorPicker format="hex" />
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
