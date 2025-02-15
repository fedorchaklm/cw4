import {IRecipe} from "@/models/IRecipe";

export interface IRecipesResponseModel {
    recipes: Array<IRecipe>;
    total: number;
    skip: number;
    limit: number;
}