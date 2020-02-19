
<template>
    <div>
      <h4>{{ title }}</h4>
      <!-- <input v-model="newIngredients">
      <b-button variant="outline-primary" v-on:click="addTopping()">Add Ingredient</b-button>
      -->
      <b-input-group >
          <b-form-input v-model="newIngredients"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-success" v-on:click="addTopping()">Add Ingredient</b-button>
          </b-input-group-append>
       </b-input-group>

      <div>
        <table>
              <thead>
                  <tr>
                    <th>{{title}}</th>
                    <th>Option</th>
                   </tr>

              </thead>
              <tbody>

                <tr v-for="(ingredients, index) in ingredients" :key="index">
                      <td>{{ingredients.name}}</td>
                      <td>
                        <b-button variant="outline-primary" v-on:click="deleteTopping(ingredients.id)">delete</b-button>
                      </td>
                  </tr>
              </tbody>
        </table>
      </div>
    </div>
</template>


<script >


  export default{

    data () {
      return {
         title:'Ingredients',
         ingredients: [],
         newIngredients: null
      }
    },

    prop:{
        data:Array,
        columns:Array
    },
    mounted: function(){
      if(localStorage.getItem('ingredients')){
        try{
          this.ingredients = JSON.parse(localStorage.getItem('ingredients'));
        }catch(e){
          localStorage.removeItem('ingredients');
        }
      }
    },
    methods:{
        getToppings: function(){

        },
        addTopping: function(){
            if(!this.newIngredients){
               return;
            }
            var idNewIngredient= Math.random();
            this.ingredients.push({id:idNewIngredient, name: this.newIngredients })
            this.newIngredients = null;
            this.saveIngredients();

            this.$emit("UpdateCollection");

        },
        deleteTopping: function(id){
          var find= false;
          var name ='';
          if(localStorage.getItem('PizzaIngredients')){
            try{
              var pizzaIngredients = JSON.parse(localStorage.getItem('PizzaIngredients'));
              for( var i = 0; i <  pizzaIngredients.length; i++){
                  if ( pizzaIngredients[i].name == id) {
                    find =true;
                  }
              }
            }catch(e){
              localStorage.removeItem('PizzaIngredients');
            }
          }
          if(find){
            alert('This ingredient should not be deleted because is used in the pizza ');
          }else{
            //this.ingredients.splice(id,1);
            for( var i = 0; i <  this.ingredients.length; i++){
              if ( this.ingredients[i].id == id) {
                this.ingredients.splice(i, 1);
              }
            }
            this.saveIngredients();
            this.$emit("UpdateCollection");
          }

        },
        saveIngredients: function(){
          var  objParsed = JSON.stringify(this.ingredients);
          localStorage.setItem('ingredients', objParsed);
        }
    },

}
</script>
