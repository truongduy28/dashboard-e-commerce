import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Card,
  Divider,
  Form,
  Image,
  Input,
  message,
  Select,
  Space,
  TreeSelect,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Add } from "iconsax-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import CustomUpload from "../../../components/buttons/CustomUpload";
import CategoryForms from "../../../components/modals/CategoryForms";
import { assets } from "../../../constants/appInfos";
import { useGetCategories } from "../../../hooks/tanstackquery/useCategory";
import {
  useCreateProduct,
  useGetProductDetail,
  useUpdateProduct,
} from "../../../hooks/tanstackquery/useProduct";
import { useGetSuppliers } from "../../../hooks/tanstackquery/useSupplier";
import { useDialog } from "../../../hooks/useDialogV2";
import { ProductPayload } from "../../../interfaces/product";
import { transformToTreeOptions } from "../../../utils/data-transfer";
import { uploadFile } from "../../../utils/file";
import { formatSlug, sanitizePayload } from "../../../utils/formater";
import { config } from "../../../utils/tyniMCE";

const { Title } = Typography;

const AddProductScreen = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isUpdateMode = !!id;

  // API: Get Product detail for updating
  const { data: detailData, isLoading: isGetDetailLoading } =
    useGetProductDetail(id);

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

  // API: Create product
  const createApi = useCreateProduct();

  // API: Update product
  const updateApi = useUpdateProduct(id);

  // API: Routing api create or update product
  const { mutate, isPending } = isUpdateMode ? updateApi : createApi;

  // DIALOG
  const { isShow: isShowCategoryForms, toggle: toggleCategoryForms } =
    useDialog();

  const [form] = useForm();
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  useEffect(() => {
    if (detailData) {
      const { product } = detailData.data;
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        content: product.content,
        categories: product.categories.map((category) => category._id),
        supplier: product.supplier,
        images: product.images,
      });
      setContent(product.content);
    }
  }, [detailData, form]);

  const isLoading = isUploadLoading || isPending || isGetDetailLoading;

  const handleSubmit = async (value: ProductPayload) => {
    const content = editorRef?.current?.getContent() || "";
    value.content = content;

    setIsUploadLoading(true);
    let urls: string[] = [];
    if (files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const url = await uploadFile(file, "products");
        return url;
      });
      urls = await Promise.all(uploadPromises);
    }
    setIsUploadLoading(false);
    value.images = urls;
    value.slug = formatSlug(value.title);
    mutate(sanitizePayload(value), {
      onSuccess: (data) => {
        form.resetFields();
        setFiles([]);
        message.success(data.message);
        navigate("/inventory");
      },
    });
  };

  const selectedFiles = (file: File | FileList) => {
    const fileExists = (newFile: File) => {
      return files.some((existingFile) => existingFile.name === newFile.name);
    };

    if (file instanceof FileList) {
      Array.from(file).forEach((newFile) => {
        if (!fileExists(newFile)) {
          setFiles((prevFiles) => [...prevFiles, newFile]);
        }
      });
    }
  };

  return (
    <div>
      <Title style={{ fontSize: 22 }}>
        {isUpdateMode ? "Edit product information" : "Add new product"}
      </Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        disabled={isLoading}
      >
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
                disabled={isLoading}
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={content || ""}
                init={config}
              />
            </Form.Item>
          </div>
          <div className="col-4">
            <Card size="small" title="Categories">
              <Form.Item name="categories">
                <TreeSelect
                  multiple
                  treeDefaultExpandAll={true}
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
            <Card size="small" className="mt-3" title="Supplier">
              <Form.Item
                name="supplier"
                rules={[{ required: true, message: "Supplier is required" }]}
              >
                <Select
                  options={supplierOptions}
                  placeholder="Select a supplier"
                />
              </Form.Item>
            </Card>
            <Card
              size="small"
              className="mt-3"
              title="Images"
              extra={
                <CustomUpload
                  onUpload={selectedFiles}
                  multiple
                  shape="rectangle"
                />
              }
            >
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {files.map((file) => (
                  <Image
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={URL.createObjectURL(file)}
                    key={file.name}
                    fallback={assets.fallbackImage}
                  />
                ))}
              </Image.PreviewGroup>
            </Card>
            <Card size="small" className="mt-3">
              <Space>
                <Button size="middle" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  size="middle"
                  type="primary"
                  onClick={() => form.submit()}
                  loading={isLoading}
                >
                  {isUpdateMode ? "Update" : "Submit"}
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
