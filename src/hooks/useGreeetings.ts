import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useGreetings = () => {

    const { t } = useTranslation();

    const getGreetings = () => {
        const currentHour = new Date().getHours();

        if (currentHour <= 12) {
            return `${t('greetings.morning')} ☀️`;
        } else if (currentHour > 12 && currentHour <= 19) {
            return `${t('greetings.afternoon')} 🌤️`
        } else {
            return `${t('greetings.evening')} 🌙`;
        }
    };


    const [greetings, setGreetings] = useState<string>(getGreetings());

    useEffect(() => {
        const updateGreeting = () => {
            setGreetings(getGreetings());
        };

        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval);
    }, [t]);

    return greetings;
};

export default useGreetings;