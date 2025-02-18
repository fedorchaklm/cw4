import {Metadata} from "next";
import {FC} from "react";
import RecipeDetails from "@/components/recipe-details/RecipeDetails";
import Menu from "@/components/menu/Menu";

type RecipePageType = {
    params: Promise<{ recipeId: string }>;
};

export const generateMetadata = async ({params}: RecipePageType): Promise<Metadata> => {
    const {recipeId} = await params;

    return {
        title: `Recipe page ${recipeId} `,
        description: 'Recipe page description'
    }
};

const RecipePage: FC<RecipePageType> = async ({params}) => {
    const {recipeId} = await params;

    return (
        <>
            <Menu/>
            <RecipeDetails recipeId={recipeId}/>
        </>
    );
};

export default RecipePage;