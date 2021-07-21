export const dateFilterAll = (value, summary = false) => {
  if (!value) return '-';
  
  const newValue = value.split("T");

  return summary ? newValue[0] : `${newValue[0]} ${newValue[1].slice(0, 8)}`;
}

export const dateFilterShort = (value) => {
  if (!value) return '-'
  return value.substr(0, 10)
}