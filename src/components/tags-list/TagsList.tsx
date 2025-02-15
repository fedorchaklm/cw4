import './TagList.css';
import Tag from "@/components/tag/Tag";
import {recipeService} from "@/services/recipe.api.service";

const TagsList = async () => {
    const tags = await recipeService.getTagsOfRecipes();

    return (
        <div className='tag'>
            {tags.map((tag: string) => <Tag key={tag} tag={tag}/>)}
        </div>
    );
};

export default TagsList;

