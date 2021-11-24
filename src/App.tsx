import React from 'react';
import SignUp from "./pages/auth/signup/SignUp";
import {Route} from "react-router-dom";
import SignIn from "./pages/auth/signin/SignIn";
import Home from "./pages/home/Home";
import Messages from "./pages/home/messages/messages";
import NewChats from "./pages/home/NewChat/NewChats";
import Chat from "./pages/home/Chat/Chat";
import {WithSuspenseHOC} from "./service/HOC/withSuspense";
import {useSelector} from "react-redux";
import {AppStateType} from "./redux/store";


//TODO:
    //1. сделать поиск юзеров debouncing, на серваке отдавать пользователей пагинацией

    //2. поправить на серваке last_seen
//MORE:
    //1. написать выборку картинок с превью как тут https://www.youtube.com/watch?v=5vx2PVClSVU
    //2. попробовать порешать алгоритмическе задачи на кодварсе и других платформах
    //3. при регистрации выводить имя картинки и имя файла
    //4. сделать рефакторинг SignUp.tsx
    //5 сделать loader когда загружаютя иконки пользователей
//PLANS:

//CONST:
//1. смотреть заметку в evernote chatapp
const CoomingSoon = React.lazy(() => import('./components/coomingSoon/CoomingSoon'));
const ComingSoonSuspended = WithSuspenseHOC(CoomingSoon)

function App() {
    const isAuth = useSelector((state: AppStateType) => state.AuthReducer.isAuth)
    return (
        <div>
                {true //isAuth
                    && <>
                        <Route path={['/chats', '/new_chat', '/profile', '/settings']} render={() => {
                            return <Home/>
                        }}/>
                        <Route exact path={'/chats'} component={Messages}/>
                        <Route path={'/new_chat'} component={NewChats}/>
                        <Route path={['/profile', '/settings']} render={() => {
                            return <ComingSoonSuspended/>
                        }}/>
                        <Route exact path='/chats/:id' component={Chat}/>
                    </>}
                        <Route path='/register' render={() => <SignUp/>}/>
                        <Route path='/login' component={SignIn}/>

        </div>
    );
}


export default App;
