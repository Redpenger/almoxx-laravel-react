import Padrao from '@/Layouts/Padrao'
import { Provider } from 'react-redux'
import Store from '@/Redux/Store';

export default function Dashboard({ auth }) {
    
    return (
        <Provider store={Store}>
            <Padrao/>
        </Provider>
    );
}
