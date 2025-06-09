import { useUserList } from '../../../hooks/userHook'
import Table from '../../../components/Table';

const Users = () => {

  const { data: users } = useUserList();
  console.log(users);

  const userColumns = [
    {
      accessorKey: 'sl_no',
      header: 'Sl No:',
    },
    {

      accessorKey: 'fullName',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },

    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'role.name',
      header: 'Role',
    },
  ];

  return (
    <div>
      <Table columns={userColumns} data={users || []} />
    </div>
  )
}

export default Users