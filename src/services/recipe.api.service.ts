import {axiosInstance} from "@/services/api.service";
import {IRecipe} from "@/models/IRecipe";
import {IRecipesResponseModel} from "@/models/IRecipesResponseModel";
import {limitOfRecipesPage} from "@/constants/constants";

export const recipeService = {
    getUserRecipes: async (userId: string): Promise<Array<IRecipe>> => {
        const {data} = await axiosInstance.get<IRecipesResponseModel>('auth/recipes/search?limit=50');
        return data.recipes.filter((recipe: IRecipe) => recipe.userId === Number(userId));
    },
    getRecipesByPage: async (page: number, searchParam: string): Promise<IRecipesResponseModel> => {
        const limit = limitOfRecipesPage;
        const skip = limit * page - limit;
        const {data} = await axiosInstance.get<IRecipesResponseModel>(`auth/recipes/search?skip=${skip}&limit=${limit}&q=${searchParam}`);
        return data;
    },
    getRecipesByTag: async (tag: string, page: number): Promise<IRecipesResponseModel> => {
        const limit = limitOfRecipesPage;
        const skip = limit * page - limit;
        const {data} = await axiosInstance.get<IRecipesResponseModel>(`auth/recipes/tag/${tag}?skip=${skip}&limit=${limit}`);
        return data;
    },
    getRecipeById: async (id: string): Promise<IRecipe> => {
        const {data: user} = await axiosInstance.get<IRecipe>(`auth/recipes/${id}`);
        return user;
    },
    getTagsOfRecipes: async (): Promise<Array<string>> => {
        const {data: tags} = await axiosInstance.get<Array<string>>(`auth/recipes/tags`);
        return tags;
    }
};
