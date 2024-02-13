import styles from "./categoryList.module.css";
import Sidebar from "../../components/sideBar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/DataTable";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import categoryStore from "../../stores/category/categoryStore";
import { GetListCategoryListItemDto } from "../../services/catagory/dtos/getListCategoryListItemDto";

const CategoryList = observer(() => {
    const [categoryItems, setCategoryItems] = useState<GetListCategoryListItemDto[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        await categoryStore.getCategories();
        setCategoryItems(categoryStore.categories);
      } catch (error) {
        console.log("Abouts data not loaded", error);
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

  return (
    <div className={styles.list}>
      <Sidebar />
      <div className={styles.listContainer}>
        <Navbar />
        <Datatable data={categoryItems} columns={categoryColumns} tableTitle="Kategori Listesi" />
      </div>
    </div>
  );
});
export default CategoryList;
