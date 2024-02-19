import styles from "./categoryUpdate.module.css";
import modalStyles from "../../../components/modal/modal.module.css";
import { useEffect, useState } from "react";
import { UpdateCategoryCommand } from "../../../services/catagory/dtos/updateCategoryCommand";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../components/modal/Modal";
import categoryStore from "../../../stores/category/categoryStore";
import { GetByIdCategoryResponse } from "../../../services/catagory/dtos/getByIdCategoryResponse";
import uploadedFileStore from "../../../stores/uploadedFile/uploadedFileStore";
import { observer } from "mobx-react";
import useFileUpload from "../../../hooks/useFileUpload";
import { handleApiError } from "../../../helpers/errorHelpers";

export interface CategoryUpdateProps {
  categoryId: string;
  onClose: () => void;
  onUpdated: () => void;
}

const CategoryUpdate = observer(
  ({ categoryId, onClose, onUpdated }: CategoryUpdateProps) => {
    const [category, setCategory] = useState<GetByIdCategoryResponse>(
      {} as GetByIdCategoryResponse
    );
    const [updateCategory, setUpdateCategory] = useState<UpdateCategoryCommand>(
      {} as UpdateCategoryCommand
    );

    const { fileName, handleFileSelect } = useFileUpload();

    useEffect(() => {
      getCategoryById(categoryId);
    }, [categoryId]);

    const handleSubmit = async (event?: any) => {
      event?.preventDefault();
      try {
        if (
          uploadedFileStore.uploadedFile &&
          uploadedFileStore.uploadedFile.token !== null &&
          uploadedFileStore.uploadedFile.token !== undefined
        ) {
          updateCategory.tokens.push(uploadedFileStore.uploadedFile.token);
        }

        await categoryStore.updateCategory(updateCategory);
        toast.success("Kategori güncellendi.");
        onUpdated();
      } catch (error: any) {
        handleApiError(error);
      }
    };

    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setUpdateCategory({
        ...updateCategory,
        [name]: value,
      });
    };

    const getCategoryById = async (categoryId: string) => {
      var result = await categoryStore.getCategory(categoryId);
      setCategory(result.data);
      setUpdateCategory({
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
        isPopular: result.data.isPopular,
        tokens: [],
        uploadedFileId: result.data.categoryUploadedFiles[0].id || "",
      });
    };

    const ModalContent = (
      <form onSubmit={handleSubmit}>
        <div className={modalStyles.formRow}>
          <div className={modalStyles.formGroup}>
            <input
              type="hidden"
              id="id"
              name="id"
              onChange={handleInputChange}
              value={updateCategory.id}
            />
          </div>
        </div>
        <div className={modalStyles.formRow}>
          <div className={modalStyles.formGroup}>
            <label htmlFor="id">Resim</label>
            <img
              src={
                "https://localhost:7265/" +
                category?.categoryUploadedFiles?.[0]?.newPath
              }
              width={400}
              height={250}
              alt="Kategori Resmi"
            />
          </div>
        </div>
        <div className={modalStyles.formRow}>
          <div className={modalStyles.formGroup}>
            <label htmlFor="name">Ad</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={updateCategory.name}
            />
          </div>
          <div className={modalStyles.formGroup}>
            <label htmlFor="description">Açıklama</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={updateCategory.description}
            />
          </div>
        </div>
        <div className={modalStyles.formRow}>
          <div className={modalStyles.formGroup}>
            <input
              type="file"
              id="file"
              className={modalStyles.hiddenFileInput}
              onChange={handleFileSelect}
            />
            <label htmlFor="file" className={modalStyles.fileInputLabel}>
              Dosya Seç...
            </label>
            <span id="fileName" className={modalStyles.fileName}>
              {fileName || "Dosya Seçilmedi"}
            </span>
          </div>
          <div
            className={`${modalStyles.formGroup} ${modalStyles.checkboxGroup}`}
          >
            <input
              type="checkbox"
              id="isPopular"
              name="isPopuler"
              onChange={handleInputChange}
              checked={updateCategory.isPopular}
            />
            <label htmlFor="isPopular">Popüler mi?</label>
          </div>
        </div>
      </form>
    );

    return (
      <div>
        <Modal
          isOpen={true}
          onClose={onClose}
          title={"Kategori Güncelle"}
          isVisibleUpdateButton={true}
          onSave={async () => {
            await handleSubmit();
            onClose();
          }}
        >
          {ModalContent}
        </Modal>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
);
export default CategoryUpdate;
