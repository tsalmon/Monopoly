import Vue from 'vue';

export const devise = (value: number, devise: string) => {
  if(!devise){
    return `${value} €`;
  }
  
  return `${value} ${devise}`;
}

Vue.filter('devise', devise);

export default devise;