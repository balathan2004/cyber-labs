import moment from "moment";
export const defaultImage = (name) => {
  var url = `https://ui-avatars.com/api/?name=${name}&size=50&background=random&color=fff&bold=true`;
  return url;
};

export const TimeSetter = (date) => {
  const formattedDate = moment(date, "DD-MM-YYYY hh:mm-A").fromNow();
  //console.log(formattedDate);
  return formattedDate;
};
