import { NavLink } from 'react-router-dom'; import { isAdmin } from '../firebase';
export default function AdminLink({user}){return isAdmin(user)?<NavLink to="/admin">Admin</NavLink>:null}
