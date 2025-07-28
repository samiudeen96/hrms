import React from 'react'
import { useDailyAttendance } from '../../../hooks/attendanceHook'
import Table from '../../../components/Table'

const DailyAttendance = () => {
  const { data: dailyAttendance, isLoading } = useDailyAttendance();

  if (isLoading) return <div>Loading...</div>;
  if (!dailyAttendance) return <div>No attendance data available</div>;

  console.log("today:", dailyAttendance);


  const formatTime = (timestamp) => {
    if (!timestamp) return '—'
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatSecondsToTime = (totalSeconds) => {
    if (totalSeconds == null) return '—'
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':')
  }

  const columns = [
    {
      accessorKey: 'user.employee.emp_code',
      header: 'Employee Id',
    },
    {
      accessorKey: 'user.fullName',
      header: 'Name',
    },
    {
      accessorKey: 'check_in',
      header: 'Check In',
      cell: ({ row }) => formatTime(row.original.check_in),
    },
    {
      accessorKey: 'break_in',
      header: 'Break In',
      cell: ({ row }) => formatTime(row.original.break_in),
    },
    {
      accessorKey: 'break_out',
      header: 'Break Out',
      cell: ({ row }) => formatTime(row.original.break_out),
    },
    {
      accessorKey: 'check_out',
      header: 'Check Out',
      cell: ({ row }) => formatTime(row.original.check_out),
    },
    {
      accessorKey: 'total_working_seconds',
      header: 'Working Hours',
      cell: ({ row }) => formatSecondsToTime(row.original.total_working_seconds),
    },
    {
      accessorKey: '',
      header: 'Timing',
    },
    {
      accessorKey: 'status',
      header: 'Attendance',
      cell: ({ row }) => row.original.status?.toUpperCase(),
    },
  ]

  const handleView = () => {

  }

  const handleEdit = () => {

  }

  const handleDelete = () => {

  }

  return (
    <div className="">
      <Table
        data={dailyAttendance}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default DailyAttendance
