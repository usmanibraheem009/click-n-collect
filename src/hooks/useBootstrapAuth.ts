import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../apis/authApi";
import { loadSessionFromStore, setLoggedOut, setSession } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store/myStore";

import { clearSessionFromStore } from "../redux/slices/authSlice";

const useBootstrapAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [bootstrapping, setBootstrapping] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const session = await loadSessionFromStore();

                if (!session.accessToken) {
                    dispatch(setLoggedOut());
                    return;
                }

                dispatch(setSession(session));

                await dispatch(fetchCurrentUser()).unwrap();

            } catch (error) {
                console.log("BOOTSTRAP AUTH ERROR:", error);

                dispatch(setLoggedOut());

                await clearSessionFromStore();

            } finally {

                setBootstrapping(false);

            }
        };

        bootstrap();
    }, []);

    return { bootstrapping };
};

export default useBootstrapAuth;