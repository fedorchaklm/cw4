import './RecipeDetails.css';
import Link from "next/link";
import {FC} from "react";
import {IRecipe} from "@/models/IRecipe";
import {recipeService} from "@/services/recipe.api.service";

type RecipeDetailsType = {
    recipeId: string;
};

export const RecipeDetails: FC<RecipeDetailsType> = async ({recipeId}) => {
    const recipe: IRecipe = await recipeService.getRecipeById(recipeId);
    console.log('>', recipe);

    return (
        <div className='recipe-wrap'>
            <h1 className='text-3xl self-center'>{recipe.name}</h1>
            <img className='self-center min-w-20' src={recipe.image} alt={recipe.name}/>
            <p><b>CookTimeMinutes: </b>{recipe.cookTimeMinutes} min</p>
            <p><b>PrepTimeMinutes: </b>{recipe.prepTimeMinutes} min</p>
            <p><b>Calories: </b>{recipe.caloriesPerServing}</p>
            <p><b>Difficulty: </b>{recipe.difficulty}</p>
            <p><b>Rating: </b> {recipe.rating}</p>
            <p><b>Ingredients: </b> {recipe.ingredients}</p>
            <><b>instructions: </b> {recipe.instructions}</>
            <Link href={`/users/${recipe.userId}`} className='details'>About recipe's author</Link>
        </div>
    );
}