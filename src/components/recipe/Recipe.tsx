import {FC} from "react";
import './Recipe.css';
import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";

type RecipeType = {
    recipe: IRecipe;
};

export const Recipe: FC<RecipeType> = ({recipe}) => {

    return (
        <Link href={`/recipes/${recipe.id}`} className='recipe'>
            <p>{recipe.name}</p>
        </Link>
    );
}