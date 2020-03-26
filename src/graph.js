export const graph = () => {

     d3.json('https://corona.lmao.ninja/countries')
     .then(res => {
         console.log(res)
     })
     .catch(error => console.error(error)) 
     console.log('hello')
};
 