export default async function GetData(route) {
  try {
    var response = await fetch(`/api/${route}`, {
      method: "GET",
      contentType: "application/json",
    });
    var res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
