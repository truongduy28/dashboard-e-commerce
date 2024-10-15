import { Editor } from "@tinymce/tinymce-react";
import { Button, Card, Form, Input, Select, Space, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useRef } from "react";
import { useGetSuppliers } from "../../../hooks/tanstackquery/useSupplier";

const { Title } = Typography;

interface ProductPayload {
  title: string;
  description: string;
  content: string;
  slug: string;
  categories: string[];
  supplier: string;
}

const AddProductScreen = () => {
  // API: Get suppliers
  const { data: suppliers } = useGetSuppliers({
    page: 1,
    pageSize: 999999,
  });

  const supplierOptions = useMemo(() => {
    if (suppliers?.data && suppliers.data.total)
      return suppliers?.data.items.map((s) => ({
        value: s._id,
        label: s.name,
      }));
    return [];
  }, [suppliers]);

  const [form] = useForm();
  const editorRef = useRef<any>(null);

  const handleSubmit = (value: ProductPayload) => {
    const content = editorRef?.current?.getContent() || "";
    value.content = content;
    console.log(value);
  };

  return (
    <div>
      <Title style={{ fontSize: 22 }}>Add Product</Title>
      <Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
        <div className="row">
          <div className="col">
            <Form.Item
              name={"title"}
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input allowClear maxLength={150} showCount />
            </Form.Item>
            <Form.Item name={"description"} label="Description">
              <TextArea allowClear maxLength={1000} showCount></TextArea>
            </Form.Item>
            <Form.Item>
              <Editor
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Form.Item>
          </div>
          <div className="col">
            <Card size="small">
              <Form.Item name="categories" label="Categories">
                <Select />
              </Form.Item>
            </Card>
            <Card size="small" className="mt-3">
              <Form.Item
                name="supplier"
                label="Supplier"
                rules={[{ required: true, message: "Supplier is required" }]}
              >
                <Select
                  options={supplierOptions}
                  placeholder="Select a supplier"
                />
              </Form.Item>
            </Card>
            <Card size="small" className="mt-3">
              <Space>
                <Button size="middle">Cancel</Button>
                <Button
                  size="middle"
                  type="primary"
                  onClick={() => form.submit()}
                >
                  Submit
                </Button>
              </Space>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductScreen;
