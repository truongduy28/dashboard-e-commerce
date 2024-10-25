import { Button, Typography } from "antd";
import { useRef } from "react";
import { MdAdd } from "react-icons/md";
import { colors } from "../../constants/appInfos";

const { Text } = Typography;

interface Props {
  multiple?: boolean;
  onUpload: (file: File | FileList) => void;
  shape?: "square" | "rectangle";
}

const CustomUpload = ({
  onUpload,
  multiple = false,
  shape = "square",
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    onUpload(multiple ? files : files[0]);

    event.target.value = "";
  };

  return (
    <>
      {shape === "rectangle" ? (
        <>
          <Button
            onClick={handleUploadClick}
            icon={<MdAdd />}
            type="dashed"
            size="small"
          >
            Upload
          </Button>
        </>
      ) : (
        <div
          className="rounded d-flex align-items-center justify-content-center p-3 upload-button-wrapper"
          style={{ borderColor: colors.gray600 }}
          onClick={handleUploadClick}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <MdAdd color={colors.gray600} size={30} />
            <Text type="secondary">Upload</Text>
          </div>
        </div>
      )}

      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        accept="image/*"
      />
    </>
  );
};

export default CustomUpload;
