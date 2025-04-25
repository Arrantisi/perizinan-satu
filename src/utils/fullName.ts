const getInitialName = (fullName: string) => {
  const name = fullName.trim().split("");

  const initial =
    name.length === 1
      ? name[0].substring(0, 2).toUpperCase()
      : (name[0][0] + name[1][0]).toUpperCase();
  if (name.length === 1) {
    return;
  }

  return initial;
};

export default getInitialName;
