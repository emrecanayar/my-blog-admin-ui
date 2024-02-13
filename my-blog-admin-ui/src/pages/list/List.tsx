import styles from "./list.module.css";
import Sidebar from "../../components/sideBar/SideBar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/DataTable"
import movies from '../../fakeDatas/MOVIE_DATA.json'
import { useMemo } from "react";


const List = () => {
  const data = useMemo(() => movies, [])

  const movieColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Genre',
      accessorKey: 'genre',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
    },
  ]

    return (
        <div className={styles.list}>
          <Sidebar/>
          <div className={styles.listContainer}>
            <Navbar/>
            <Datatable data={data} columns={movieColumns} tableTitle="Film Listesi"/>
          </div>
        </div>
      )
};
export default List;
