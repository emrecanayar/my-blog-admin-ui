import styles from "./categoryList.module.css";
import modalStyles from "../../../components/modal/modal.module.css";
import Sidebar from "../../../components/sideBar/SideBar";
import Navbar from "../../../components/navbar/Navbar";
import Datatable from "../../../components/datatable/DataTable";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import categoryStore from "../../../stores/category/categoryStore";
import { GetListCategoryListItemDto } from "../../../services/catagory/dtos/getListCategoryListItemDto";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { CreateCategoryCommand } from "../../../services/catagory/dtos/createCategoryCommand";
import { ToastContainer, toast } from "react-toastify";
import uploadedFileStore from "../../../stores/uploadedFile/uploadedFileStore";
import CategoryDetail from "../detail/CategoryDetail";
import Swal from "sweetalert2";
import CategoryUpdate from "../update/CategoryUpdate";
import { handleApiError } from "../../../helpers/errorHelpers";
import useFileUpload from "../../../hooks/useFileUpload";
import CategoryActionButtons from "../components/CategoryActionButtons";
import config from "../../../config";
import Layout from "../../../layout/Layout";

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
  const [isModalDetailOpen, setIsModalDetailOpen] = useState<boolean>(false);
  const [selectedCategoryDetailId, setSelectedCategoryDetailId] = useState<
    string | null
  >(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [selectedCategoryUpdateId, setSelectedCategoryUpdateId] = useState<
    string | null
  >(null);

  const { fileName, handleFileSelect } = useFileUpload();
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const categoryColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Görsel",
      accessorKey: "categoryUploadedFiles[0].newPath",
      cell: (row: any) => {
        const files = row.row.original.categoryUploadedFiles;
        const imageUrl =
          files && files.length > 0
            ? `${config.FILE_BASE_URL}${files[0].newPath}`
            : "";
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Kategori Görseli"
            style={{ width: "100px", height: "auto" }}
          />
        ) : (
          <span>Görsel Yok</span>
        );
      },
    },
    {
      header: "Adı",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Açıklama",
      accessorKey: "description",
      enableSorting: true,
    },
    {
      header: "Popüler mi?",
      accessorKey: "isPopular",
      cell: (row: any) => {
        const isPopular = row.row.original.isPopular;
        return isPopular === true ? <span>Evet</span> : <span>Hayır</span>;
      },
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (row: any) => renderActionButtons(row.row.original),
    },
  ];

  const renderActionButtons = (category: any) => {
    return (
      <CategoryActionButtons
        category={category}
        onDetail={handleDetailView}
        onEdit={handleEditView}
        onDelete={handleDelete}
      />
    );
  };

  const showSweetAlert = async (categoryId: string) => {
    const result = await Swal.fire({
      title: "Emin misin?",
      text: "Bunu geri döndüremezsiniz!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "İptal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, bunu sil!",
    });

    if (result.isConfirmed) {
      await categoryStore.deleteCategory(categoryId);
      await fetchCategoriesData();
      Swal.fire({
        title: "Silindi!",
        text: "Kaydınız silindi.",
        icon: "success",
      });
    }
  };

  const handleDetailView = (category: any) => {
    setSelectedCategoryDetailId(category.id);
    setIsModalDetailOpen(true);
  };

  const handleEditView = (category: any) => {
    setSelectedCategoryUpdateId(category.id);
    setIsModalUpdateOpen(true);
  };

  const handleDelete = async (category: any) => {
    showSweetAlert(category.id);
  };

  const fetchCategoriesData = async () => {
    setIsLoading(true);
    try {
      await categoryStore.getCategories();
      setCategoryItems(categoryStore.categories);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCategories = async () => {
    setIsLoading(true);
    await fetchCategoriesData();
    setIsLoading(false);
  };

  const handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setCreateCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      handleApiError(error);
    } finally {
      uploadedFileStore.clearUploadedFile();
      resetCategoryState();
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
            {fileName ? fileName : "Dosya seçilmedi."}
          </span>
        </div>
        <div
          className={`${modalStyles.formGroup} ${modalStyles.checkboxGroup}`}
        >
          <input
            type="checkbox"
            id="isPopular"
            name="isPopular"
            onChange={handleInputChange}
            value={createCategory.isPopular.toString()}
          />
          <label htmlFor="isPopular">Popüler mi?</label>
        </div>
      </div>
    </form>
  );

  return (
    <Layout>
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
      {isModalDetailOpen && selectedCategoryDetailId && (
        <CategoryDetail
          categoryId={selectedCategoryDetailId}
          onClose={() => setIsModalDetailOpen(false)}
        />
      )}
      {isModalUpdateOpen && selectedCategoryUpdateId && (
        <CategoryUpdate
          categoryId={selectedCategoryUpdateId}
          onClose={() => setIsModalUpdateOpen(false)}
          onUpdated={refreshCategories}
        />
      )}
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
    </Layout>
  );
});
export default CategoryList;
