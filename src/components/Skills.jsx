import React from 'react';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Circle } from 'react-circle';

import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer';
import { requestStates } from '../constants';

export const Skills = () => {
    // const [languageList, setLanguageList] = useState([]);
    const [state, dispatch] = useReducer(skillReducer, initialState);

    useEffect(() => {
        dispatch({type:actionTypes.fetch});
        axios.get('https://api.github.com/users/MASANORI-M/repos')
            .then((response) => {
                const languageList = response.data.map(res => res.language);
                const countedLanguageList = generateLanguageCountObj(languageList);
                dispatch({type: actionTypes.success, payload: {languageList: countedLanguageList}});
            })
            .catch(() => {
                dispatch({type: actionTypes.error});
            });
        }, []);
    
        const generateLanguageCountObj = (allLanguageList) => {
            const notNullLnaguageList = allLanguageList.filter(language => language != null);
            const uniqueLanguageList = [...new Set(notNullLnaguageList)];

            return uniqueLanguageList.map(item => {
                return {
                    language:item,
                    count:allLanguageList.filter(language => language === item).length
                }
            });
        };

        const converseCountToPercentage = (count) => {
            if(count > 10) {return 100;}
            return count * 10;
        };

        const sortedLanguageList = () => (
            state.languageList.sort((firstLang, nextLang) =>  nextLang.count - firstLang.count)
        )
        
    return(
        <div id="skills">
            <div className="container">
                <div className="heading">
                    <h2>Skills</h2>
                </div>
                <div className="skills-container">
                    {
                        state.requestState === requestStates.loading && (
                            <p className="description">?????????...</p>
                        )
                    }
                    {
                        state.requestState === requestStates.success && (
                            sortedLanguageList().map((item, index) => (
                                <div className="skill-item" key={item.language}>
                                    <p className="description"><strong>{item.language}</strong></p>
                                    <Circle
                                        animate
                                        progress={converseCountToPercentage(item.count)}
                                    />
                                </div>
                            ))
                        )
                    }
                    {
                        state.requestState === requestStates.error && (
                            <p className="description">??????????????????????????????</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};