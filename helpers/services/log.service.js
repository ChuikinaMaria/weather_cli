import chalk from 'chalk'
import dedent from 'dedent'

const printError = (error) => {
	console.log(chalk.bgRed('ERROR') + ' '  + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen('SUCCESS') + ' '+ message );
};

const printHelp = () => {
	console.log(
        dedent`

                ${chalk.bgCyan('       HELP       ')}

        без параметров - вывод прогноза погоды
        -c [CITY]  -  выбор города
        -h для вывода помощи
        -t [API_KEY] - для сохранения токена

        `
        ); 
	};

const printWeather = (res) => {
	console.log(
		dedent`
		${chalk.bgGreen('Погода')}
		Погода в городе ${res.name}:
		${res.weather[0].description} Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Скорость ветра : ${res.wind.speed} м/с
		Влажность: ${res.main.humidity}%, давление ${res.main.pressure} мм.рт.ст
        ${chalk.bgGreen('                                             ')}`
		
	)
}

export { printError, printSuccess, printHelp, printWeather }