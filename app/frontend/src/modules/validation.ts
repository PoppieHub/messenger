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
            return 'Псевдоним должен быть от 2 до 30 символов'
        }

        return true;
    }
};

export const nicknameChangeValidation = {
    validate: (value: string | null | undefined) => {
        if (value) {
            if (value.length !== 0 && (value.length < 2 || value.length > 30)) {
                return 'Псевдоним должен быть от 2 до 30 символов'
            }
        }

        return true;
    }
};

export const firstNameChangeValidation = {
    validate: (value: string | null | undefined) => {
        if (value) {
            if (value.length !== 0 && (value.length < 2 || value.length > 30)) {
                return 'Имя должено быть от 2 до 30 символов'
            }
        }

        return true;
    }
};

export const lastNameChangeValidation = {
    validate: (value: string | null | undefined) => {
        if (value) {
            if (value.length !== 0 && (value.length < 2 || value.length > 30)) {
                return 'Фамилия должена быть от 2 до 30 символов'
            }
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

export const passwordChangeValidation = {
    validate: (value: string | null | undefined) => {
        if (value && value.length < 8) {
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

export const confirmChangePassword = (firstValue: string | null | undefined, secondValue: string | null | undefined) => {
    if (firstValue?.length! === 0 && secondValue?.length! === 0) {
        return {
            required: false,
            validate: () => true
        };
    }

    if (firstValue?.length! || secondValue?.length!) {
        if (firstValue?.length! && secondValue?.length!) {
            return {
                required: REQUIRED_FIELD,
                validate: () => {
                    if (firstValue !== secondValue) {
                        return 'Пароли должны совпадать';
                    }
                    return true;
                }
            }
        } else if (firstValue?.length!) {
            return {
                required: REQUIRED_FIELD,
                validate: () => {
                    return 'Вы должны повторить пароль';
                }
            }
        } else if (secondValue?.length!) {
            return {
                required: REQUIRED_FIELD,
                validate: () => {
                    return 'Вы сначала должны придумать пароль';
                }
            }
        }
    }

    else {
        return true;
    }
};
