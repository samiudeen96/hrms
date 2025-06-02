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

export const getInitials = (name) => {
  if (!name) return "";

  let initials = "";

  const words = name.split(" ");

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials = initials + words[i][0];
  }
  return initials.toUpperCase();
};

export const convertedName = (name) => {
  const words = name.trim().split(" ");

  const firstWord = words[0];
  const secondWord = words[1]; // optional

  const mergedFirstName = firstWord?.[0]?.toUpperCase() + firstWord?.slice(1) || "";
  const mergedSecondName = secondWord?.[0]?.toUpperCase() + secondWord?.slice(1) || "";

  // console.log("First Name:", mergedFirstName);
  // console.log("Second Name:", mergedSecondName || "(none)");

  return secondWord
    ? `${mergedFirstName} ${mergedSecondName}`
    : mergedFirstName;
};


export function pathName(name) {
  const location = window.location.pathname;
  return location === name;
}