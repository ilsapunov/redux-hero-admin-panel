// import {useHttp} from '../../hooks/http.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

// import { heroDeleted, fetchHeroes } from './heroesSlice';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all') {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
    //     }
    // });

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo (() => {
        const filteredHeroes = heroes.slice();
        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
        // eslint-disable-next-line
    }, [heroes, activeFilter]);

    // const filteredHeroes = useSelector(filteredHeroesSelector);

    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    // useEffect(() => {
    //     dispatch(fetchHeroes());

    //     // eslint-disable-next-line
    // }, []);

    const onDelete = useCallback((id) => {
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then(data => console.log(data, 'Deleted'))
        //     .then(dispatch(heroDeleted(id)))
        //     .catch(err => console.log(err));

        deleteHero(id);

            // eslint-disable-next-line 
    }, [])

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;