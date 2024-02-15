import styles from "./categoryList.module.css";
import modalStyles from "../../components/modal/modal.module.css";
import Sidebar from "../../components/sideBar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/DataTable";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import categoryStore from "../../stores/category/categoryStore";
import { GetListCategoryListItemDto } from "../../services/catagory/dtos/getListCategoryListItemDto";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { CreateCategoryCommand } from "../../services/catagory/dtos/createCategoryCommand";
import { ToastContainer, toast } from "react-toastify";
import uploadedFileStore from "../../stores/uploadedFile/uploadedFileStore";

const CategoryList = observer(() => {
  const [categoryItems, setCategoryItems] = useState<
    GetListCategoryListItemDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createCategory, setCreateCategory] = useState<CreateCategoryCommand>({
    name: "",
    description: "",
    isPopular: true,
    tokens: [],
  });

  useEffect(() => {
    setIsLoading(true);
    fetchCategoriesData();
  }, []);

  const categoryColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Adı",
      accessorKey: "name",
    },
    {
      header: "Açıklama",
      accessorKey: "description",
    },
    {
      header: "Popüler mi?",
      accessorKey: "isPopular",
    },
  ];

  const fetchCategoriesData = async () => {
    try {
      await categoryStore.getCategories();
      setCategoryItems(categoryStore.categories);
    } catch (error) {
      console.log("Category data not loaded", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCreateCategory({
      ...createCategory,
      [name]: value,
    });
  };

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

  const handleSubmit = async (event: any) => {
    event?.preventDefault();
    try {
      if (uploadedFileStore.uploadedFile === null) return null;

      createCategory.tokens.push(uploadedFileStore.uploadedFile.token);
      await categoryStore.createCategory(createCategory);
      toast.success("Kategori başarıyla eklendi");
      resetCategoryState();
      await fetchCategoriesData();
    } catch (error: any) {
      if (error.validationErrors) {
        error.validationErrors.forEach((valError: any) => {
          valError.Errors.forEach((errMsg: any) => {
            toast.warning(errMsg);
          });
        });
      } else if (error.generalMessage && error.validationErrors === null) {
        toast.error(error.generalMessage);
      }
    }
  };

  const handleFileUpload = async (event: any) => {
    event?.preventDefault();
    try {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      await uploadedFileStore.uploadFile(formData);
    } catch (error: any) {
      if (error.validationErrors) {
        error.validationErrors.forEach((valError: any) => {
          valError.Errors.forEach((errMsg: any) => {
            toast.warning(errMsg);
          });
        });
      } else if (error.generalMessage && error.validationErrors === null) {
        toast.error(error.generalMessage);
      }
    }
  };

  const resetCategoryState = () => {
    setCreateCategory({
      name: "",
      description: "",
      isPopular: true,
      tokens: [],
    });
  };

  const ModalContent = (
    <form onSubmit={handleSubmit}>
      <div className={modalStyles.formRow}>
        <div className={modalStyles.formGroup}>
          <label htmlFor="name">Ad</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={createCategory.name}
          />
        </div>
        <div className={modalStyles.formGroup}>
          <label htmlFor="description">Açıklama</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={createCategory.description}
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
            value={createCategory.isPopular.toString()}
          />
          <label htmlFor="isPopular">Popüler mi?</label>
        </div>
      </div>
    </form>
  );

  return (
    <div className={styles.list}>
      <Sidebar />
      <div className={styles.listContainer}>
        <Navbar />
        {isLoading ? (
          <div className={styles.datatableContainer}>
            <LoadingSpinner />
          </div>
        ) : (
          <Datatable
            data={categoryItems}
            columns={categoryColumns}
            tableTitle="Kategori Listesi"
            modalContent={ModalContent}
            modalTitle="Kategori Ekle"
            handleSubmit={handleSubmit}
          />
        )}
      </div>
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
});
export default CategoryList;
