// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

// models/index.js
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('Role', {
  name: DataTypes.STRING
});

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  profile_picture: DataTypes.STRING,
  status: DataTypes.STRING
});

const Employee = sequelize.define('Employee', {
  emp_code: DataTypes.STRING,
  job_title: DataTypes.STRING,
  joining_date: DataTypes.DATE,
  salary: DataTypes.FLOAT,
  phone: DataTypes.STRING,
  gender: DataTypes.STRING,
  dob: DataTypes.DATE,
  emg_contact: DataTypes.STRING
});

const Address = sequelize.define('Address', {
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  pincode: DataTypes.STRING,
  country: DataTypes.STRING,
  nationality: DataTypes.STRING
});

const Department = sequelize.define('Department', {
  dept_code: DataTypes.STRING,
  name: DataTypes.STRING,
  sub_name: DataTypes.STRING,
  description: DataTypes.STRING
});

const Attendance = sequelize.define('Attendance', {
  check_in: DataTypes.DATE,
  check_out: DataTypes.DATE,
  date: DataTypes.DATEONLY,
  status: DataTypes.STRING,
  device_info: DataTypes.STRING
});

const Leave = sequelize.define('Leave', {
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  type: DataTypes.STRING,
  reason: DataTypes.STRING,
  status: DataTypes.STRING
});

const Project = sequelize.define('Project', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  status: DataTypes.STRING
});

const Task = sequelize.define('Task', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  due_date: DataTypes.DATEONLY,
  priority: DataTypes.STRING,
  status: DataTypes.STRING
});

const Notification = sequelize.define('Notification', {
  message: DataTypes.STRING,
  is_read: DataTypes.BOOLEAN
});

const Payroll = sequelize.define('Payroll', {
  basic_salary: DataTypes.FLOAT,
  bonuses: DataTypes.FLOAT,
  deductions: DataTypes.FLOAT,
  net_salary: DataTypes.FLOAT,
  pay_date: DataTypes.DATEONLY,
  status: DataTypes.STRING
});

const SalaryStructure = sequelize.define('SalaryStructure', {
  basic: DataTypes.FLOAT,
  hra: DataTypes.FLOAT,
  allowances: DataTypes.FLOAT,
  tax: DataTypes.FLOAT,
  insurance: DataTypes.FLOAT,
  effective_date: DataTypes.DATEONLY
});

const Holiday = sequelize.define('Holiday', {
  name: DataTypes.STRING,
  date: DataTypes.DATEONLY,
  type: DataTypes.STRING,
  description: DataTypes.STRING
});

const PerformanceReview = sequelize.define('PerformanceReview', {
  review_date: DataTypes.DATEONLY,
  ratings: DataTypes.INTEGER,
  comments: DataTypes.TEXT
});

const EmployeeDocument = sequelize.define('EmployeeDocument', {
  document_name: DataTypes.STRING,
  document_type: DataTypes.STRING,
  file_path: DataTypes.STRING,
  upload_date: DataTypes.DATEONLY
});

const Announcement = sequelize.define('Announcement', {
  title: DataTypes.STRING,
  message: DataTypes.TEXT,
  created_at: DataTypes.DATEONLY
});

const LoginLog = sequelize.define('LoginLog', {
  login_time: DataTypes.DATE,
  logout_time: DataTypes.DATE,
  ip_address: DataTypes.STRING,
  device_info: DataTypes.STRING
});

const Resignation = sequelize.define('Resignation', {
  resignation_date: DataTypes.DATEONLY,
  last_working_day: DataTypes.DATEONLY,
  reason: DataTypes.TEXT,
  status: DataTypes.STRING
});

// Associations
User.belongsTo(Role, { foreignKey: 'role_id' });
Employee.belongsTo(User, { foreignKey: 'user_id' });
Employee.belongsTo(Department, { foreignKey: 'dept_id' });
Employee.hasOne(Address, { foreignKey: 'emp_id' });
Address.belongsTo(Employee, { foreignKey: 'emp_id' });

Attendance.belongsTo(Employee, { foreignKey: 'emp_id' });
Leave.belongsTo(Employee, { foreignKey: 'emp_id' });
Payroll.belongsTo(Employee, { foreignKey: 'emp_id' });
SalaryStructure.belongsTo(Employee, { foreignKey: 'emp_id' });
PerformanceReview.belongsTo(Employee, { foreignKey: 'emp_id' });
PerformanceReview.belongsTo(User, { foreignKey: 'reviewer_id' });
EmployeeDocument.belongsTo(Employee, { foreignKey: 'emp_id' });
LoginLog.belongsTo(User, { foreignKey: 'user_id' });
Resignation.belongsTo(Employee, { foreignKey: 'emp_id' });

Task.belongsTo(Project, { foreignKey: 'project_id' });
Task.belongsTo(User, { foreignKey: 'assigned_to' });

Notification.belongsTo(User, { foreignKey: 'user_id' });
Announcement.belongsTo(User, { foreignKey: 'created_by' });

module.exports = {
  sequelize,
  Role,
  User,
  Employee,
  Department,
  Address,
  Attendance,
  Leave,
  Project,
  Task,
  Notification,
  Payroll,
  SalaryStructure,
  Holiday,
  PerformanceReview,
  EmployeeDocument,
  Announcement,
  LoginLog,
  Resignation
};
