<template>
  <div class="home-container">
    <div class="header">
      <h1 class="logo">Lunch Box App</h1>
    </div>
    <div class="content">
      <button @click="showRecipes" class="hvr-bounce-in">What's for lunch</button>
      <div v-if="viewRecipes" class="recipes">
        <div v-for="(recipe, index) in filteredRecipes" :key="index">
          {{ recipe.title }}
        </div>
      </div>
    </div>
    <div v-if="loading" class="cube-wrapper">
      <div class="cube-folding">
        <span class="leaf1"></span>
        <span class="leaf2"></span>
        <span class="leaf3"></span>
        <span class="leaf4"></span>
      </div>
      <span class="loading" data-name="Loading">Loading</span>
    </div>
  </div>
</template>

<script>
import DataService from '@/services/JsonService';
import * as moment from 'moment';

export default {
  name:  'home',
  data() {
    return {
      recipes: [],
      ingredients: [],
      bestIngredients: [],
      goodIngredients: [],
      filteredRecipes: [],
      loading: false,
      viewRecipes: false
    }
  },
  mounted() {
    this.ingredients = DataService.getIngredients();
    this.recipes = DataService.getRecipes();
    this.getbestIngredients();
    this.getFilteredRecipes();
  },
  methods: {
    showRecipes() {
      this.viewRecipes = true;
    },
    getbestIngredients() {
      let currentDate = moment().format();
      this.bestIngredients = this.ingredients.filter(item => {
        
        let good = !moment(currentDate).isAfter(item['use-by'])
        if(!good) return false; // ingredient expired
        
        let best = !moment(currentDate).isAfter(item['best-before'])
        if(!best) 
          this.goodIngredients.push(item.title); // ingredients not best

        return true;
      });
    },
    getFilteredRecipes() {

      let tmpArr = [];
      
      // filtering recipes with good ingredients
      tmpArr = this.recipes.filter(item => {
        return item.ingredients.every(i => this.bestIngredients.find(x => x.title == i))
        //return item.ingredients.every(i => true)
      })

      // sorting recipes if ingredients are past best-before
      tmpArr.forEach(item => {
        if(item.ingredients.some(i => this.goodIngredients.includes(i)))
          this.filteredRecipes.push(item); // pushing recipes with good ingredients at the end
        else
          this.filteredRecipes.unshift(item); // pushing recipes with best ingredients at the beginning
      });

    },
    sortByBestBefore() {

    }
  }
}
</script>

<style>
  h1 {
    font-size: 36px;
  }
  button {
    margin-top: 30px;
    color: white;
    font-size: 18px;
    padding: 15px;
    background-color: rgb(235, 86, 86);
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.25s;
  }
  .recipes {
    min-width: 300px;
    width: fit-content;
    width: -moz-fit-content;
    text-align: left;
    margin: 50px auto 0px;
    padding: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  .recipes > div {
    margin: 10px 0px;
  }
  .hvr-bounce-in {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  }
  .hvr-bounce-in:hover, .hvr-bounce-in:focus, .hvr-bounce-in:active {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
  }
  @import url(https://fonts.googleapis.com/css?family=Archivo+Narrow);
  .cube-folding {
    width: 50px;
    height: 50px;
    display: inline-block;
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    font-size: 0;
  }
  .cube-folding span {
    position: relative;
    width: 25px;
    height: 25px;
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    display: inline-block;
  }
  .cube-folding span::before {
    content: '';
    background-color: rgb(244, 246, 247);
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 25px;
    height: 25px;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    -moz-animation: folding 2.5s infinite linear both;
    -webkit-animation: folding 2.5s infinite linear both;
    animation: folding 2.5s infinite linear both;
  }
  .cube-folding .leaf2 {
    -moz-transform: rotateZ(90deg) scale(1.1);
    -ms-transform: rotateZ(90deg) scale(1.1);
    -webkit-transform: rotateZ(90deg) scale(1.1);
    transform: rotateZ(90deg) scale(1.1);
  }
  .cube-folding .leaf2::before {
    -moz-animation-delay: 0.3s;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    background-color: #f2f2f2;
  }
  .cube-folding .leaf3 {
    -moz-transform: rotateZ(270deg) scale(1.1);
    -ms-transform: rotateZ(270deg) scale(1.1);
    -webkit-transform: rotateZ(270deg) scale(1.1);
    transform: rotateZ(270deg) scale(1.1);
  }
  .cube-folding .leaf3::before {
    -moz-animation-delay: 0.9s;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
    background-color: #f2f2f2;
  }
  .cube-folding .leaf4 {
    -moz-transform: rotateZ(180deg) scale(1.1);
    -ms-transform: rotateZ(180deg) scale(1.1);
    -webkit-transform: rotateZ(180deg) scale(1.1);
    transform: rotateZ(180deg) scale(1.1);
  }
  .cube-folding .leaf4::before {
    -moz-animation-delay: 0.6s;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
    background-color: #e6e6e6;
  }

  @-moz-keyframes folding {
    0%, 10% {
      -moz-transform: perspective(140px) rotateX(-180deg);
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    }
    25%, 75% {
      -moz-transform: perspective(140px) rotateX(0deg);
      transform: perspective(140px) rotateX(0deg);
      opacity: 1;
    }
    90%, 100% {
      -moz-transform: perspective(140px) rotateY(180deg);
      transform: perspective(140px) rotateY(180deg);
      opacity: 0;
    }
  }
  @-webkit-keyframes folding {
    0%, 10% {
      -webkit-transform: perspective(140px) rotateX(-180deg);
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    }
    25%, 75% {
      -webkit-transform: perspective(140px) rotateX(0deg);
      transform: perspective(140px) rotateX(0deg);
      opacity: 1;
    }
    90%, 100% {
      -webkit-transform: perspective(140px) rotateY(180deg);
      transform: perspective(140px) rotateY(180deg);
      opacity: 0;
    }
  }
  @keyframes folding {
    0%, 10% {
      -moz-transform: perspective(140px) rotateX(-180deg);
      -ms-transform: perspective(140px) rotateX(-180deg);
      -webkit-transform: perspective(140px) rotateX(-180deg);
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    }
    25%, 75% {
      -moz-transform: perspective(140px) rotateX(0deg);
      -ms-transform: perspective(140px) rotateX(0deg);
      -webkit-transform: perspective(140px) rotateX(0deg);
      transform: perspective(140px) rotateX(0deg);
      opacity: 1;
    }
    90%, 100% {
      -moz-transform: perspective(140px) rotateY(180deg);
      -ms-transform: perspective(140px) rotateY(180deg);
      -webkit-transform: perspective(140px) rotateY(180deg);
      transform: perspective(140px) rotateY(180deg);
      opacity: 0;
    }
  }
  .cube-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    background: #00c6ff;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #00c6ff, #0072ff);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #00c6ff, #0072ff);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    font-family: arial;
  }
  .cube-wrapper:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -20px;
    margin: auto;
    width: 90px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-filter: blur(2px);
    filter: blur(2px);
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    border-radius: 100%;
    z-index: 1;
    -moz-animation: shadow 0.5s ease infinite alternate;
    -webkit-animation: shadow 0.5s ease infinite alternate;
    animation: shadow 0.5s ease infinite alternate;
  }
  .cube-wrapper .loading {
    font-size: 12px;
    letter-spacing: 0.1em;
    display: block;
    color: white;
    position: relative;
    top: 25px;
    z-index: 2;
    -moz-animation: text 0.5s ease infinite alternate;
    -webkit-animation: text 0.5s ease infinite alternate;
    animation: text 0.5s ease infinite alternate;
  }

  @-moz-keyframes text {
    100% {
      top: 35px;
    }
  }
  @-webkit-keyframes text {
    100% {
      top: 35px;
    }
  }
  @keyframes text {
    100% {
      top: 35px;
    }
  }
  @-moz-keyframes shadow {
    100% {
      bottom: -18px;
      width: 100px;
    }
  }
  @-webkit-keyframes shadow {
    100% {
      bottom: -18px;
      width: 100px;
    }
  }
  @keyframes shadow {
    100% {
      bottom: -18px;
      width: 100px;
    }
  }
  .made-with-love {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 10px;
    text-align: center;
    font-size: 10px;
    z-index: 9999;
    font-family: arial;
    color: #fff;
  }
  .made-with-love i {
    font-style: normal;
    color: #F50057;
    font-size: 14px;
    position: relative;
    top: 2px;
  }
  .made-with-love a {
    color: #fff;
    text-decoration: none;
  }
  .made-with-love a:hover {
    text-decoration: underline;
  }

</style>
