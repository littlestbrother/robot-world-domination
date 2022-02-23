

// const getCountries = () => {
// fetch("https://restcountries.com/v3.1/all?fields=cca2,population").then((res) => console.log(res.json())
// );
// .then((res) => res.json())
// .then(
//   (result) => {
//     data.push(
//       result.map((elements) => {
//         return { country: elements.cca2, value: elements.population };
//       })
//     );
//   },
//   (error) => {
//     console.log(error.message);
//   }
// );
// };

const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=cca2,population");
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json()
  } catch (error) {
    return error.message;
  }
};


export { getCountries };
