export const routes = {
  admin: "/admin/signup",
  employee: "/employee/signup",
};


export function getRedirectPathByRole(role) {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'employee':
      return '/employee/dashboard';
    // case 'manager':
    //   return '/manager/dashboard';
    default:
      return '/login';
  }
}
