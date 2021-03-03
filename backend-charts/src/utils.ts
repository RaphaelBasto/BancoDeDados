const randInteger = (min: number = 1, max: number): number =>
{
    return Math.floor(Math.random() * (max-min) + min);
}

const capitalize = (str: string) => 
{
    if(!str || str.length <= 0)
    {
        return str
    }

    return str.split(" ")
              .map(s => (s[0].toUpperCase() + s.substring(1, str.length).toLowerCase()))
              .join(" ");
}

export {
    randInteger,
    capitalize
}