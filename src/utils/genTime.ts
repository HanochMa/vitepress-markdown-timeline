import dayjs from "dayjs";
export const getdefaultTime = () => {
  return dayjs().format("YYYY-MM-DD");
};
