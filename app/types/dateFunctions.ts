// All functions for recieving the current data and changing formats for different time lengths
const today = new Date();

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(today.getDate() - 90);

const oneEightyDaysAgo = new Date();
oneEightyDaysAgo.setDate(today.getDate() - 180);

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};