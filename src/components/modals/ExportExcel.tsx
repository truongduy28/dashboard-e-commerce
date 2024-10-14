import {
  Button,
  Checkbox,
  DatePicker,
  List,
  message,
  Modal,
  Space,
} from "antd";
import { useState } from "react";
import { useExportSupplier } from "../../hooks/tanstackquery/useSupplier";
import { exportToExcel } from "../../utils/excel";

const { RangePicker } = DatePicker;

const initializeDate = {
  startDate: "",
  endDate: "",
};

interface Column {
  label: string;
  value: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  columns: Column[];
  nameReplacer?: { new: string; previous: string }[];
}

const ExportExcel = ({
  visible,
  onClose,
  columns = [],
  nameReplacer = [],
}: Props) => {
  // API: Export to Excel
  const { mutate, isPending } = useExportSupplier();
  const ignoreColumns = ["index", "action"];
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [date, setDate] = useState<{ startDate: string; endDate: string }>(
    initializeDate
  );

  const toggleItem = (value: string) => {
    if (selectedColumns.includes(value)) {
      setSelectedColumns(selectedColumns.filter((column) => column !== value));
    } else {
      setSelectedColumns([...selectedColumns, value]);
    }
  };

  const serverColumns: Column[] = columns.map((c) => ({
    value: nameReplacer.find((n) => n.previous === c.value)?.new || c.value,
    label: c.label,
  }));

  const execute = () => {
    mutate(
      { ...date, columns: selectedColumns },
      {
        onSuccess: async (data) => {
          await exportToExcel(data.data);
          message.success("Data exported successfully!");
          setSelectedColumns([]);
          setDate(initializeDate);
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="Export to Excel"
      loading={isPending}
      onOk={execute}
    >
      <div className="d-flex justify-content-center">
        <Space>
          <RangePicker
            onChange={(_, dates) =>
              setDate((prev) => ({
                ...prev,
                startDate: dates[0],
                endDate: dates[1],
              }))
            }
          />
          <Button type="link">Export All</Button>
        </Space>
      </div>
      <List
        dataSource={serverColumns}
        renderItem={(columns) =>
          !ignoreColumns.includes(columns.value) && (
            <List.Item>
              <Checkbox
                name={columns.value}
                checked={selectedColumns.includes(columns.value)}
                onChange={() => toggleItem(columns.value)}
              >
                {columns.label}
              </Checkbox>
            </List.Item>
          )
        }
      />
    </Modal>
  );
};

export default ExportExcel;
