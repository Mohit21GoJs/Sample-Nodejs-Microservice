// import { map as _map, get as _get } from 'lodash';
// import { MenuLoginData, SubMenuLoginData, FunctionLoginData, LoginResData, UserLoginData } from '../entities/inbound';

// const mapUserLoginData = ({ userDatas, authData }) => new UserLoginData({
//     id: _get(userDatas, '_id'),
//     email: _get(userDatas, 'email'),
//     userName: `${_get(userDatas, 'firstName')} ${_get(userDatas, 'lastName') || ''}`,
//     organization: _get(userDatas, 'organization'),
//     status: _get(userDatas, 'status'),
//     menu: _map(_get(userDatas, 'menu'), menu => new MenuLoginData({
//         name: _get(menu, 'name'),
//         displayText: _get(menu, 'displayText'),
//         description: _get(menu, 'description'),
//         icon: _get(menu, 'icon'),
//         subMenu: _map(_get(menu, 'subMenu'), subMenu => new SubMenuLoginData({
//             name: _get(subMenu, 'name'),
//             displayText: _get(subMenu, 'displayText'),
//             description: _get(subMenu, 'description'),
//             link: _get(subMenu, 'link'),
//             icon: _get(subMenu, 'icon'),
//             functionality: _map(_get(subMenu, 'functionality'), func => new FunctionLoginData({
//                 id: _get(func, '_id'),
//                 name: _get(func, 'name'),
//                 description: _get(func, 'description'),
//             })),
//         })),
//     })),
//     authToken: _get(authData, 'token'),
// });

// const mapLoginResponse = ({ loginData }) => new LoginResData({
//     findData: {
//          id: _get(loginData, '_id'),
//          message: _get(loginData, 'message'),
//          code: _get(loginData, 'code'),
//      },
//  });

// export { 
//     mapUserLoginData,
//     mapLoginResponse,
// };
