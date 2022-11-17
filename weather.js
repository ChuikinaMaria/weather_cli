#!/usr/bin/env node
// api key = 912f70c673957ab4aff19036d729afc0
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './helpers/services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './helpers/services/storage.service.js';
import { getWeather } from './helpers/services/api.service.js';

const saveToken = async(token) => {
	if (!token.length) {
		printError('No API KEY provided');
		return;	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('API KEY is saved')
	} catch(e) {
		printError(e.message);
	}
};

const saveCity = async(city) => {
	if (!city.length) {
		printError('No cityname provided');
		return;	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
	} catch(e) {
		printError(e.message);
	}
};



const getForcast = async() => {
	try {
	const weather = await getWeather();
	printWeather(weather)
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('City is not valid');
		} else if (e?.response?.status == 401) {
			printError('API KEY is not valid')
		} else if (e?.response?.status == 400) {
			printError('City is not provided')
		} else {
			printError(e.message);
		}
	}
}

const initCLI =() => {
	const args = getArgs(process.argv)

	if (args.h) {
		printHelp();
	}
	if (args.c) {		
		saveCity(args.c);
	}
	if (args.t) {
		saveToken(args.t);
	}
	getForcast();

};

initCLI();