import {IRecipe} from "@/models/IRecipe";
import {FC} from "react";
import Recipe from "@/components/recipe/Recipe";
import './RecipesList.css';

type RecipesListType = {
    recipes: Array<IRecipe>;
};

const RecipesList: FC<RecipesListType> = async ({recipes}) => {

    return (
        <div className='recipe-list'>
            <h1 className='recipe-title'>Recipes:</h1>
            {recipes.map((recipe: IRecipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
        </div>
    );
};

export default RecipesList;
