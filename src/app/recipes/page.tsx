import {Metadata} from "next";
import {FC} from "react";
import {recipeService} from "@/services/recipe.api.service";
import Search from "@/components/search/Search";
import {IRecipe} from "@/models/IRecipe";
import Pagination from "@/components/pagination/Pagination";
import {getMaxPages} from "@/helpers/helpers";
import {limitOfRecipesPage} from "@/constants/constants";
import NotFound from "@/components/not-found/NotFound";
import Recipe from "@/components/recipe/Recipe";
import Menu from "@/components/menu/Menu";
import TagsList from "@/components/tags-list/TagsList";

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Recipes page',
    description: 'Recipes page description'
};

type RecipesPageType = {
    searchParams: Promise<{ [key: string]: string | undefined }>
};

const RecipesPage: FC<RecipesPageType> = async ({searchParams}) => {
    const sp = await searchParams;
    const page = sp?.page || 1;
    const q = sp?.q || '';
    const tag = sp?.tag || '';

    let recipes;
    if (tag !== '') {
        recipes = await recipeService.getRecipesByTag(tag, Number(page));
    } else {
        recipes = await recipeService.getRecipesByPage(Number(page), q);
    }

    return (
        <>
            <Menu/>
            <div className='flex flex-col items-center gap-2 py-2 w-full text-xl'>
                <Search/>
                {recipes?.recipes.length > 0 ?
                    <>
                        <div className='flex flex-col items-center gap-2 my-2 w-1/3 text-black'>
                            <h1 className='text-3xl text-white'>Recipes:</h1>
                            {recipes.recipes.map((recipe: IRecipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
                            <Pagination maxPages={getMaxPages(recipes.total, limitOfRecipesPage)}/>
                        </div>
                        <TagsList/>
                    </>
                    : <NotFound/>}
            </div>
        </>
    );
};

export default RecipesPage;