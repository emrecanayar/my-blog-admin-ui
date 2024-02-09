import styles from "./list.module.css";
import Sidebar from "../../components/sideBar/SideBar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/DataTable"
import movies from '../../fakeDatas/MOVIE_DATA.json'
import { useMemo } from "react";


const List = () => {
  const data = useMemo(() => movies, [])

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'ID',
    },
    {
      header: 'Name',
      columns: [
        {
          header: 'First',
          accessorKey: 'first_name',
          footer: 'First name',
        },
        {
          header: 'Last',
          accessorKey: 'last_name',
          footer: 'Last name',
        },
      ],
    },
    {
      header: 'Email',
      accessorKey: 'email',
      footer: 'Email',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      footer: 'Gender',
    },
    {
      header: 'Date of birth',
      accessorKey: 'dob',
      footer: 'Date of birth',
      cell : "23.09.1993",
    },
  ]

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
            <Datatable data={data} columns={movieColumns}/>
          </div>
        </div>
      )
};
export default List;
