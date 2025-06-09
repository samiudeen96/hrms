export function getRedirectPathByRole(role) {
  switch (role) {
    case 'admin':
      return '/admin/dashboard'; 
    case 'employee':
      return '/employee/dashboard';
    case 'hr_manager':
      return '/hr/dashboard';
    default:
      return '/login';
  }
}