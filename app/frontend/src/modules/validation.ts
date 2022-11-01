export const REQUIRED_FIELD = 'Обязательно для заполнения';

const reg = /\.[a-zа-я]{1,10}$/i;

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length < 4 || value.length > 128) {
            return 'Эл. адрес должен быть от 4 до 128 символов'
        }

        if (!reg.test(value)) {
            return 'Эл. адрес должен иметь тип: "example@example.com"'
        }

        return true;
    }
};

export const nicknameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length < 2 || value.length > 30) {
            return 'Псевдоним адрес должен быть от 2 до 30 символов'
        }

        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length < 8) {
            return 'Пароль должен быть длиннее 8 символов'
        }

        return true;
    }
};

export const confirmPassword = (firstValue: string, secondValue: string) => {
    return {
        required: REQUIRED_FIELD,
        validate: () => {
            if (firstValue !== secondValue) {
                return 'Пароли должны совпадать';
            }
        return true;
    }
    }
};
