import {FC} from "react";
import {userService} from "@/services/user.api.service";
// import {Loading} from "@/components/loading/Loading";
import IUser from "@/models/IUser";
import {User} from "@/components/user/User";
// import {Pagination} from "@/components/pagination/Pagination";
// import {getMaxPages} from "@/helpers/helpers";
// import {limitOfUsersByPage} from "@/constants/constants";
import {Search} from "@/components/search/Search";
import  './UserList.css';

export const UsersList: FC = async () => {
const users = await userService.getUsersByPage(1, '');
// console.log('>', users.users.length);
    // const onSubmit = (searchData: SearchDataType) => {
    //     console.log('>', searchData);
    //     setQuery({q: searchData.search, page: '1'});
    // };

    // useEffect(() => {
    //     const page = query.get('page') || '1';
    //     const q = query.get('q') || '';
    //     dispatch(userSliceActions.loadUsers({page: Number(page), searchParam: q}));
    // }, [query]);

    return (
        // users === null ? <Loading/> :
            <div className='list-wrap'>
                <Search/>
                {/*{users ?*/}
                    <div className='flex flex-col items-center gap-2 my-2 w-1/3 text-black'>
                        <h1 className='text-3xl text-white'>Users:</h1>
                        {users && users.users.map((user: IUser) => <User key={user.id} user={user}/>)}
                        {/*<Pagination maxPages={getMaxPages(users.total, limitOfUsersByPage)}/>*/}
                    </div>
                    {/*// : <NotFound/>}*/}
            </div>
    );
}