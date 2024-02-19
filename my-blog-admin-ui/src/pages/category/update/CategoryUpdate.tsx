import styles from "./categoryUpdate.module.css";
import modalStyles from "../../../components/modal/modal.module.css";
import { useEffect, useState } from "react";
import { UpdateCategoryCommand } from "../../../services/catagory/dtos/updateCategoryCommand";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../components/modal/Modal";
import categoryStore from "../../../stores/category/categoryStore";
import { GetByIdCategoryResponse } from "../../../services/catagory/dtos/getByIdCategoryResponse";

export interface CategoryUpdateProps {
  categoryId: string;
  onClose: () => void;
}

const CategoryUpdate = ({ categoryId, onClose }: CategoryUpdateProps) => {
  const [category, setCategory] = useState<GetByIdCategoryResponse>(
    {} as GetByIdCategoryResponse
  );
  const [updateCategory, setUpdateCategory] = useState<UpdateCategoryCommand>(
    {} as UpdateCategoryCommand
  );

  useEffect(() => {
    getCategoryById(categoryId);
  }, []);

  const handleFileSelect = async (event: any) => {
    const [file] = event.target.files;
    await handleFileUpload(event);
    const fileNameLabel = document.getElementById("fileName");
    if (file) {
      if (fileNameLabel !== null) {
        fileNameLabel.textContent = file.name;
      }
    } else {
      if (fileNameLabel !== null) {
        fileNameLabel.textContent = "Dosya Seçilmedi";
      }
    }
  };

  const handleFileUpload = async (event: any) => {};

  const handleSubmit = async (event: any) => {};

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
  };

  const ModalContent = (
    <form onSubmit={handleSubmit}>
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
            value={category.name}
          />
        </div>
        <div className={modalStyles.formGroup}>
          <label htmlFor="description">Açıklama</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={category.description}
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
            Dosya seçilmedi.
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
};
export default CategoryUpdate;
