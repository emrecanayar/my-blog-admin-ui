import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface CategoryActionButtonsProps {
  category: any;
  onDetail: (category: any) => void;
  onEdit: (category: any) => void;
  onDelete: (category: any) => void;
}

const CategoryActionButtons = ({
  category,
  onDetail,
  onEdit,
  onDelete,
}: CategoryActionButtonsProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <Tooltip title="Detayları Görüntüle">
        <IconButton
          onClick={() => onDetail(category)}
          style={{ backgroundColor: "#1976d2", color: "white" }}
          size="small"
        >
          <VisibilityIcon style={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Güncelle">
        <IconButton
          onClick={() => onEdit(category)}
          style={{ backgroundColor: "orange", color: "white" }}
          size="small"
        >
          <EditIcon style={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sil">
        <IconButton
          onClick={() => onDelete(category)}
          style={{ backgroundColor: "#d32f2f", color: "white" }}
          size="small"
        >
          <DeleteIcon style={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CategoryActionButtons;
