import * as path from 'path';
import * as YAML from 'yamljs';
import * as fs from 'fs';

function writeEnv(nativeObj) {
	const outputPathEnv: string = path.join(__dirname, 'output', 'output.env.txt');
	let envString = '';
	nativeObj.env.forEach(item => {
		envString += `${item.name}=${item.value !== '' ? item.value : "''"}\n`;
	});
	Object.entries(nativeObj.infra).forEach(([key, val]) => {
		envString += `${key.toUpperCase()}=${val}\n`;
	});
	fs.writeFileSync(outputPathEnv, envString);
	console.log(`Finished ${outputPathEnv}`);
}

function writeHost(nativeObj) {
	const outputPathHost: string = path.join(__dirname, 'output', 'output.host.txt');
	let hostString = '';
	nativeObj.hostAliases.forEach(item => {
	hostString += `${item.ip} ${item.hostnames.join(' ')}\n`;
	});
	fs.writeFileSync(outputPathHost, hostString);
	console.log(`Finished ${outputPathHost}`);
}

const inputPath: string = path.join(__dirname, 'input', 'input.yaml');
const nativeObj = YAML.load(inputPath);
writeEnv(nativeObj);
writeHost(nativeObj);

