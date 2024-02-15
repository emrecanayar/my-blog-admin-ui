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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCreateCategory({
      ...createCategory,
      [name]: value,
    });
  };

  const handleFileSelect = (event: any) => {
    const [file] = event.target.files;
    handleFileSelectSend([file]);
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
    event.preventDefault();
    try {
      await categoryStore.createCategory(createCategory);
    } catch (error: any) {
      console.error("Category adding failed", error);

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

  const handleFileSelectSend = async (file: any) => {
    try {
      await uploadedFileStore.uploadFile(file);
    } catch (error: any) {
      console.error("Category adding failed", error);

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
