export const convertCurrentTime = (number: number) => {
    const min = Math.floor(number / 60);
    const secs = Number((number % 60).toFixed());

    return `${min < 10 ? "0" : ""}${min}:${secs < 10 ? "0" : ""}${secs}`;
};

export default convertCurrentTime;