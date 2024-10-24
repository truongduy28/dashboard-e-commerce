import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Space,
  TreeSelect,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Add } from "iconsax-react";
import { useMemo, useRef } from "react";
import CategoryForms from "../../../components/modals/CategoryForms";
import { useGetCategories } from "../../../hooks/tanstackquery/useCategory";
import { useGetSuppliers } from "../../../hooks/tanstackquery/useSupplier";
import { useDialog } from "../../../hooks/useDialogV2";
import { transformToTreeOptions } from "../../../utils/data-transfer";
import { config } from "../../../utils/tyniMCE";

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

  // API: Get categories
  const { data: categories } = useGetCategories({ page: 1, size: 999999 });

  const categoryOptions = useMemo(() => {
    if (categories?.data) {
      const treeData = transformToTreeOptions(
        categories.data,
        (item) => item._id,
        (item) => item.title,
        (item) => item.parentId
      );
      return treeData;
    }
    return [];
  }, [categories]);

  // DIALOG
  const { isShow: isShowCategoryForms, toggle: toggleCategoryForms } =
    useDialog();

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
                init={config}
              />
            </Form.Item>
          </div>
          <div className="col">
            <Card size="small">
              <Form.Item name="categories" label="Categories">
                <TreeSelect
                  treeData={categoryOptions}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="m-0" />
                      <Button
                        type="link"
                        icon={<Add />}
                        onClick={toggleCategoryForms}
                      >
                        Add category
                      </Button>
                    </>
                  )}
                />
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
      <CategoryForms
        categories={categoryOptions}
        visible={isShowCategoryForms}
        onClose={toggleCategoryForms}
      />
    </div>
  );
};

export default AddProductScreen;
