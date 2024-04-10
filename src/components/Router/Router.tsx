import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import {
  PATH_UNCONTROLED_FORM,
  PATH_REACT_HOOK_FORM,
} from '@/utils/constants/constants';
import NotFound from '@/components/NotFound/NotFound';
import UncontroledForm from '@/components/UncontroledForm/UncontroledForm';
import ReactHookForm from '@/components/ReactHookForm/ReactHookForm';
import MainPage from '@/pages/MainPage';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorMessage />}>
        <Route path={'/'} element={<MainPage />} />
        <Route path={PATH_UNCONTROLED_FORM} element={<UncontroledForm />} />
        <Route path={PATH_REACT_HOOK_FORM} element={<ReactHookForm />} />
        <Route path="*" element={<NotFound />} />
        <Route path="not-found" element={<NotFound />} />
      </Route>
    </>
  )
);

export default Router;
