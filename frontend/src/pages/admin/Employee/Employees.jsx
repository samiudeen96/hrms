import React from 'react'
import { useListEmp } from '../../../hooks/employeeHook'
import Table from '../../../components/Table';
import { useDeptList, usePositionList } from '../../../hooks/deptHook';

const Employees = () => {

  const { data: employeeList } = useListEmp()
  const { data: deptList } = useDeptList();
  const { data: positionList } = usePositionList();
  console.log(employeeList);

  const safeEmployeeList = (employeeList || []).map((item) => ({
    ...item,
    employee: {
      ...item.employee,
      department: item.employee?.department || { name: '' },
      position: item.employee?.position || { name: '' },
    },
  }));


  const handleView = () => { }

  const handleEdit = () => { }

  const handleDelete = () => { }

  const userColumns = [
    {
      accessorKey: 'sl_no',
      header: 'Sl No'
    },
    {
      accessorKey: 'employee.emp_code',
      header: 'Employee Id',
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
      accessorKey: 'employee.department.name',
      header: 'Department',
    },
    {
      accessorKey: 'employee.position.name',
      header: 'Designation',
    },
  ];

  return (
    <div>
      <Table
        data={safeEmployeeList}
        columns={userColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  )
}

export default Employees