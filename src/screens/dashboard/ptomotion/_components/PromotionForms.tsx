import { useQueryClient } from "@tanstack/react-query";
import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
  UploadProps,
} from "antd";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  useAddPromotion,
  useGetPromotion,
  useUpdatePromotion,
} from "../../../../hooks/tanstackquery/usePromotion";
import { PromotionPayload } from "../../../../interfaces/promotion";
import { uploadFile } from "../../../../utils/file";

interface Props {
  open: boolean;
  onClose: () => void;
  promotionId?: string;
}
const PromotionForms = ({ open, onClose, promotionId }: Props) => {
  const isEditMode = useMemo(() => !!promotionId, [promotionId]);

  const queryClient = useQueryClient();

  // API: Get promotion by id (for edit mode)
  const { data, isLoading: initDataLoading } = useGetPromotion(promotionId);

  // API: Add promotion
  const createApi = useAddPromotion();

  // API: Update Api
  const updateApi = useUpdatePromotion(promotionId);

  // Api: navigate api
  const { mutate, isPending } = isEditMode ? updateApi : createApi;

  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [isUploading, setIsUploading] = useState(false);

  const isLoading = useMemo(
    () => isPending || initDataLoading || isUploading,
    [isPending, initDataLoading, isUploading]
  );

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data.data,
        startAt: moment(data.data.startAt),
        endAt: moment(data.data.endAt),
      });
      setFileList(
        data.data.imageURL ? [{ url: data.data.imageURL, uid: "link" }] : []
      );
    }
  }, [data]);

  console.log(fileList);

  const handleSubmit = async (value: PromotionPayload) => {
    setIsUploading(true);
    try {
      if (fileList.length === 0) {
        message.error("Please upload image");
        return;
      }
      let url: string = "";
      if (fileList && fileList.length > 0) {
        for (const item of fileList) {
          if (item.uid.startsWith("link")) {
            url = item.url as string;
          } else {
            const link = await uploadFile(
              item.originFileObj as File,
              "sub-products"
            );
            url = link;
          }
        }
      }
      setIsUploading(false);
      mutate({ ...value, imageURL: url } as PromotionPayload, {
        onSuccess: (data: any) => {
          message.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["get-promotions"] });
          handleClose();
        },
      });
    } catch (error) {
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
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
      title={isEditMode ? "Edit Promotion" : "Add New Promotion"}
      open={open}
      onClose={handleClose}
      onCancel={handleClose}
      okButtonProps={{
        loading: isLoading,
      }}
      cancelButtonProps={{
        loading: isLoading,
      }}
      onOk={() => form.submit()}
    >
      <Upload
        accept="image/*"
        fileList={fileList}
        listType="picture-card"
        className="mb-3"
        onChange={handleImageChange}
      >
        {fileList.length === 0 ? "Upload" : null}
      </Upload>
      <Form
        form={form}
        disabled={isLoading}
        size="large"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name={"title"}
          label="Title"
          rules={[{ required: true, message: "Please enter promotion" }]}
        >
          <Input placeholder="title" allowClear />
        </Form.Item>
        <Form.Item name={"description"} label="Description">
          <Input.TextArea rows={4} placeholder="Description" allowClear />
        </Form.Item>
        <div className="row">
          <div className="col">
            <Form.Item name="code" label="CODE" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name="value" label="Value" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Item name="numOfAvailable" label="Num of value">
              <Input type="number" />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name="type" label="Type" initialValue={"discount"}>
              <Select
                options={[
                  {
                    label: "Discount",
                    value: "discount",
                  },
                  {
                    label: "Percent",
                    value: "percent",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Item
              name={"startAt"}
              label="Start"
              rules={[{ required: true }]}
            >
              <DatePicker showTime format={"DD/MM/YYYY HH:mm:ss"} />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name={"endAt"} label="End" rules={[{ required: true }]}>
              <DatePicker showTime format={"DD/MM/YYYY HH:mm:ss"} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default PromotionForms;
