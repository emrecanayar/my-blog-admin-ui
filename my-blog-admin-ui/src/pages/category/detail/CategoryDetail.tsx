import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalStyles from "../../../components/modal/modal.module.css";
import { GetByIdCategoryResponse } from "../../../services/catagory/dtos/getByIdCategoryResponse";
import categoryStore from "../../../stores/category/categoryStore";

interface CategoryDetailProps {
  categoryId: string;
  onClose: () => void;
}

const CategoryDetail = ({ categoryId, onClose }: CategoryDetailProps) => {
  const [category, setCategory] = useState<GetByIdCategoryResponse>(
    {} as GetByIdCategoryResponse
  );

  useEffect(() => {
    getCategoryById(categoryId);
  }, []);

  const getCategoryById = async (categoryId: string) => {
    var result = await categoryStore.getCategory(categoryId);
    console.log(result);
    setCategory(result.data);
  };

  const ModalContent = () => {
    return (
      <div>
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
            <label htmlFor="name">Adı</label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              disabled
            />
          </div>
          <div className={modalStyles.formGroup}>
            <label htmlFor="description">Açıklama</label>
            <input
              type="text"
              id="description"
              name="description"
              value={category.description}
              disabled
            />
          </div>
        </div>
        <div className={modalStyles.formRow}>
          <div
            className={`${modalStyles.formGroup} ${modalStyles.checkboxGroup}`}
          >
            <input type="checkbox" id="isPopular" name="isPopuler" checked={category.isPopular} disabled />
            <label htmlFor="isPopular">Popüler mi?</label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={"Kategori Detayı"}>
      {ModalContent()}
    </Modal>
  );
};
export default CategoryDetail;
