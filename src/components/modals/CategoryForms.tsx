import { useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, TreeSelect } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useAddCategory } from "../../hooks/tanstackquery/useCategory";
import { TreeNode } from "../../interfaces/common";
import { formatSlug, sanitizePayload } from "../../utils/formater";

interface Props {
  visible: boolean;
  onClose: () => void;
  categories: TreeNode[] | undefined;
}

interface Payload {
  parentId: string;
  title: string;
  description: string;
  slug: string;
}

const CategoryForms = ({ onClose, visible, categories }: Props) => {
  const queryClient = useQueryClient();
  // API: Add category
  const { mutate, isPending } = useAddCategory();
  const [form] = useForm();

  const handleSubmit = (value: Payload) => {
    value.slug = formatSlug(value.title);
    mutate(sanitizePayload(value), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
        handleClose();
      },
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      onOk={form.submit}
      loading={isPending}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        disabled={isPending}
      >
        <Form.Item label="Parent category" name={"parentId"}>
          <TreeSelect treeData={categories} allowClear />
        </Form.Item>
        <Form.Item
          name={"title"}
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="" allowClear />
        </Form.Item>
        <Form.Item name={"description"} label="Description">
          <TextArea rows={4} maxLength={350} showCount allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForms;
