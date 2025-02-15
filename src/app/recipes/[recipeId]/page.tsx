import {Metadata} from "next";
import {FC} from "react";
import {RecipeDetails} from "@/components/recipe-details/RecipeDetails";

export const metadata: Metadata = {
    title: 'Recipe page',
    description: 'Recipe page description'
};

type RecipePageType = {
    params: Promise<{ recipeId: string }>
};

const RecipePage: FC<RecipePageType> = async ({params}) => {
    const {recipeId} = await params;
    console.log('>', recipeId);

    return (
        <RecipeDetails recipeId={recipeId}/>
    );
};

export default RecipePage;